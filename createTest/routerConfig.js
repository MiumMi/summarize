const routerConfig = [
  {
    name: 'card',
    beforeEnter: (to, from , next) => {
      console.log('test');
      console.log('mayble');
      next();
    },
    props: true,
    children: [
      { name: 'cardManage',
        children: [
          {
            name: 'test',
            children: [
              {
                name: 'mayble'
              }
            ]
          }
        ]
      }, // 银行卡管理
      { name: 'cardDetail',
      children: [
        {
          name: 'ma'
        }
      ] }, // 银行卡详情
      { name: 'cardAdd' }, // 添加银行卡
      { name: 'cardBind' } // 绑定银行卡
    ]
  },
  {
    name: 'mine',
    children: [
      {
        name: 'minetest'
      }
    ]
  },
  {
    name: 'manage',
    filename: 'index'
  }
]

module.exports = routerConfig