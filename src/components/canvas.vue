<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-nav>
        <b-navbar-brand href="#">Simple Graph</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-navbar-nav :hidden="showBST">    
                    <div>
                        <b-form-input v-model="node" placeholder="Enter the node" :state="nodeState"> </b-form-input>
                        <b-form-invalid-feedback id="input-live-feedback">
                            Need a number or node exists with the number
                        </b-form-invalid-feedback>
                    </div>    
                     
                    <b-nav-item href="#" @click="clickCircle" v-bind:active="tab == 0">Add Node </b-nav-item>
                    <b-nav-item href="#" @click="removeNode" :disabled="circles.length<1" v-bind:active="tab == 1">Remove Node</b-nav-item>
                    <b-nav-item href="#" @click="moveNode" :disabled="circles.length<1" v-bind:active="tab == 2">Move Node</b-nav-item>
                    <b-nav-item href="#" @click="addEdge" :disabled="circles.length<2" v-bind:active="tab == 3">Add Edge</b-nav-item>
                    <b-nav-item href="#" @click="removeEdge" :disabled="connections.length<1" v-bind:active="tab == 4">Remove Edge</b-nav-item>
                    <b-nav-item href="#" @click="clearGraph" >Clear Graph</b-nav-item>
                    <b-nav-item href="#" @click="runRecDfs" :disabled="circles.length<2" v-bind:active="tab == 5">DFS Rec</b-nav-item>
                    <b-nav-item href="#" @click="showInputBox" :disabled="circles.length<2" v-bind:active="tab == 6">DFS Stack</b-nav-item>
                    <b-nav-item href="#" @click="showBfsInputBox" :disabled="circles.length<2" v-bind:active="tab == 7">BFS</b-nav-item>
                    <b-nav-item href="#" @click="shortestPath" :disabled="circles.length<2" v-bind:active="tab == 8">Shortest Path</b-nav-item>
                    <b-nav-item href="#" @click="bst" v-bind:active="tab == 8">Binary Search Tree</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav :hidden="!showBST">
                    <div>
                        <b-form-input v-model="bstNode" placeholder="Enter the node BST" :state="bstNodeState"> </b-form-input>
                        <b-form-invalid-feedback id="input-live-feedback">
                            Need a number or node exists with the number
                        </b-form-invalid-feedback>
                    </div>    
                    <b-nav-item href="#" @click="addNodeToBst"> Add Node  </b-nav-item>
                    <b-nav-item href="#" @click="inorder" :disabled="!root"> Inorder  </b-nav-item>
                    <b-nav-item href="#" @click="preorder" :disabled="!root"> Preorder </b-nav-item>
                    <b-nav-item href="#" @click="postorder" :disabled="!root"> Postorder</b-nav-item>
                    <b-nav-item href="#" @click="clearGraph"> Clear Tree  </b-nav-item>
                    <b-nav-item href="#" @click="showGraphMenu">Show Graph Menu </b-nav-item>

                </b-navbar-nav>
                <div :hidden="!showInput">
                    <b-form-input v-model="stackDfsStartNode" placeholder="Enter the DFS start node" :state="startNodeState" > </b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Need a node number or number not in nodes
                    </b-form-invalid-feedback>               
                </div>
                 <b-nav-item variant="dark" @click="runStackDfs" :hidden="!showInput">Run</b-nav-item>
                <div :hidden="!showBfsInput">
                    <b-form-input v-model="startBfsStartNode" placeholder="Enter the BFS start node" :state="startBfsNodeState" > </b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Need a node number or number not in nodes
                    </b-form-invalid-feedback>
                </div>
                <b-nav-item variant="dark" @click="runBfs" :hidden="!showBfsInput">Run</b-nav-item>
                <div :hidden="!showShortestPath">
                    <b-form-input v-model="startNode" placeholder="Enter start node" :state="startState" > </b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Need a node number or number not in nodes
                    </b-form-invalid-feedback>
                    <b-form-input v-model="destNode" placeholder="Enter destination node" :state="destState" > </b-form-input>
                     <b-form-invalid-feedback id="input-live-feedback">
                        Need a node number or number not in nodes
                    </b-form-invalid-feedback>
                </div>
                <b-nav-item variant="dark" @click="runShortestPath" :hidden="!showShortestPath">Run</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
        </b-navbar-nav>
    </b-navbar>
   
    <v-stage :config="configKonva" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" @dragstart="dragMove" @dragend="dragEnd"> 
        <v-layer> 
            <v-line v-for="line in connections" :key="line.id" :config="{ stroke: 'black', points: line.points}" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"/>
            <v-group v-for="circle in circles" :key="circle.id" :config="groupConfig">
                <v-circle  :config="{x:circle.x, y:circle.y, fill:'white',radius: 30, stroke:'black' }"> </v-circle>
                <v-text  :config="{x:circle.x - 6, y: circle.y -4, text: circle.text}"> </v-text>
            </v-group>
        </v-layer>
    </v-stage>
    <span :hidden="!graph.getAdjacencyList().size" class="list"> <b>Adjacency List: </b></span>
    <b-container class="center" fluid="true">
        <b-row>  
            <b-col cols="4">   
                <b-list-group v-for="(values, keys) in graph.getAdjacencyList()" :key="componentKey + keys" horizontal>
                    <b-list-group-item>V:{{values[0]}}  </b-list-group-item>
                    <span v-for="(nodes) in getNodes(values[0])"  :key="'C' +nodes"> 
                        <b-list-group-item variant="dark">{{nodes}}</b-list-group-item>
                    </span>
                </b-list-group>
            </b-col>
            <b-col cols="2">
                <b-list-group v-for="res in resRecDfs" :key="res">
                    <b-list-group-item variant="dark"> DFS Recursive: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="2">
                <b-list-group v-for="res in resStackDfs" :key="'A' + res">
                    <b-list-group-item variant="dark"> DFS Stack: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="2">
                <b-list-group v-for="res in resBfs" :key="'B' + res">
                    <b-list-group-item variant="dark"> BFS: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="2">
                <b-list-group v-for="res in resShortestPath" :key="'D' + res">
                    <b-list-group-item variant="dark"> Shortest Path: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
    <b-container class="center" fluid="true">
        <b-row>  
            <b-col cols="4">
                <b-list-group v-for="res in preorderRes" :key="'C' + res">
                    <b-list-group-item variant="dark"> Preorder: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="4">
                <b-list-group v-for="res in inorderRes" :key="'A' + res">
                    <b-list-group-item variant="dark"> Inorder: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="4">
                <b-list-group v-for="res in postorderRes" :key="'B' + res">
                    <b-list-group-item variant="dark"> Postorder: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import Konva from "konva";
