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
        if((src == undefined) || (src == '') || (dest==undefined) || (dest=='')){
            return;
        }
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
            if(!srcCheck && (dest != srcTemp.val)){
                srcTemp.next = new Node(dest);
            }
        }
        
        let destTemp = this.adjacencyList.get(dest);
        if(!destTemp){
            this.adjacencyList.set(dest, new Node(src));
        }
        else{
            while(destTemp.next){
                if(src == destTemp.val){
                    destCheck = true;
                    break;
                }
                destTemp = destTemp.next;
            }
            if(!destCheck && (src!= destTemp.val)){
                destTemp.next = new Node(src);
            }
            
        }
    }
    _dfs(dis,v){
        
        dis[v] = true;
        let temp = this.adjacencyList.get(v);
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
    removeNode(node){
        this.adjacencyList.delete(node);
    }

    update(node, key){
        let head = this.adjacencyList.get(key);
        if(head){
            if(head.val == node){
                if(!head.next){
                    head = null;
                }
                else{
                    head = head.next;  
                }
                this.adjacencyList.set(key,head);
            }
            else{
                let copy = head;
                let prev = null;
                while(head){
                    if(head.val == node){
                        prev.next = head.next;
                        this.adjacencyList.set(key, copy);
                    }
                    prev = head;
                    head = head.next;
                }
            } 
        }
    }
    updateAdjacencyList(node){
        for(let key of this.adjacencyList.keys()){
            this.update(node, key);
        } 
    }
    setList(list){
        this.adjacencyList = list;
    }
 }