import {Node} from './Node';

export class Graph{
    constructor(){
        this.adjacencyList = new Map();
        this.result = [];
    }

    displayGraph(){
        console.log("Displaying the graph");
        this.adjacencyList.forEach((values, keys) =>{
            console.log("\n Vertex:", keys);
            let temp = values;
            while(temp){
                console.log("\t ", temp.val);
                temp = temp.next;
            }
        })
    }

    addEdge(src, dest){
        let srcTemp = this.adjacencyList.get(src);
        let srcCheck = null;
        let destCheck = null;
        if(!srcTemp){
            this.adjacencyList.set(src, new Node(dest));
        }
        else{
            while(srcTemp.next){
                if(dest == srcTemp.val){
                    srcCheck = true;
                    break;
                }
                srcTemp = srcTemp.next;
            }
            if(!srcCheck){
                srcTemp.next = new Node(dest);
            }
           
        }
        
        let destTemp = this.adjacencyList.get(dest);
        if(!destTemp){
            this.adjacencyList.set(dest, new Node(src));
        }
        else{
            while(destTemp.next){
                if(destCheck == destTemp.val){
                    destCheck = true;
                    break;
                }
                destTemp = destTemp.next;
            }
            if(!destCheck){
                destTemp.next = new Node(src);
            }
            
        }
    }
    _dfs(dis,v){
        
        dis[v] = true;
        let temp = this.adjacencyList.get(v);
        console.log("DFS:", v);
        this.result.push(v);
        while(temp){
            if(!dis[temp.val]){
                this._dfs(dis,temp.val)
            }
            temp = temp.next;
        }
    }
    recursiveDfs(){
        this.result = [];
        let dis = [];
        for(let key of this.adjacencyList.keys()){
            dis[key] = false;
        }
        for(let key of this.adjacencyList.keys()){
            if(!dis[key]){
                // let temp = this.adjacencyList.get(key);
                this._dfs(dis,key);
            }
        }
    }

    getResult(){
        return this.result;
    }
    waitForseconds(seconds){
        return new Promise((resolve) => setTimeout(resolve,1000 * seconds));
    }
    getAdjacencyList(){
        return this.adjacencyList;
    }
 }