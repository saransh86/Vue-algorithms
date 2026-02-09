import {Graph} from '../algorithm/Graph';

function buildGraph(edges) {
  const graph = new Graph();
  edges.forEach(([a, b]) => graph.addEdge(a, b));
  return graph;
}

describe('Graph', () => {
  it('adds undirected edges', () => {
    const graph = buildGraph([[1, 2]]);
    const list = graph.getAdjacencyList();
    expect(list.get(1).val).toBe(2);
    expect(list.get(2).val).toBe(1);
  });

  it('removes node and updates adjacency list', () => {
    const graph = buildGraph([[1, 2], [2, 3]]);
    graph.removeNode(2);
    graph.updateAdjacencyList(2);
    const list = graph.getAdjacencyList();
    expect(list.has(2)).toBe(false);
    expect(list.get(1)).toBe(null);
    expect(list.get(3)).toBe(null);
  });

  it('recursive DFS visits all vertices', () => {
    const graph = buildGraph([[1, 2], [1, 3], [2, 4]]);
    graph.recursiveDfs();
    const res = graph.getResult().slice().sort();
    expect(res).toEqual([1, 2, 3, 4]);
  });
});
