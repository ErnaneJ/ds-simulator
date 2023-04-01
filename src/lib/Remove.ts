interface RemoveFromArrayListParams {
  nodes : any,
  indexToRemove : number,
  setNodes : any,
}

interface RemoveFromLinkedListParams extends RemoveFromArrayListParams {}
interface RemoveFromDoubleLinkedListParams extends RemoveFromArrayListParams {}

export function FromArrayList({
  nodes, indexToRemove, setNodes
}:RemoveFromArrayListParams):void{
  const copyNodes = [...nodes];
  
  if(indexToRemove === -1){
    const elementsCount = nodes.filter((node:any) => node.data.value).length;
    const refNode = copyNodes[elementsCount - 1]
    if(refNode) refNode.data.value = null;
  }else{
    copyNodes[indexToRemove].data.value = null;
  }

  setNodes(copyNodes);
};

export function FromLinkedList({
  nodes, indexToRemove, setNodes
}:RemoveFromLinkedListParams):void{
  const copyNodes = [...nodes];
  copyNodes.splice(indexToRemove, 1);
  setNodes(copyNodes);
};

export function FromDoubleLinkedList({
  nodes, indexToRemove, setNodes
}:RemoveFromDoubleLinkedListParams):void{
  const copyNodes = [...nodes];
  copyNodes.splice(indexToRemove, 1);
  setNodes(copyNodes);
};