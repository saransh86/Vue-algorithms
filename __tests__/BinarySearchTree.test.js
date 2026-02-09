import {BinarySearchTree} from '../algorithm/BinarySearchTree';

describe('BinarySearchTree', () => {
  it('inorder traversal returns sorted values', () => {
    const bst = new BinarySearchTree(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(1);
    bst.insert(4);
    bst.insert(6);
    bst.insert(8);
    expect(bst.inorder()).toEqual([1, 3, 4, 5, 6, 7, 8]);
  });

  it('preorder and postorder return expected lengths', () => {
    const bst = new BinarySearchTree(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(1);
    const preorder = bst.preorder();
    const postorder = bst.postorder();
    expect(preorder.length).toBe(4);
    expect(postorder.length).toBe(4);
  });
});
