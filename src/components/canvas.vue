<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand href="#">Create Graph</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <div>
                    <b-form-input v-model="node" placeholder="Enter the node" :state="nodeState"> </b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Need a number or node exists with the number
                    </b-form-invalid-feedback>
                </div>
                <b-nav-item href="#" @click="clickCircle">Add Node </b-nav-item>
                <b-nav-item href="#" @click="addLine" :disabled="circles.length<2">Connect Node</b-nav-item>
                <b-nav-item href="#" @click="clearGraph">Clear Graph</b-nav-item>
                <!-- <b-nav-item href="#" @click="showAdjacencyList"> Show List </b-nav-item> -->
                <b-nav-item href="#" @click="runRecDfs" :disabled="circles.length<2">DFS Rec</b-nav-item>
                <b-nav-item href="#" @click="showInputBox" :disabled="circles.length<2">DFS Stack</b-nav-item>
                 <b-nav-item href="#" @click="showBfsInputBox" :disabled="circles.length<2">BFS</b-nav-item>
                <div :hidden="!showInput">
                    <b-nav-form>
                    <b-form-input v-model="stackDfsStartNode" placeholder="Enter the DFS start node" :state="startNodeState" > </b-form-input>
                    <b-button variant="dark" class="my-2 my-sm-0" @click="runStackDfs">Run</b-button>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Need a node number or number not in nodes
                    </b-form-invalid-feedback>
                    </b-nav-form>
                </div>
                <div :hidden="!showBfsInput">
                    <b-nav-form>
                        <b-form-input v-model="startBfsStartNode" placeholder="Enter the BFS start node" :state="startBfsNodeState" > </b-form-input>
                        <b-button variant="dark" class="my-2 my-sm-0" @click="runBfs">Run</b-button>
                        <b-form-invalid-feedback id="input-live-feedback">
                            Need a node number or number not in nodes
                        </b-form-invalid-feedback>
                    </b-nav-form>
                </div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
   
    <v-stage :config="configKonva" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" @dragstart="dragMove" @dragend="dragEnd"> 
        <v-layer> 
            <v-line v-for="line in connections" :key="line.id" :config="{ stroke: 'black', points: line.points}"/>
            <v-group v-for="circle in circles" :key="circle.id" :config="groupConfig">
                <v-circle  :config="{x:circle.x, y:circle.y, fill:'white',radius: 30, stroke:'black' }"> </v-circle>
                <v-text  :config="{x:circle.x - 6, y: circle.y -4, text: circle.text}"> </v-text>
            </v-group>
        </v-layer>
    </v-stage>
    <b-container>
        <b-row>
            <b-col>
                <b-list-group v-for="res in resRecDfs" :key="res">
                    <b-list-group-item variant="dark"> DFS Recurrsive: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col>
                <b-list-group v-for="res in resStackDfs" :key="'A' + res">
                    <b-list-group-item variant="dark"> DFS using stack: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col>
                <b-list-group v-for="res in resBfs" :key="'B' + res">
                    <b-list-group-item variant="dark"> BFS: {{res}}</b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import Konva from "konva";
import {Graph} from "../../algorithm/Graph";
import {Stack} from "../../algorithm/Stack";
import {Queue} from "../../algorithm/Queue";
export default {
    data(){
        return{
            configKonva: {
                width: window.innerWidth,
                height: window.innerHeight-300,
            },
            node: '',
            nodeState: null,
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
            startNode : '',
            resRecDfs : [],
            resStackDfs: [],
            resBfs: [],
            showInput: null,
            stackDfsStartNode: null,
            showBfsInput:null,
            startBfsStartNode:null,
            startBfsNodeState: null
        }
    },
    methods:{
        showInputBox(){
            this.showInput = true;
            this.showBfsInput = false;
        },
        showBfsInputBox(){
            this.showBfsInput = true;
            this.showInput = false;
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
            console.log("BFS", this.startBfsStartNode);
            this.resBfs = [];
            if(!this.startBfsStartNode || !this.nodes.includes(this.startBfsStartNode)){
                this.startBfsNodeState = false;
                return;
            }
            this.showBfsInput = false;
            // this.startBfsStartNode = null;
            this.startBfsNodeState = null;
            let dis = [];
            let list = this.graph.getAdjacencyList();
            for(let key of list.keys()){
                dis[key] = false;
            }
            let queue = new Queue();
            queue.enQ(this.startBfsStartNode);
            dis[this.startBfsStartNode] = true;
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
        async runStackDfs(){
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
            this.graph.recursiveDfs();
            this.resRecDfs = this.graph.getResult();
            this.showResult(this.resRecDfs);
        },
        showAdjacencyList(){
            console.log(this.graph.displayGraph());
        },
        dragMove(e){
            console.log("Pointer position", e.target.getStage().getPointerPosition());
            console.log("Start", e.target.x(), e.target.y());
        },
        dragEnd(e){
            const pos = e.target.getStage().getPointerPosition();
           
            /**
             * Update the children of the group
            */
            e.target.children[0].attrs.x = pos.x;
            e.target.children[0].attrs.y = pos.y;
      
            console.log(e.target.children[0].x(), e.target.children[0].y());
            
        },
        clickCircle(){
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
        },

        addLine(){
            this.groupConfig.draggable = false;
        },
        clearGraph(){
            this.circles = [];
            this.connections = [];
            this.nodes = [];
            this.graph = new Graph();
            this.resRecDfs = [];
            this.resStackDfs = [];
            this.resBfs = [];

        },
        handleMouseDown(e) {
           
            console.log("SRC",e.target.parent.children[1].getAttr('text'));
            this.src = e.target.parent.children[1].getAttr('text');
            if(this.groupConfig.draggable){
                return;
            }
            const onCircle = e.target instanceof Konva.Circle;
            console.log("Circle", onCircle);
            if (!onCircle) {
                return;
            }
            this.drawningLine = true;
            this.connections.push({
                id: Date.now(),
                points: [e.target.x(), e.target.y()]
            });
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
            console.log("DEST",e.target.parent.children[1].getAttr('text'));
            if(this.src != e.target.parent.children[1].getAttr('text')){
                this.graph.addEdge(this.src, e.target.parent.children[1].getAttr('text'));
                this.src = null;
            }
            
            if(this.groupConfig.draggable){
                return;
            }
            const onCircle = e.target instanceof Konva.Circle;
            if (!onCircle) {
                return;
            }
            this.drawningLine = false;
            const lastLine = this.connections[this.connections.length - 1];
            lastLine.points = [
            lastLine.points[0],
            lastLine.points[1],
            e.target.x(),
            e.target.y()
            ];
        }
    }
}
</script>
<style>
.center{
    float: left;
}

</style>