const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const routerConfig = require('../routerConfig');
const routerDir = './src/router';
const tempRouter = './createDir/template/templateRouter.js';
let components = '';
let routers = [];
let rootName = '';
const regKey = ['component', 'beforeEnter'];
const ignoreKey = ['children', 'filename'];
const formatKey = ['component', 'beforeEnter', 'props', 'redirect'];

program.version('1.00', '-v, --version')
  .command('init <name>')
  .action((name) => {
    console.log(name);
    if (!name) {
      console.log(symbols.error, chalk.red('文件夹根路径不可为空'));
      return false;
    }
    rootName = name;
    const rootDir = './src/' + rootName
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir);
    }
    if (!fs.existsSync(routerDir)) {
      fs.mkdirSync(routerDir);
    }
    if (routerConfig.length === 0) {
      console.log(symbols.error, chalk.red('路由配置文件不可为空'))
    } else {
      const spinner = ora('正在生成模板...');
      spinner.start();

      routerConfig.forEach((val) => {
        judgeChildren(val)
      })
      createRouter();
      spinner.succeed('模板已生成完毕，请大佬检阅~');
    }
    
  })
program.parse(process.argv);

function judgeChildren (val, baseDir) {
  const Name = firstUpperCase(val.name)
  let selfDir = val.name
  let path = `/${val.name}`
  if (!val.filename) {
    val.filename = val.name
  }
  if (baseDir) {
    selfDir = baseDir + '/' + val.name
    path = `${val.name}`
  }
  // 跪求大佬不要删掉这个换行符，不然router>index.js里面的格式丑爆
  components += `const ${Name} = () => import('@/${rootName}/${selfDir}/${val.filename}.vue');
`
  const objectTemp = getKeys(val);
  const temp = Object.assign(objectTemp, {component: Name, path: path})
  if (!baseDir) {
    routers.push(temp)
  } else {
    const parentName = baseDir.substr(baseDir.lastIndexOf('/') + 1)
    setChildren(temp, parentName, routers)
  }
  if (val.children) {  
    createDir(val, 'parent', baseDir)
    val.children.forEach((item) => {
      judgeChildren(item, selfDir);
    })
  } else {
    createDir(val, 'default', baseDir)
  }
}

function createRouter () {
  let routersStr = JSON.stringify(routers, formatt, '\t')
  routersStr = routersStr.substr(1, routersStr.length - 2)
  // 某些特别的属性值（非字符串的）要转回去
  formatKey.forEach((item) => {
    routersStr = repalceStr(routersStr, item);        
  })
  const info = {
    components: components,
    routers: routersStr
  }
  createFile(routerDir + '/index.js', tempRouter, info, 'update')
}

function createDir (val, type, baseDir) {
  const base = baseDir ? `./src/${rootName}/${baseDir}/` : `./src/${rootName}/`
  const dirName = `${base}${val.name}`
  const vueName = `${base}${val.name}/${val.filename}.vue`
  const scssName = `${base}${val.name}/${val.filename}.scss`
  let tempVue = type !== 'default' ? __dirname + '/template/templateParent.vue' : __dirname + '/template/template.vue'
  const tempScss =  __dirname + '/template/template.scss'
  const meta = {
    name: val.filename
  }
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
  // 创建vue文件
  createFile(vueName, tempVue, meta)
  // 创建scss文件
  createFile(scssName, tempScss, meta)
  console.log(symbols.success, chalk.green(`${val.name}文件夹初始化完成`))
}

function createFile (name, tempname, meta, type) {
  let isUpdate = !fs.existsSync(name)
  if (type && type === 'update') {
    isUpdate = true
  }
  if (fs.existsSync(tempname) && isUpdate) {
    const content = fs.readFileSync(tempname).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(name, result)
  }
}

function setChildren (component, parentname, parent) {
  parent.forEach((val) => {
    if (val.name === parentname && val.children) {
      val.children.push(component);
    } else if (val.name === parentname) {
      val.children = [];
      val.children.push(component);
    } else if (val.children) {
      setChildren(component, parentname, val.children);
    }
  })
}

function getKeys (val) {
  const keys = Object.keys(val)
  let temp = {}
  keys.forEach((item) => {
    if (!ignoreKey.includes(item)) {
      temp[item] = val[item]
    }
  })
  return temp;
}

function repalceStr (str, key) {
  const reg = new RegExp('"' + key + '": (\"(.+)*?\")+', 'g')
  const tempStr = str.replace(reg, (m, $1, $2) => {
    if ($2.includes('=>')) {
      // 函数里面的换行符全部替换掉
      $2 = $2.replace(/\\n/g, '\n')
      return `"${key}": ${$2}`
    }
    if (regKey.includes(key)) {
      return `"${key}": ${$2}`
    }
    return m
  })
  return tempStr
}

function formatt (key, val) {
  if (typeof val === 'function') {
    return Function.prototype.toString.call(val)
  }
  if (typeof val === undefined) {
    return undefined
  }
  return val
}

function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}