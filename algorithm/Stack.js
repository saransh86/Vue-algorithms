import {Node} from './Node';

export class Stack {
    constructor(){
        this.head = null;
    }

    push(val){
        let temp = new Node(val);
        if(!this.head){
            this.head = temp;
        }
        else{
            let head = this.head;
            temp.next = head;
            this.head = temp;
        }
    }

    pop(){
        let head = this.head;
        let res = head.val;
        this.head = head.next;
        return res;
    }

    display(){
        console.log("\n The current stack");
        let head = this.head;
        while(head){
            console.log(head.val);
            head = head.next;
        }
    }

    isStackEmpty(){
        if(this.head){
            return false;
        }
        else{
            return true;
        }
    }
}