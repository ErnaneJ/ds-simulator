interface AddFromLinkedListParams {
  refNode : Node | null | any,
  yPos : number,
  nodes : Node[] | [] | any,
  indexToChange : number,
  sizesNode : any,
  setNodes : any
}

interface AddFromDoubleLinkedListParams extends AddFromLinkedListParams {}
interface AddFromArrayListParams extends AddFromLinkedListParams {}

export function FromLinkedList({
  refNode, yPos, nodes,
  indexToChange, sizesNode, setNodes
}:AddFromLinkedListParams):void{
  const newNode = {
    id: crypto.randomUUID(),
    type: 'linkedListNode', 
    position: {x: (refNode?.position.x || 100) + sizesNode.width, y: yPos},
    data: {
      index: nodes.length,
      next: null,
      value: Math.floor(Math.random() * 100),
      label: `0x${Math.floor(Math.random() * 9999).toString(16).padStart(4,'0')}`
    }
  }

  setNodes((nodes:Node[]) => {
    if(indexToChange === 0){
      return [ newNode, ...nodes ];
    }else if(indexToChange && indexToChange < nodes.length && indexToChange > 0) return [ 
      ...nodes.slice(0, indexToChange), 
      newNode, 
      ...nodes.slice(indexToChange) 
    ];
    return [ ...nodes,  newNode ];
  });
}

export function FromDoubleLinkedList({
  refNode, yPos, nodes,
  indexToChange, sizesNode, setNodes
}:AddFromDoubleLinkedListParams):void {
  const newNode = {
    id: crypto.randomUUID(),
    type: 'doubleLinkedListNode', 
    position: {x: (refNode?.position.x || 100) + sizesNode.width, y: yPos},
    data: {
      value: Math.floor(Math.random() * 100),
      label: `0x${Math.floor(Math.random() * 9999).toString(16).padStart(4,'0')}`,
      index: nodes.length,
      next: null,
      prev: refNode?.data.label
    },
  }

  setNodes((nodes:Node[]) => {
    if(indexToChange === 0){
      return [ newNode, ...nodes ];
    }else if(indexToChange && indexToChange < nodes.length && indexToChange > 0) return [ 
      ...nodes.slice(0, indexToChange),
      newNode, 
      ...nodes.slice(indexToChange) 
    ];
    return [ ...nodes,  newNode ];
  });
}

export function FromArrayList({
  refNode, yPos, nodes,
  indexToChange, sizesNode, setNodes
}:AddFromArrayListParams):void{
  const elementsCount = nodes.filter((node:any) => node.data.value).length;
  const capacity = nodes.length;

  if(indexToChange >= elementsCount) return alert('index invalido!')
  
  const newNode = {
    id: crypto.randomUUID(),
    type: 'arrayListElement', 
    position: {x: (refNode?.position.x || 100) + sizesNode.width, y: yPos},
    data: {
      label: `0x${nodes.length.toString(16).padStart(4,'0')}`,
      value: Math.floor(Math.random() * 100),
      index: nodes.length,
      last: true
    }
  }

  let updatedNodes = [...nodes];
  if(elementsCount === capacity){
    updatedNodes = ([...updatedNodes, ...updatedNodes.map((nd:any, i:number) => {
      const lastNode = updatedNodes[updatedNodes.length - 1];
      nd = {
        id: crypto.randomUUID(), type: 'arrayListElement',
        position: {x: lastNode.position.x + nd.position.x + 100, y: nd.position.y * -1},
        data: {}
      }
      
      return nd
    })]);
  }
  
  if (indexToChange === -1){
    let nodeToUpdate = updatedNodes.find((node:any) => !node.data.value);
    
    updatedNodes = (updatedNodes.map((node:any) => {
      if(node.id === nodeToUpdate?.id) node.data = newNode.data;
      return node;
    }));
  }else{
    let copy = [...updatedNodes];
    copy.pop();
    if(indexToChange === 0){
      updatedNodes = ([ newNode, ...copy ]);
    }else {
      updatedNodes = [
        ...copy.slice(0, indexToChange),
        newNode, 
        ...copy.slice(indexToChange) 
      ];
    }
  }

  setNodes(updatedNodes);
}