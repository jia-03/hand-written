//new
function _new(fun, ...args) {
    if (typeof fun !== 'function') {
        return new Error('参数必须是一个函数');
    }
    const obj = Object.create(Ctor.prototype);
    const ret = Ctur.apply(obj, args);
    return ret instanceof Object ? ret : obj;
}

//apply
Function.prototype.myApply = function (context, args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}

//call
Function.prototype.myCall = function (context, ...args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}

// bind

Function.prototype.bind = function(context, ...bindArgs) {
    // func 为调用 bind 的原函数
    const func = this;
    context = context || window;
    if (typeof func !== 'function') {
      throw new TypeError('Bind must be called on a function');
    }
    // bind 返回一个绑定 this 的函数
    return function(...callArgs) {
      let args = bindArgs.concat(callArgs);
      if (this instanceof func) {
        // 意味着是通过 new 调用的 而 new 的优先级高于 bind
        return new func(...args);
      }
      return func.call(context, ...args);
    }
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