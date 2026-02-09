import {isValidNode} from '../src/graph/validators';

describe('validators', () => {
  it('isValidNode returns true for valid nodes', () => {
    expect(isValidNode('A', ['A', 'B'])).toBe(true);
  });

  it('isValidNode returns false for empty or missing nodes', () => {
    expect(isValidNode('', ['A'])).toBe(false);
    expect(isValidNode(null, ['A'])).toBe(false);
    expect(isValidNode('C', ['A', 'B'])).toBe(false);
  });
});
