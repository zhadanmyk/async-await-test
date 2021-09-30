import {fn, pn, p1} from './lib';

///////////////////////// Async-based recursive
fn(5).catch( e => {
  console.log('async fn().catch()');
  console.log(e.stack);
});


///////////////////////// Promise-based recursive
pn(5).catch( (e)=> {
  console.log('promise pn().catch()');
  console.log(e.stack);
});


/////////////////////////
p1().catch(e => {
  console.log('p1().catch()');
  console.log(e.stack);
});
