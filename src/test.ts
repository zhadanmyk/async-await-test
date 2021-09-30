import 'zone.js';
import 'zone.js/awaiter';
import 'zone.js/testing';
import {fakeAsync, tick} from '@angular/core/testing';
import {p1} from './lib';

describe('AsyncAwaitTests', () => {
  it('should work with async', async () => {
    let capturedError: Error|null = null;
    const p = p1().catch(e => capturedError = e);
    expect(capturedError).toBe(null);
    await p;
    expect(capturedError).not.toBe(null);
  });

  it('should work with fakeAsync', fakeAsync(() => {
    let capturedError: Error|null = null;
    const p = p1().catch(e => capturedError = e);
    expect(capturedError).toBe(null);
    tick();
    expect(capturedError).not.toBe(null);
  }));
});