import lodash from 'lodash';
import {Graph} from "../../algorithm/Graph";
import {Stack} from "../../algorithm/Stack";
import {Queue} from "../../algorithm/Queue";
import {BinarySearchTree} from '../../algorithm/BinarySearchTree'
export default {
    data(){
        return{
            configKonva: {
                width: window.innerWidth,
                height: window.innerHeight-300,
            },
            node: '',
            nodeState: null,
            bstNode: '',
            bstNodeState: null,
            startNodeState: null,
            circles: [],
            texts: [],
            groupConfig: {
                draggable: true
            },
            connections: [],
            drawningLine: false,
            graph : new Graph(),
            src: null,
            nodes: [],
            showStartNodeInput : true,
            resRecDfs : [],
            resStackDfs: [],
            preorderRes: [],
            inorderRes: [],
            postorderRes: [],
            resBfs: [],
            showInput: null,
            stackDfsStartNode: null,
            showBfsInput:null,
            startBfsStartNode:null,
            startBfsNodeState: null,
            componentKey: 0,
            deleteNode: null,
            deleteEdge:null,
            changeLine : [],
            resShortestPath: [],
            showShortestPath:null,
            startNode : '',
            startState:null,
            destNode: '',
            destState:null,
            updateCoordinates: [],
            lineId: null,
            edges: new Map(),
            tab: null,
            showBST: null,
            root: null,
            coordinates: {}
        }
    },
    mounted(){
        Konva.stages[0].getContainer().style.border = 'dashed black';
    },
    methods:{
        addNodeToBst(){
            if(!this.bstNode){
                this.bstNodeState = false;
                return;
            }
            let val = parseInt(this.bstNode);
            if(!this.root){
                this.root = new BinarySearchTree(val);
                let x = window.innerWidth/2;
                let y = window.innerHeight/2-400;
                this.circles.push({x: x, y: y, id: Date.now(), text: this.bstNode});
                this.coordinates[val] = {x: x, y:y};
            }
            else{
                let parent = this.root.getParent(val);
                this.root.insert(val);
                const children = Konva.stages[0].children[0].children;
                let x1= 0;
                let y1 = 0;
                for(let i=0; i<children.length;i++){
                    for(let j=0; j<children[i].children.length; j++){
                        if(children[i].children[j] instanceof Konva.Text && children[i].children[j].attrs['text'] == parent[0]){
                            x1 = children[i].children[j].parent.children[0].attrs['x'];
                            y1 = children[i].children[j].parent.children[0].attrs['y'];
                        }
                    }
                }
                let x2 = 0;
                let y2 = 0;
                if(parent[1] == 'left'){
                    x2 = x1 - 120 ;
                    y2 = y1 + 100;
                }
                else{
                    x2 = x1 + 120;
                    y2 = y1 + 100;  
                }
                let keys = Object.keys(this.coordinates);
                for(let i=0; i<keys.length; i++){
                    if(this.coordinates[keys[i]]['x'] == x2){
                        if(parent[1] == 'left'){
                            x2 = this.coordinates[keys[i]]['x'] + 30;
                        }
                        else{
                            x2 = this.coordinates[keys[i]]['x']-30;
                        }
                    }
                }
                this.circles.push({x: x2, y: y2, id: Date.now(), text: this.bstNode});
                this.coordinates[val] = {x: x2, y:y2};
                let id = Date.now()+1;
                //this.lineId = id;
                this.drawningLine = true;
                this.connections.push({
                    id: id,
                    points: [x1, y1, x2, y2]
                }); 
            }
            this.bstNode = '';
        },

        inorder(){
            this.inorderRes = this.root.inorder();
            this.showResult(this.inorderRes);
        },
        preorder(){
            this.preorderRes = this.root.preorder();
            this.showResult(this.preorderRes);
        },
        postorder(){
            this.postorderRes = this.root.postorder();
            this.showResult(this.postorderRes);
        },
        showGraphMenu(){
            this.clearGraph();
            this.showBST = false;
        },
        bst(){
            this.clearGraph();
            this.showBST = true;
        },
        shortestPath(){
            this.showShortestPath = true;
            this.showInput = false;
            this.showBfsInput = false;
        },
        forceUpdate(){
            this.componentKey += 1;
        },
        removeEdge(){
            this.tab = 4;
            this.groupConfig.draggable = false;
            this.deleteNode = false; 
            this.deleteEdge = true;
        },
        removeNode(){
            this.tab = 1;
            this.groupConfig.draggable = false;
            this.deleteNode = true; 
            this.deleteEdge = false;
        },
        moveNode(){
            this.tab = 2;
            this.groupConfig.draggable = true;
            this.deleteNode = false;
            this.deleteEdge = false;
        },
        getNodes(key){
            
            let list = this.graph.getAdjacencyList();
            let nodes = list.get(key);
            let res = [];
            while(nodes){
                res.push(nodes.val);
                nodes = nodes.next;
            }
            return res;
        },
        showInputBox(){
            this.showInput = true;
            this.showBfsInput = false;
            this.showShortestPath = false;
        },
        showBfsInputBox(){
            this.showBfsInput = true;
            this.showInput = false;
            this.showShortestPath = false;
        },
        async showResult(res){
            const children = Konva.stages[0].children[0].children;
            for(let i=0 ; i<res.length;i++){
                for(let j =0; j<children.length;j++){
                    if(children[j] instanceof Konva.Group){
                        if(children[j].children[1].getAttr('text') == res[i]){
                            children[j].children[0].setAttr('fill','blue');
                            Konva.stages[0].children[0].draw();
                            await this.graph.waitForseconds(1);
                            children[j].children[0].setAttr('fill','white');
                            Konva.stages[0].children[0].draw();
                        }
                    }
                   
                }
            }
        },
        async runBfs(){
            this.tab = 7;
            this.resBfs = [];
            if(!this.startBfsStartNode || !this.nodes.includes(this.startBfsStartNode)){
                this.startBfsNodeState = false;
                return;
            }
            this.showBfsInput = false;
            this.startBfsNodeState = null;
            let dis = [];
            let list = this.graph.getAdjacencyList();
            for(let key of list.keys()){
                dis[key] = false;
            }
            let queue = new Queue();
            queue.enQ(this.startBfsStartNode);
            dis[this.startBfsStartNode] = true;
            this.startBfsStartNode = null;
            while(!queue.isQueueEmpty()){
                let v = queue.deQ();
                let temp = list.get(v);
                this.resBfs.push(v);
                
                while(temp){
                    if(!dis[temp.val]){
                        dis[temp.val] = true;
                        queue.enQ(temp.val);
                    }
                    temp = temp.next;
                }
            }
           
            this.showResult(this.resBfs);
        },
        runShortestPath(){
            this.tab = 8;
            this.resShortestPath = [];
            if((!this.startNode || !this.nodes.includes(this.startNode))){
                this.startState = false;
                return;
            }
            this.startState = null;
            if(( !this.destNode || !this.nodes.includes(this.destNode))){
                this.destState = false;
                return;
            }
            
            this.destState = null;
            this.showShortestPath = false;
            let dis = [];
            let path = new Map();
            let list = this.graph.getAdjacencyList();
            for(let key of list.keys()){
                dis[key] = false;
            }
            let queue = new Queue();
            queue.enQ(this.startNode);
            dis[this.startNode] = true;
            
            while(!queue.isQueueEmpty()){
                let v = queue.deQ();
                let temp = list.get(v);
                while(temp){
                    if(!dis[temp.val]){
                        path.set(temp.val, v);
                        dis[temp.val] = true;
                        queue.enQ(temp.val);
                    }
                    temp = temp.next;
                }
            }
            this.resShortestPath.push(this.startNode);
            while(this.destNode != this.startNode){
                this.resShortestPath.splice(1,0,this.destNode);
                this.destNode = path.get(this.destNode);
            }
            this.startNode = null;
            this.destNode = null;
            this.showResult(this.resShortestPath);
        },
        async runStackDfs(){
            this.tab = 6;
            this.resStackDfs = [];
            if(!this.stackDfsStartNode || !this.nodes.includes(this.stackDfsStartNode)){
                this.startNodeState = false;
                return;
            }
            this.showInput = false;
            let stack = new Stack();
            stack.push(this.stackDfsStartNode);
            this.stackDfsStartNode = null;
            this.startNodeState = null;
            let dis = [];
            let list = this.graph.getAdjacencyList();
            for(let key of list.keys()){
                dis[key] = false;
            }
            while(!stack.isStackEmpty()){
                let v = stack.pop();
                let temp = list.get(v);
        
                if(!dis[v]){
                    this.resStackDfs.push(v);
                    dis[v] = true;
                    while(temp){
                        stack.push(temp.val);
                        temp = temp.next;
                    }
                }
            }
            this.showResult(this.resStackDfs);
        },
        async runRecDfs(){
            this.tab = 5;
            this.graph.recursiveDfs();
            this.resRecDfs = this.graph.getResult();
            this.showResult(this.resRecDfs);
        },
        dragMove(e){
            this.updateCoordinates[0] = e.target.children[0].attrs.x;
            this.updateCoordinates[1] = e.target.children[0].attrs.y;
        },
        dragEnd(e){
            const pos = e.target.getStage().getPointerPosition();
            /**
             * Update the children of the group
            */
            e.target.children[0].attrs.x = pos.x;
            e.target.children[0].attrs.y = pos.y;
            for(let i=0; i<this.connections.length;i++){
                if((this.connections[i].points[0] == this.updateCoordinates[0]) && (this.connections[i].points[1] == this.updateCoordinates[1])){
                        this.connections[i].points[0] = pos.x;
                        this.connections[i].points[1] = pos.y;
                        this.connections[i].id += 1;
                        
                }
                else if((this.connections[i].points[2] == this.updateCoordinates[0]) && (this.connections[i].points[3] == this.updateCoordinates[1])){
                        this.connections[i].points[2] = pos.x;
                        this.connections[i].points[3] = pos.y;
                        this.connections[i].id += 1;
                }    
            }
        },
        clickCircle(){
            this.tab = 0;
            if(!this.node || this.nodes.includes(this.node)){
                this.nodeState = false;
                return;
            }
            this.nodes.push(this.node);
            this.nodeState = null;
            
            this.groupConfig.draggable = true;
            
            let x = window.innerWidth * Math.random();
            let y = (window.innerHeight -300) * Math.random();
            this.circles.push({x: x, y: y, id: Date.now(), text: this.node});
            this.node='';
            this.deleteNode = false;
            this.deleteEdge = false;
        },

        addEdge(){
            this.tab = 3;
            this.groupConfig.draggable = false;
            this.deleteNode = false;
            this.deleteEdge = false;
        },
        clearGraph(){
            Object.assign(this.$data, this.$options.data());
        },
        handleMouseDown(e) {
            if(this.deleteNode){
                if(!(e.target instanceof Konva.Circle)){
                    return;
                }
                let nodeText = e.target.parent.children[1].getAttr('text');     
                this.edges.delete(nodeText);             
                this.circles = lodash.filter(this.circles,function(cir) {
                    if(cir.text !=nodeText){
                        return cir;
                    }
                })
                this.nodes = lodash.filter(this.nodes, function(nod){
                    if(nod != nodeText){
                        return nod;
                    }
                })
                this.graph.removeNode(nodeText);
                this.graph.updateAdjacencyList(nodeText);
            }   
            else if(this.deleteEdge){
                if(!(e.target instanceof Konva.Line)){
                    return;
                }
                let points = e.target.getAttr('points');
                let x1 = points[0];
                let y1 = points[1];

                let x2 = points[2];
                let y2 = points[3];
                let nodes = [];
                let shapes = Konva.stages[0].children[0].children;
                for(let i =0; i<shapes.length; i++){
                    if(shapes[i] instanceof Konva.Group){
                        if((shapes[i].children[0].getAttr('x') == x1 && shapes[i].children[0].getAttr('y') == y1) || (
                            shapes[i].children[0].getAttr('x') == x2 && shapes[i].children[0].getAttr('y') == y2)){    
                            nodes.push(shapes[i].children[1].getAttr('text'));
                        }
                    }
                }
                this.connections = lodash.filter(this.connections,(line) => {
                    if(!lodash.isEqual(line.points,points)){
                        return line;
                    }
                })
               
                this.graph.update(nodes[0], nodes[1]);
                this.graph.update(nodes[1], nodes[0]);
                if(this.edges.get(nodes[0]) && this.edges.get(nodes[0]) == nodes[1]){
                    this.edges.delete(nodes[0]);
                }
                else if(this.edges.get(nodes[1]) && this.edges.get(nodes[1]) == nodes[0]){
                    this.edges.delete(nodes[1]);
                }
                this.forceUpdate();
            }
            else if(!this.showBST){
                if(!(e.target instanceof Konva.Circle)){
                    return;
                }
                this.src = e.target.parent.children[1].getAttr('text');
                if(this.groupConfig.draggable){
                    return;
                }
                const onCircle = e.target instanceof Konva.Circle;
                if (!onCircle) {
                    return;
                }
                let id = Date.now();
                this.lineId = id;
                this.drawningLine = true;
                this.connections.push({
                    id: id,
                    points: [e.target.x(), e.target.y()]
                });
            }
        },
        handleMouseMove(e) {
            if(this.groupConfig.draggable){
                return;
            }
           
            if (!this.drawningLine) {
                return;
            }
            const pos = e.target.getStage().getPointerPosition();
            const lastLine = this.connections[this.connections.length - 1];
            lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
        },
        handleMouseUp(e) {
            if(!this.deleteNode && !this.deleteEdge && !this.showBST){
                if(!(e.target instanceof Konva.Circle)){
                    this.connections = lodash.filter(this.connections,(line) => {
                        if(line.id != this.lineId){
                            return line;
                        }
                    })

                    this.drawningLine = false;
                    return;
                }
                let dest = e.target.parent.children[1].getAttr('text');
                
                if( (dest != '') && (dest != undefined ) && (this.src != undefined) && (this.src != dest)) {
                    /**
                     * Check if the edge exists
                    */
                    
                    if(this.edges.get(this.src) && this.edges.get(this.src) == dest){
                        this.removeLine();
                        return;

                    }
                    else if(this.edges.get(dest) && this.edges.get(dest) == this.src){
                        this.removeLine();
                        return;
                    }
                    else{
                        this.graph.addEdge(this.src, dest);
                        this.edges.set(this.src, dest);
                        this.src = null;
                        if(this.groupConfig.draggable){
                            return;
                        }
                        const onCircle = e.target instanceof Konva.Circle;
                        if (!onCircle) {
                            return;
                        }
                        this.drawningLine = false;
                        this.lineId = null;
                        const lastLine = this.connections[this.connections.length - 1];
                        lastLine.points = [
                        lastLine.points[0],
                        lastLine.points[1],
                        e.target.x(),
                        e.target.y()
                        ];
                    }
                    
                }
                else{
                    this.removeLine();
                }
            
                
            }
        },
        removeLine(){
            this.drawningLine = false;
            this.connections = lodash.filter(this.connections,(line) => {
                if(line.id != this.lineId){
                    return line;
                }
            })
        },
        handleMouseOver(e){
            if(e.target instanceof Konva.Line && this.deleteEdge){
                Konva.stages[0].getContainer().style.cursor = 'pointer';
                e.target.setAttr('stroke','red');
                e.target.setAttr('strokeWidth',10);
                this.changeLine.push(e.target);
                Konva.stages[0].children[0].draw();
            }
            
        },
        handleMouseLeave(){
            this.changeLine.forEach((line) => {
                line.setAttr('stroke','black');
                line.setAttr('strokeWidth',2);
                Konva.stages[0].getContainer().style.cursor = 'default';
                Konva.stages[0].children[0].draw();
            })
            this.changeLine = [];
        }
    }
}
</script>
<style>
.center{
    margin-top: 24px;
}
.list{
    float:left;
}

</style>