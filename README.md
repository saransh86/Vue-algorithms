# Vue-algorithms
A simple Vue 2 app that visualizes basic data structures and graph algorithms.

## What it does
- Build an undirected graph by adding/removing nodes and edges
- Run DFS (recursive and stack), BFS, and shortest path visualizations
- Switch to a Binary Search Tree view and run inorder/preorder/postorder traversals

## Local development
```bash
yarn
yarn serve
```

## Tests
```bash
yarn test
```

## CI (Concourse)
Install Concourse: https://concourse-ci.org/quick-start.html

Create the pipeline:
```bash
fly -t tutorial set-pipeline --pipeline vue-algos --config build.yaml
```

Run a build:
```bash
fly -t tutorial trigger-job --job vue-algos/Graph --watch
```

Then open `http://localhost:8080`.
