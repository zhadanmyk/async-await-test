import 'zone.js';
import 'zone.js/awaiter';

///////////////////////// Async-based recursive

export async function fn(count: number): Promise<void> {
  console.log(`async fn(${count})`);
  await 0;
  if (count < 1) {
    throw new Error('ouch');
  }
  await fn(count-1);
}


///////////////////////// Promise-based recursive

export function pn(count:number): Promise<void> {
  console.log(`promise pn(${count})`);

  return Promise.resolve().then(() => {
    if (count < 1) {
      throw new Error('ouch pn');
    }
    return pn(count-1);
  });
}


/////////////////////////

export async function p1() {
  return await p2();
}

async function p2() {
  return await p3();
}

async function p3() {
  return await p4();
}

async function p4() {
  throw new Error('BOOM');
}
