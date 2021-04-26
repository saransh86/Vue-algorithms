

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
       return this._preorder([]);
    }

    _preorder(res){
        if(this){  
            res.push(this.val);
            if(this.left){
                this.left._preorder(res);
            }
            if(this.right){
                this.right._preorder(res);
            }
        }
        return res;
    }

    /**
     * Left right root
     */
    postorder(){
        return this._postorder([]);
    }

    _postorder(res){
        if(this){
            if(this.left){
                this.left._postorder(res);
            }
            if(this.right){
                this.right._postorder(res);
            }
            res.push(this.val);
        }
        return res;
    }

    /**
     * Left root right
     */
    inorder(){
        return this._inorder([]);
    }

    _inorder(res){
        if(this){
            if(this.left){
                this.left._inorder(res);
            }
            res.push(this.val);
            if(this.right){
                this.right._inorder(res);
            }
        }
        return res;
    }

    getParent(val){
        if(this.val > val){
            if(!this.left){
                return [this.val, 'left'];
            }
            else{
                return this.left.getParent(val);
            }  
        }
        else{
            if(!this.right){
                return [this.val,'right'];
            }
            else{
                return this.right.getParent(val);
            }
            
        }
    }
}