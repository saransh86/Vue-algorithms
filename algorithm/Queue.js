import {Node} from './Node';

export class Queue{
    constructor(){
        this.head = null;
    }

    enQ(val){
        if(!this.head){
            this.head = new Node(val);
        }
        else{
            let head = this.head;
            while(head.next){
                head = head.next;
            }
            head.next = new Node(val);
        }
    }

    display(){
        console.log("\n The current queue");
        let head = this.head;
        while(head){
            console.log("\n", head.val);
            head = head.next;
        }
    }

    deQ(){
        let head = this.head;
        let res = head.val;
        this.head = head.next;
        return res;
    }

    isQueueEmpty(){
        if(this.head){
            return false;
        }
        else{
            return true;
        }
    }
}