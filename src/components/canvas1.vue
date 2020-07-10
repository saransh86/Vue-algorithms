<template>
  <div class="hello">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-brand href="#">Create Graph</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <div>
            <b-form-input v-model="node" placeholder="Enter the node" :state="nodeState"> </b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              Need a number
            </b-form-invalid-feedback>
          </div>
          <b-nav-item href="#" @click="clickCircle">Add Node</b-nav-item>
          <b-nav-item @click="addLine">Connect Node</b-nav-item>
          <b-nav-item @click="moveNode">Move Node</b-nav-item>
        </b-navbar-nav>

      <!-- Right aligned nav items -->
      </b-collapse>
    </b-navbar>
    <!-- <v-stage :config="configKonva">
    <v-layer>
      <v-circle :config="configCircle" @click="clickCircle">
        
      </v-circle>
      <v-text :config="textConfig"> </v-text>
    </v-layer>
  </v-stage> -->
    <div id="container">
      <!-- <v-stage> 
        <v-layer> 
          <v-line v-for="line in connections"
          :key="line.id"
          :config="{
            stroke: 'black',
            points: line.points
          }">
          </v-line>
        </v-layer>
      </v-stage> -->
    </div>
  </div>
</template>

<script>
import Konva from 'konva';
export default {
  name: 'HelloWorld',
  mounted() {
    this.stage = new Konva.Stage ({
        container: 'container',
        width: this.width,
        height: this.height
      })
    this.layer = new Konva.Layer({clearBeforeDraw: true})
  },
  data() {
    return {
      height: window.innerHeight,
      width : window.innerWidth,
      stage: null,
      layer: null,
      node: '',
      nodeState: null,
      drawningLine: false,
      connections : []
    }
  },
  methods:{

    // handleMouseDown(e) {
    //   const onCircle = e instanceof Konva.Group;
    //   if (!onCircle) {
    //     return;
    //   }
    //   this.drawningLine = true;
    //   this.connections.push({
    //     id: Date.now(),
    //     points: [e.target.x(), e.target.y()]
    //   });
    // },
    moveNode(){
      
       this.layer.on('mousedown', function(e){
        if(e.target.parent instanceof Konva.Group){
          e.target.parent.attrs.dragBoundFunc = function(){
            return;
          };
        }
        console.log("Start",  e.target.parent);
      })
    },

    addLine(){
      console.log("Connect Node");
      
       
      var line = new Konva.Line({
        
          points: [],
          stroke: "black"
        });
      this.layer.on('mousedown', (e) =>{
        if(e.target.parent instanceof Konva.Group){
          // test = e.target.parent;
          e.target.parent.attrs.dragBoundFunc = function(){
            var pos = this.getAbsolutePosition();
            return {x: pos.x, y: pos.y};
          }
          
          
        }
        // console.log("TEST", test, this);
        const pos = e.target.getStage().getPointerPosition();
        line.position({
          x: pos.x,
          y: pos.y
        });
        line.points(line.points().concat([pos.x/8, pos.y/8]));
        // prev.x = e.target.attrs.x;
        // prev.y = e.target.attrs.y;
        console.log("Mouse down", line, e.target);
        this.layer.add(line);
        this.stage.add(this.layer);
        
      })

      this.stage.on('dragmove', (e)=>{
        
       
        const pos = e.target.getStage().getPointerPosition();
       
        line.points(line.points().concat([ pos.x/8, pos.y/8]));
        
        this.layer.add(line);
        // prev = pos;
        console.log("Mouse Move", pos);
        this.stage.add(this.layer);
      })

      this.stage.on('dragend', (e)=>{
        const pos = e.target.getStage().getPointerPosition();
        // const lastLine = this.connections[this.connections.length - 1];
        
        line.points(line.points().concat([pos.x/8, pos.y/8]));
        
        this.layer.add(line);
        console.log("Mouse end", pos);
        this.stage.add(this.layer);
      })
      
      
    },
    clickCircle(){
      console.log("Clicked Circle", this.width, this.height);
      
      if(!this.node){
        this.nodeState = false;
        return;
      }
      this.nodeState = null;
      // var width = window.innerWidth ;
      // var height = window.innerHeight;

      // var stage = new Konva.Stage({
      //   container: 'container',
      //   width: width,
      //   height: height,
      // });

      // var layer = new Konva.Layer({clearBeforeDraw: false});


       var circle = new Konva.Group({
        x: this.width/8,
        y: this.height/8,
        radius: 30,
        draggable: true,
        // dragBoundFunc: function(){
        //    var pos = this.getAbsolutePosition();
        //     return {x: pos.x};
        // }
    }); 
      var circleObj = {
        x: this.width/8,
        y: this.height/8,
        radius: 30,
        fill: 'white',
        stroke: 'black',
        shadowColor: 'black',
        strokeWidth: 4
        // draggable: true
      };
      circle.add(new Konva.Circle(circleObj));
      circle.add(new Konva.Text({
        x: this.width/8 -7,
        y: this.height/8-3,
        text: this.node
      }))
    
      // add the shape to the layer
      this.layer.add(circle);

      // add the layer to the stage
      this.stage.add(this.layer);
      this.node = '';
      circle.on('dblclick', function(){
        console.log("Mouse over!");
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

