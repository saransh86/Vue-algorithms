import {Queue} from '../algorithm/Queue';

describe('Queue', () => {
  it('enqueues and dequeues in FIFO order', () => {
    const queue = new Queue();
    queue.enQ(1);
    queue.enQ(2);
    expect(queue.deQ()).toBe(1);
    expect(queue.deQ()).toBe(2);
  });

  it('reports empty correctly', () => {
    const queue = new Queue();
    expect(queue.isQueueEmpty()).toBe(true);
    queue.enQ(1);
    expect(queue.isQueueEmpty()).toBe(false);
    queue.deQ();
    expect(queue.isQueueEmpty()).toBe(true);
  });
});
