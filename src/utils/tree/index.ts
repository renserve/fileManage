import {differenceBy} from 'lodash-es'
//生成访问Tree
export function recursionTree(parent,children,records=[]) {
    parent.map(parentItem=>{
        children.map((childrenItem,index)=>{
            if(childrenItem.parent_id===parentItem.id){
                parentItem.children.push(childrenItem)
                records.push(childrenItem)
            }
            if(index===children.length-1 && (!parentItem.children || !parentItem.children.length)){
                delete parentItem.children
            }
        })
    })
    const isLeaf=parent.filter(i=>i.children)
    if(isLeaf && isLeaf[0]){
        //有下级继续递归
        recursionTree(children,differenceBy(children,records,'id'),records)
    }
    return parent
}
//递归获取id
export function recursionId(searchId,tree,records=[]) {
    // searchId,获取所有上级的ID，直到上级parentId为0
    let recordId,parentId;
    tree.some((i,index)=>{
        const id=String(i.id)
        if(id===searchId){
            recordId=String(i.parent_id)
            parentId=i.parent_id
            records.push(id)
            return true
        }
    })
    Number(parentId) && recursionId(recordId,tree,records)
    return records
}