// new myPromise((resolve, reject) => {
//   //成功执行resolve,否则执行reject

// }).then((res) => {
//   //resolve执行第一个回调
// }, (err) => {
//   //reject触发第二个回调函数执行
// }).then(res => {
//   //需要保证then方法返回的依然是promise
//   //这样才能实现链式调用
// }).catch(reason => {

// });
// //等待所有的promise都成功执行then，
// //反之只要有一个失败就会执行catchS
// Promise.all([promise1, ]).then();

class Promise{

}