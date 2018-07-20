const fs = require('fs');
const program = require('commander');
const chokidar = require('chokidar');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const config = require('./configScss.js');
const ingnoreKey = ['@import', '{', '}'];
program.version('1.00', '-v, --version')
  .command('watch <name>')
  .action((name) => {
    console.log('正在监听文件')
    if (fs.existsSync('./' + name + '.wss')) {
        const watcher = chokidar.watch('./' + name);
        watcher.on('change', (path) => {
          let formattStr = '';
          const content = fs.readFileSync('./' + name, 'utf8')
          const EOL = content.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
          content.split(/\r?\n/).forEach((line, index) => {
            if (line.includes('@import') || line.includes('{') || line.includes('}')) {
              formattStr += line + EOL;
            } else {
              formattStr += formatt(line) + EOL;
            }
          })
          console.log('format', formattStr)
          fs.writeFile('./' + name + '.scss', formattStr)
          console.log('完成')
        })
    } else {
      console.log(symbols.error, chalk.red('文件不存在'))
    }
  });
program.parse(process.argv);

function formatt (str) {
  const strArr = str.split(/\:\s*/)
  let originStr = strArr[0]
  let tempStr = strArr[0]
  tempStr = tempStr.replace(/^\s*/, '')
  tempStr = tempStr.replace(/\;$/, '')
  let hasStr = tempStr
  const exitsNum = /[0-9]+$/.test(tempStr)
  let numStr = ''
  if (exitsNum) {
    const num = tempStr.match(/[0-9]+$/)[0]
    hasStr = hasStr.replace(num, '')
    numStr = `calcualte(${num})`
  }
  if (config.has(hasStr)) {
    const configStr = config.get(hasStr)
    originStr = exitsNum ? originStr.replace(tempStr, `${configStr}: ${numStr}`) : originStr.replace(tempStr, configStr)
  }
  if (strArr.length > 1) {
    return `${originStr}: ${strArr[1]}`
  } else {
    return originStr
  }
}