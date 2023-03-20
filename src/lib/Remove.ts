interface RemoveFromArrayListParams {
  nodes : any,
  indexToChange : number,
  setNodes : any,
  sizesNode : any,
}

interface RemoveFromLinkedListParams extends RemoveFromArrayListParams {}
interface RemoveFromDoubleLinkedListParams extends RemoveFromArrayListParams {}

export function FromArrayList({
  nodes, indexToChange, setNodes, sizesNode
}:RemoveFromArrayListParams):void{
  const copyNodes = [...nodes];
  
  if(indexToChange === -1){
    const elementsCount = nodes.filter((node:any) => node.data.value).length;
    copyNodes.splice(elementsCount - 1, 1);
  }else{
    copyNodes.splice(indexToChange, 1);
  }

  const refNode = copyNodes[indexToChange - 1];
  const yPos = (refNode?.position.y || 200) + (nodes.length % 2 == 0 ? -1 : 1) * sizesNode.height;

  setNodes([...copyNodes, {
    id: crypto.randomUUID(),
    type: 'arrayListElement', 
    position: {x: (refNode?.position.x || 100) + sizesNode.width, y: yPos},
    data: { }
  }]);
};

export function FromLinkedList({
  nodes, indexToChange, setNodes, sizesNode
}:RemoveFromLinkedListParams):void{
  const copyNodes = [...nodes];
  copyNodes.splice(indexToChange, 1);
  setNodes(copyNodes);
};

export function FromDoubleLinkedList({
  nodes, indexToChange, setNodes, sizesNode
}:RemoveFromDoubleLinkedListParams):void{
  const copyNodes = [...nodes];
  copyNodes.splice(indexToChange, 1);
  setNodes(copyNodes);
};