interface RemoveFromArrayListParams {
  nodes : any,
  indexToRemove : number,
  setNodes : any,
  sizesNode : any,
}

interface RemoveFromLinkedListParams extends RemoveFromArrayListParams {}
interface RemoveFromDoubleLinkedListParams extends RemoveFromArrayListParams {}

export function FromArrayList({
  nodes, indexToRemove, setNodes, sizesNode
}:RemoveFromArrayListParams):void{
  const copyNodes = [...nodes];
  
  if(indexToRemove === -1){
    const elementsCount = nodes.filter((node:any) => node.data.value).length;
    copyNodes.splice(elementsCount - 1, 1);
  }else{
    copyNodes.splice(indexToRemove, 1);
  }

  const refNode = copyNodes[indexToRemove - 1];
  const yPos = (refNode?.position.y || 200) + (nodes.length % 2 == 0 ? -1 : 1) * sizesNode.height;

  setNodes([...copyNodes, {
    id: crypto.randomUUID(),
    type: 'arrayListElement', 
    position: {x: (refNode?.position.x || 100) + sizesNode.width, y: yPos},
    data: { }
  }]);
};

export function FromLinkedList({
  nodes, indexToRemove, setNodes, sizesNode
}:RemoveFromLinkedListParams):void{
  const copyNodes = [...nodes];
  copyNodes.splice(indexToRemove, 1);
  setNodes(copyNodes);
};

export function FromDoubleLinkedList({
  nodes, indexToRemove, setNodes, sizesNode
}:RemoveFromDoubleLinkedListParams):void{
  const copyNodes = [...nodes];
  copyNodes.splice(indexToRemove, 1);
  setNodes(copyNodes);
};