import {Graph} from '../algorithm/Graph';
import {bfs, dfsRecursive, dfsStack, shortestPath} from '../src/graph/algorithms';

function buildGraph(edges) {
  const graph = new Graph();
  edges.forEach(([a, b]) => graph.addEdge(a, b));
  return graph;
}

describe('graph algorithms', () => {
  it('bfs returns breadth-first order', () => {
    const graph = buildGraph([[1, 2], [1, 3], [2, 4], [3, 5]]);
    const res = bfs(graph.getAdjacencyList(), 1);
    expect(res).toEqual([1, 2, 3, 4, 5]);
  });

  it('dfsStack returns depth-first order (stack-based)', () => {
    const graph = buildGraph([[1, 2], [1, 3]]);
    const res = dfsStack(graph.getAdjacencyList(), 1);
    expect(res).toEqual([1, 3, 2]);
  });

  it('dfsRecursive returns a full traversal', () => {
    const graph = buildGraph([[1, 2], [1, 3], [2, 4]]);
    const res = dfsRecursive(graph).slice().sort();
    expect(res).toEqual([1, 2, 3, 4]);
  });

  it('shortestPath returns path or unreachable', () => {
    const graph = buildGraph([[1, 2], [2, 3]]);
    const reachable = shortestPath(graph.getAdjacencyList(), 1, 3);
    expect(reachable.reachable).toBe(true);
    expect(reachable.path).toEqual([1, 2, 3]);

    const unreachable = shortestPath(graph.getAdjacencyList(), 1, 9);
    expect(unreachable.reachable).toBe(false);
    expect(unreachable.path).toEqual([]);
  });
});
