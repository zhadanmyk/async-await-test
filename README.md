# AsyncAwaitTest

This project demonstrates the async-await TS transform and associated awaiter function as implemented in the following PRs:

- [refactor(compiler-cli): add async-await transform](https://github.com/angular/angular/pull/42808)
- [feat(zone.js): add awaiter transform spec implementation](https://github.com/angular/angular/pull/42768)

The project is based on and built with the Angular CLI; although there is no actual Angular application code here.
It has been configured to only produce "development" mode output. In other words optimisations like minification have been turned off.

## Instructions

- Install the dependencies: `npm install`.

There is a postinstall hook to turn off the CLI downleveling of async-await.
You can manually turn this transform on and off using `npm run turn-on-cli-transform` and `npm run turn-off-cli-transform`.

### Run the app code

- Run and serve the app: `npm start`.

### Run the test code

The CLI is not able to run the TS transform for the unit tests, so these are run using jasmine on node.js:

- Compile and run the tests: `npm test`.

### Build the app code

- The distributabe code can be build using `npm run build`. The output can be found at `dist`.

## What to look for

The application `main.ts` copies the code from the ["async vs promise" jsfiddle](https://jsfiddle.net/smnp0bzr/1/), which executes recursive async functions; and also demonstrates a chain of native async functions.

The output demonstrates what the stack traces look like for each case:

```
main.ts:23 promise pn(5)
main.ts:23 promise pn(4)
main.ts:23 promise pn(3)
main.ts:23 promise pn(2)
main.ts:23 promise pn(1)
main.ts:23 promise pn(0)
main.ts:34 promise pn().catch()
main.ts:35 Error: ouch pn
    at main.ts:27
    at _ZoneDelegate.invoke (zone.js:378)
    at Zone.run (zone.js:140)
    at zone.js:1286
    at _ZoneDelegate.invokeTask (zone.js:412)
    at Zone.runTask (zone.js:184)
    at drainMicroTaskQueue (zone.js:591)
```

```
async fn() 5
main.ts:7 async fn(4)
main.ts:7 async fn(3)
main.ts:7 async fn(2)
main.ts:7 async fn(1)
main.ts:7 async fn(0)
main.ts:15 async fn().catch()
main.ts:16 Error: ouch
    at fn_generator (main.ts:10)
    at fn_generator.next (<anonymous>)
    at Function.Zone.__awaiter (zone.awaiter.js:18)
    at async Function.Zone.__awaiter (zone.awaiter.js:19)
    at async Function.Zone.__awaiter (zone.awaiter.js:19)
    at async Function.Zone.__awaiter (zone.awaiter.js:19)
    at async Function.Zone.__awaiter (zone.awaiter.js:19)
    at async Function.Zone.__awaiter (zone.awaiter.js:19)
```

```
main.ts:58 p1().catch()
main.ts:59 Error: BOOM
    at p4_generator (main.ts:54)
    at p4_generator.next (<anonymous>)
    at Function.Zone.__awaiter (zone.awaiter.js:18)
    at p4 (main.ts:53)
    at p3_generator (main.ts:50)
    at p3_generator.next (<anonymous>)
    at Function.Zone.__awaiter (zone.awaiter.js:18)
    at p3 (main.ts:49)
    at p2_generator (main.ts:46)
    at p2_generator.next (<anonymous>)
```

Note that in the recursive native async case the stack trace is not particularly helpful. When viewed in the debuger the stack trace is more accurate.
Could this be a problem with how the v8 engine optmizes these calls?

In the third case, it is possible to see the actual call stack down to the `p4()` that throws.
