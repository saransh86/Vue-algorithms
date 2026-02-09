import {Queue} from '../../algorithm/Queue';
import {Stack} from '../../algorithm/Stack';

export function dfsRecursive(graph){
    graph.recursiveDfs();
    return graph.getResult();
}

export function dfsStack(list, start){
    let res = [];
    let dis = new Map();
    for(let key of list.keys()){
        dis.set(key, false);
    }
    let stack = new Stack();
    stack.push(start);
    while(!stack.isStackEmpty()){
        let v = stack.pop();
        let temp = list.get(v);
        if(!dis.get(v)){
            res.push(v);
            dis.set(v, true);
            while(temp){
                stack.push(temp.val);
                temp = temp.next;
            }
        }
    }
    return res;
}

export function bfs(list, start){
    let res = [];
    let dis = new Map();
    for(let key of list.keys()){
        dis.set(key, false);
    }
    let queue = new Queue();
    queue.enQ(start);
    dis.set(start, true);
    while(!queue.isQueueEmpty()){
        let v = queue.deQ();
        let temp = list.get(v);
        res.push(v);
        while(temp){
            if(!dis.get(temp.val)){
                dis.set(temp.val, true);
                queue.enQ(temp.val);
            }
            temp = temp.next;
        }
    }
    return res;
}

export function shortestPath(list, start, dest){
    if(start === dest){
        return {reachable: true, path: [start]};
    }
    let dis = new Map();
    let path = new Map();
    for(let key of list.keys()){
        dis.set(key, false);
    }
    let queue = new Queue();
    queue.enQ(start);
    dis.set(start, true);
    while(!queue.isQueueEmpty()){
        let v = queue.deQ();
        let temp = list.get(v);
        while(temp){
            if(!dis.get(temp.val)){
                path.set(temp.val, v);
                dis.set(temp.val, true);
                queue.enQ(temp.val);
            }
            temp = temp.next;
        }
    }
    if(!path.has(dest)){
        return {reachable: false, path: []};
    }
    let res = [start];
    let cur = dest;
    while(cur !== start){
        res.splice(1, 0, cur);
        cur = path.get(cur);
    }
    return {reachable: true, path: res};
}
