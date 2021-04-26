

export class BinarySearchTree{

    constructor(val, left, right){
        this.val =(val ==undefined)?0:val;
        this.left =(left == undefined)?null:left;
        this.right = (right == undefined)?null: right;
    }

    insert(val){
        if(this.val > val){
            if(!this.left){
                this.left = new BinarySearchTree(val);
            }
            else{
                this.left.insert(val);
            }  
        }
        else{
            if(!this.right){
                this.right = new BinarySearchTree(val);
            }
            else{
                this.right.insert(val);
            }
            
        }
    }
    /**
     * Root Left right
     */
    preorder(){
        if(this){  
            console.log(this.val);
            if(this.left){
                this.left.preorder();
            }
            if(this.right){
                this.right.preorder();
            }
        }
    }

    /**
     * Left right root
     */
    postorder(){
        if(this){
            if(this.left){
                this.left.postorder();
            }
            if(this.right){
                this.right.postorder();
            }
            console.log(this.val);
        }
    }

    /**
     * Left root right
     */
    inorder(){
        if(this){
            if(this.left){
                this.left.inorder();
            }
            console.log(this.val);
            if(this.right){
                this.right.inorder();
            }
        }
    }

    getParent(val){
       
        if(this.val > val){
            if(!this.left){
                // console.log("Returning from the left ", this.val);
                return [this.val, 'left'];
            }
            else{
                // console.log("Going to the left from ", this.val);
                return this.left.getParent(val);
            }  
        }
        else{
            if(!this.right){
                // console.log("Returning from the right", this.val);
                return [this.val,'right'];
            }
            else{
                // console.log("Going to the right from ", this.val)
                return this.right.getParent(val);
            }
            
        }
    }
}