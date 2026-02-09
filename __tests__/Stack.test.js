import {Stack} from '../algorithm/Stack';

describe('Stack', () => {
  it('pushes and pops in LIFO order', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it('reports empty correctly', () => {
    const stack = new Stack();
    expect(stack.isStackEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isStackEmpty()).toBe(false);
    stack.pop();
    expect(stack.isStackEmpty()).toBe(true);
  });
});
