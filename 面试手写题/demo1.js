/* 
实现一个 query 方法，实现对数据的链式查询和处理

要求
query 传入参数为原始数据（数组格式，每个元素都是对象）
通过进行链式调用对数据执行操作，支持的方法有
where(predicate): 根据参数的条件进行筛选，参数与 [].filter 的参数类似
orderBy(key, desc): 根据 key 的值进行排列，默认升序排列，当第二个参数为 true 时降序排列
groupBy(key): 根据 key 的值对数据元素进行分组，合并为二维数组
execute(): 执行所有处理并返回最终结果
执行 execute 方法时才真正执行操作并返回结果
请结合下面示例理解需求
示例
const data = [
  { name: 'foo', age: 16, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'baz', age: 19, city: 'hangzhou' }
];

query(data)
    .where(item => item.age > 18)
  .orderBy('age')
  .groupBy('city')
  .execute();

// 结果返回
[
  [
    { name: 'baz', age: 19, city: 'hangzhou' },
    { name: 'bar', age: 24, city: 'hangzhou' },
  ],
  [
    { name: 'fiz', age: 22, city: 'shanghai' },
  ]
]
*/


const data = [
    { name: 'foo', age: 16, city: 'shanghai' },
    { name: 'bar', age: 24, city: 'hangzhou' },
    { name: 'fiz', age: 22, city: 'shanghai' },
    { name: 'baz', age: 19, city: 'hangzhou' }
  ];
  
  const queryActions = {
    where(data, req) {
      return data.filter(req);
    },
    orderBy(data, req, flag) {
      return data.sort((a, b) => {
        return flag?b[req] - a[req]:a[req] - b[req]
      });
    },
    groupBy(data, req) {
      let kind = [];
      let newArr = [];
      // 优化版本
      let arrayTwo = Object.values(data.reduce((res, item) => {
        res[item[req]] ? res[item[req]].push(item) : res[item[req]] = [item];
        return res;
      }, {}))
      return arrayTwo;
    }
  };
  
  function query(data) {
    // 类同方法处理
    const queryActionList = ['where', 'orderBy', 'groupBy'];
    // 方法缓存数组
    const actions = [];
    queryActionList.forEach(fnName => {
      this[fnName] = function (...req) {
        actions.push([queryActions[fnName], ...req]);
        return this;
      };
    });
    this.execute = function () {
      if (!actions.length) {
        console.log('请先添加执行方法');
        return 
      }
      return actions.reduce((res, cur) => {
        const [action, ...req] = cur;
        data = action(data, ...req);
        return data;
      }, data);
    };
  }
  const newQuery = new query(data);
  const newData = newQuery.where(item => item.age > 18)
    .orderBy('age',true)
    .groupBy('city')
    .execute();
  console.log('newData',newData)