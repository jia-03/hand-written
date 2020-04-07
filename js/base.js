
//apply  数组 需要判断一下是否传参
Function.prototype.myApply = function (context = window, args = []) {
  let key = Symbol()
  context[key] = this
  console.log(this, args)

  //通过隐式绑定的方式调用函数
  let result = context[key](...args)
  //删除添加的属性
  delete context.fn
  //返回函数调用的返回值
  return result
}


//call 非数组
Function.prototype.myCall = function (context = window, ...args) {
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol()
  context[key] = this
  console.log(this, args)
  //通过隐式绑定的方式调用函数
  const result = context[key](...args)
  //删除添加的属性
  delete context[key]
  //返回函数调用的返回值
  return result
}

// let obj = { x: 1 };
// function fn() {
//   console.log(this.x, arguments);
// }
// fn.myCall(obj, 1, 2, 3);
// fn.myApply(obj,[1,2,3]);

// bind,

Function.prototype.myBind = function (context = window, ...bindArgs) {
  // func 为调用 bind 的原函数
  const func = this;
  if (typeof func !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  // bind 返回一个绑定 this 的函数
  function fn(...callArgs) {
    let args = bindArgs.concat(callArgs);
    // if (this instanceof func) {
    //   // 意味着是通过 new 调用的 而 new 的优先级高于 bind
    //   return new func(...args);
    // }
    // return func.apply(context, args);
    return func.apply(this instanceof func ? this : context, bindArgs.concat(callArgs));
  }
  //赋值原型上的值
  fn.prototype = func.prototype;
  return fn
}

function Animal(name, color) {
  this.name = name;
  this.color = color;
}
Animal.prototype.say = function () {
  return `I'm a ${this.color} ${this.name}`;
};
const Cat = Animal.myBind(null, 'cat');
const cat = new Cat('white');
if (cat.say() === 'I\'m a white cat' &&
  cat instanceof Cat && cat instanceof Animal) {
  console.log('success');
}



//new
function _new(fun, ...args) {
  if (typeof fun !== 'function') {
    return new Error('参数必须是一个函数');
  }
  const obj = Object.create(Ctor.prototype);
  const ret = Ctur.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}


// 模拟 instanceof
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) return false;
    if (O === L)
      // 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}

//数组交集
const intersection = (list, ...args) => list.filter(item => args.every(list => list.includes(item)))

console.log(intersection([2, 1], [2, 3])) // [2]
console.log(intersection([1, 2], [3, 4])) // []


//JSONP
function fn({ip}) {
  console.log(ip); // 
}
function jsonp(cb, domain) {
  const script = document.createElement('script');
  script.src = `https://api.asilu.com/ip/?callback=${cb}&ip=${domain}`;
  document.querySelector('head').appendChild(script);
}
//
function jsonp({url, params, cb}) { 
  return new Promise((resolve, reject) => {
    window[cb] = function (data) {  // 声明全局变量
       resolve(data)
       document.body.removeChild(script)
     }
     params = {...params, cb}
     let arrs = []
     for(let key in params) {
        arrs.push(`${key}=${params[key]}`)
     }
     let script = document.createElement('script')
     script.src = `${url}?${arrs.join('&')}`
     document.body.appendChild(script)
  })
}

// 获取百度IP
jsonp('fn', 'www.baidu.com');