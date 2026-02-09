<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-nav>
      <b-navbar-brand href="#">Simple Graph</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-navbar-nav :hidden="showBST">
            <div>
              <b-form-input
                :value="node"
                placeholder="Enter the node"
                :state="nodeState"
                @input="$emit('update:node', $event)"
              ></b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Need a number or node exists with the number
              </b-form-invalid-feedback>
            </div>

            <b-nav-item href="#" @click="$emit('click-circle')" :active="tab === 0">Add Node</b-nav-item>
            <b-nav-item href="#" @click="$emit('remove-node')" :disabled="circlesLength < 1" :active="tab === 1">Remove Node</b-nav-item>
            <b-nav-item href="#" @click="$emit('move-node')" :disabled="circlesLength < 1" :active="tab === 2">Move Node</b-nav-item>
            <b-nav-item href="#" @click="$emit('add-edge')" :disabled="circlesLength < 2" :active="tab === 3">Add Edge</b-nav-item>
            <b-nav-item href="#" @click="$emit('remove-edge')" :disabled="connectionsLength < 1" :active="tab === 4">Remove Edge</b-nav-item>
            <b-nav-item href="#" @click="$emit('clear-graph')">Clear Graph</b-nav-item>
            <b-nav-item href="#" @click="$emit('run-rec-dfs')" :disabled="circlesLength < 2" :active="tab === 5">DFS Rec</b-nav-item>
            <b-nav-item href="#" @click="$emit('show-input-box')" :disabled="circlesLength < 2" :active="tab === 6">DFS Stack</b-nav-item>
            <b-nav-item href="#" @click="$emit('show-bfs-input-box')" :disabled="circlesLength < 2" :active="tab === 7">BFS</b-nav-item>
            <b-nav-item href="#" @click="$emit('shortest-path')" :disabled="circlesLength < 2" :active="tab === 8">Shortest Path</b-nav-item>
            <b-nav-item href="#" @click="$emit('bst')" :active="tab === 8">Binary Search Tree</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav :hidden="!showBST">
            <div>
              <b-form-input
                :value="bstNode"
                placeholder="Enter the node BST"
                :state="bstNodeState"
                @input="$emit('update:bstNode', $event)"
              ></b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Need a number or node exists with the number
              </b-form-invalid-feedback>
            </div>
            <b-nav-item href="#" @click="$emit('add-node-to-bst')">Add Node</b-nav-item>
            <b-nav-item href="#" @click="$emit('inorder')" :disabled="!root">Inorder</b-nav-item>
            <b-nav-item href="#" @click="$emit('preorder')" :disabled="!root">Preorder</b-nav-item>
            <b-nav-item href="#" @click="$emit('postorder')" :disabled="!root">Postorder</b-nav-item>
            <b-nav-item href="#" @click="$emit('clear-graph')">Clear Tree</b-nav-item>
            <b-nav-item href="#" @click="$emit('show-graph-menu')">Show Graph Menu</b-nav-item>
          </b-navbar-nav>

          <div :hidden="!showInput">
            <b-form-input
              :value="stackDfsStartNode"
              placeholder="Enter the DFS start node"
              :state="startNodeState"
              @input="$emit('update:stackDfsStartNode', $event)"
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              Need a node number or number not in nodes
            </b-form-invalid-feedback>
          </div>
          <b-nav-item variant="dark" @click="$emit('run-stack-dfs')" :hidden="!showInput">Run</b-nav-item>

          <div :hidden="!showBfsInput">
            <b-form-input
              :value="startBfsStartNode"
              placeholder="Enter the BFS start node"
              :state="startBfsNodeState"
              @input="$emit('update:startBfsStartNode', $event)"
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              Need a node number or number not in nodes
            </b-form-invalid-feedback>
          </div>
          <b-nav-item variant="dark" @click="$emit('run-bfs')" :hidden="!showBfsInput">Run</b-nav-item>

          <div :hidden="!showShortestPath">
            <b-form-input
              :value="startNode"
              placeholder="Enter start node"
              :state="startState"
              @input="$emit('update:startNode', $event)"
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              Need a node number or number not in nodes
            </b-form-invalid-feedback>
            <b-form-input
              :value="destNode"
              placeholder="Enter destination node"
              :state="destState"
              @input="$emit('update:destNode', $event)"
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              Need a node number or number not in nodes
            </b-form-invalid-feedback>
          </div>
          <b-nav-item variant="dark" @click="$emit('run-shortest-path')" :hidden="!showShortestPath">Run</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'GraphControls',
  props: {
    node: { type: String, required: false },
    nodeState: { required: false },
    bstNode: { type: String, required: false },
    bstNodeState: { required: false },
    stackDfsStartNode: { required: false },
    startNodeState: { required: false },
    startBfsStartNode: { required: false },
    startBfsNodeState: { required: false },
    startNode: { type: String, required: false },
    startState: { required: false },
    destNode: { type: String, required: false },
    destState: { required: false },
    showInput: { type: Boolean, required: false },
    showBfsInput: { type: Boolean, required: false },
    showShortestPath: { type: Boolean, required: false },
    showBST: { type: Boolean, required: false },
    root: { required: false },
    circlesLength: { type: Number, required: true },
    connectionsLength: { type: Number, required: true },
    tab: { type: Number, required: false }
  }
}
</script>
