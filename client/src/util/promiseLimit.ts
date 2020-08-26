/*
This class provides a means to resolve Promises asynchronously,
and limit the number concurrently executed.  For example, if
you want to involve a large number of API endpoints using fetch(),
but want to limit the number simultaneously outstanding.

Example usage:

const plimit = new PromiseLimit(2);
return Promise.all([
	plimit.add(() => fetch('/foo')),
	plimit.add(() => fetch('/bar')),
	plimit.add(() => fetch('/baz'))
])

if you want a priority queue based implementation, just
use priorityAdd() instead of add():

const plimit = new PromiseLimit(2);
return Promise.all([
  plimit.priorityAdd(0, () => fetch('/foo')),
  plimit.priorityAdd(10, () => fetch('/bar')),
  plimit.priorityAdd(-1, () => fetch('/baz'))
])

Priority is a numeric value.  Lower first.  Stable ordering.
*/

import TinyQueue from "tinyqueue";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
function compare(a, b) {
  const diff = a.priority - b.priority;
  if (diff) return diff;
  return a.order - b.order;
}

export default class PromiseLimit {
  constructor(maxConcurrency = 5) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'queue' does not exist on type 'PromiseLi... Remove this comment to see the full error message
    this.queue = new TinyQueue([], compare);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'maxConcurrency' does not exist on type '... Remove this comment to see the full error message
    this.maxConcurrency = maxConcurrency;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pending' does not exist on type 'Promise... Remove this comment to see the full error message
    this.pending = 0;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'insertCounter' does not exist on type 'P... Remove this comment to see the full error message
    this.insertCounter = 0;
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'p' implicitly has an 'any' type.
  priorityAdd(p, fn, ...args) {
    // p - numermic priority (lower first)
    // fn - must return a promise
    // args - will be passed to fn
    return this._push(p, fn, args);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'fn' implicitly has an 'any' type.
  add(fn, ...args) {
    // fn - must return a promise
    // args - will be passed to fn
    return this._push(0, fn, args);
  }

  /**
  Private below
  **/

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'priority' implicitly has an 'any' type.
  _push(priority, fn, args) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'insertCount' does not exist on type 'Pro... Remove this comment to see the full error message
    const order = this.insertCount;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'insertCount' does not exist on type 'Pro... Remove this comment to see the full error message
    this.insertCount += 1;
    return new Promise((resolve, reject) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'queue' does not exist on type 'PromiseLi... Remove this comment to see the full error message
      this.queue.push({ priority, order, fn, args, resolve, reject });
      this._resolveNext(false);
    });
  }

  _resolveNext = (completed = true) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pending' does not exist on type 'Promise... Remove this comment to see the full error message
    if (completed) this.pending -= 1;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'queue' does not exist on type 'PromiseLi... Remove this comment to see the full error message
    while (this.queue.length > 0 && this.pending < this.maxConcurrency) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'queue' does not exist on type 'PromiseLi... Remove this comment to see the full error message
      const task = this.queue.pop(); // order of insertion
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pending' does not exist on type 'Promise... Remove this comment to see the full error message
      this.pending += 1;
      const { resolve, reject, fn, args } = task;

      try {
        const result = fn(...args);
        result.then(
          () => this._resolveNext(true),
          () => this._resolveNext(true)
        );
        result.then(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
  };
}
