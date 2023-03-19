import { useCallback, useEffect, useState } from 'react';

import { neutral } from 'tailwindcss/colors';
import { MarkerType } from 'reactflow';
import { ToolbarFooter } from './ToolbarFooter';
import { TollbarListType } from './TollbarListType';
import { SwitchAutoLayout } from './SwitchAutoLayout';
import { NODE_TYPES, EDGE_TYPES, SIZES_NODES } from '../lib/constraints';

import 'reactflow/dist/style.css';
import ReactFlow, { 
  addEdge, Background, Connection, ConnectionMode, Controls, 
  Node, useEdgesState, useNodesState 
} from 'reactflow';

export default function Canvas() {
  const [objectType, setObjectType] = useState('arrayListElement');
  const [indexToChange, setIndexToChange] = useState(-1);
  const [autoLayoutToggle, setAutoLayoutToggle] = useState(false);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, []);

  useEffect(() => {
    setNodes((nds) => {
      setEdges([]);
      return nds.map((node, i) => {
        if(objectType === 'arrayListElement') node.data = { ...node.data, index: i, last: nds.length === i+1 };
        if(objectType === 'linkedListNode') node.data = { ...node.data, index: i, next: nds[i+1]?.data.label };
        if(objectType === 'doubleLinkedListNode') node.data = { ...node.data, next: nds[i+1]?.data.label, prev: nds[i-1]?.data.label };

        const source = node;
        const target = nds[i + 1];
        if(source && target){
          let connection:any = {
            "type": "default",
            "source": source.id,
            "sourceHandle": "right",
            "target": target.id,
            "targetHandle": "left",
            "markerEnd": { type: MarkerType.Arrow },
            "markerStart": { type: MarkerType.Arrow }
          };

          if(objectType === 'arrayListelement'){
            delete connection["markerEnd"];
            delete connection["markerStart"];
          }else if(objectType === 'linkedListNode'){
            connection = { ...connection,  "targetHandle": "bottom" }
            
          }else if(objectType === 'doubleLinkedListNode'){
            const connection2 = { 
              "type": "default", 
              "source": target.id,
              "sourceHandle": "left",
              "target": source.id,
              "targetHandle": "right",
              "markerEnd": { type: MarkerType.Arrow },
              "markerStart": { type: MarkerType.Arrow }
            };
            setEdges(edges => addEdge(connection2, edges));
          }
          
          setEdges(edges => addEdge(connection, edges));
        }
    
        return node;
      })
    });

    setEdges((eds) => eds.map((edge, i) => {
        edge['markerEnd'] = { type: MarkerType.Arrow };
        edge['markerStart'] = { type: MarkerType.Arrow };

        return edge;
      })
    );
  }, [nodes, edges]);

  function addNode(){
    if(!objectType) return alert("Tipo de lista inválido!");
    if(indexToChange < -1 || indexToChange >= nodes.length) return alert("Index inválido!");

    if(!indexToChange) setIndexToChange(-1);
    const refNode = indexToChange != -1 ? nodes[indexToChange] : nodes[nodes.length - 1];
    const yPos = (refNode?.position.y || 200) + (nodes.length % 2 == 0 ? -1 : 1) * (SIZES_NODES as any)[objectType].height;
    const newNode = {
      id: crypto.randomUUID(),
      type: objectType, 
      position: {x: (refNode?.position.x || 100) + (SIZES_NODES as any)[objectType].width, y: yPos},
      data: { },
    }

    if(objectType === 'arrayListElement'){
      newNode.data = {
        label: `0x${String(nodes.length).padStart(4,'0')}`,
        value: Math.floor(Math.random() * 100),
        index: nodes.length,
        last: true
      }
    }else if(objectType === 'linkedListNode'){
      newNode.data = {
        index: nodes.length,
        next: null,
        value: Math.floor(Math.random() * 100),
        label: `0x${String(Math.floor(Math.random() * 9999)).padStart(4,'0')}`
      }
    }else if(objectType === 'doubleLinkedListNode'){
      newNode.data = {
        value: Math.floor(Math.random() * 100),
        label: `0x${String(Math.floor(Math.random() * 9999)).padStart(4,'0')}`,
        index: nodes.length,
        next: null,
        prev: refNode?.data.label
      }
    }
    
    setNodes((nodes:Node[]) => { // TODO any???
      if(indexToChange === 0){
        return [ 
          newNode, 
          ...nodes
        ];
      }else if(indexToChange && indexToChange < nodes.length && indexToChange > 0) return [ 
        ...nodes.slice(0, indexToChange), 
        newNode, 
        ...nodes.slice(indexToChange) 
      ];
      return [ ...nodes,  newNode ];
    });

    autoLayout();
  }

  function removeNode(){
    if(indexToChange < -1 || indexToChange >= nodes.length){
      alert("Index inválido!")
    }
    const copyNodes = [...nodes];
    copyNodes.splice(indexToChange, 1);
    setNodes(copyNodes);
  }
  
  function autoLayout(){
    if (!autoLayoutToggle) return;
    setNodes((nds:Node[]) => {
      return nds.map((node, i) => {
        const lastNode = nds[i - 1];
        node.position = {
          x: (lastNode?.position.x || 100) + (SIZES_NODES as any)[objectType].width, 
          y: (lastNode?.position.y || 100) + (i % 2 == 0 ? -1 : 1) * (SIZES_NODES as any)[objectType].height
        };
        return node;
      });
    });
  }

  const changeListType = (type:string) => {
    setObjectType(type);
    setNodes([]);
    setEdges([]);
    setIndexToChange(-1);
  }

  return (
    <div className="w-screen h-screen bg-neutral-900">       
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background gap={12} size={2} color={neutral[800]} />
        <Controls style={{backgroundColor: neutral[50]}}/>
      </ReactFlow>

      
      <SwitchAutoLayout 
        autoLayoutToggle={autoLayoutToggle}
        setAutoLayoutToggle={setAutoLayoutToggle}
      />

      <TollbarListType
        objectType={objectType}
        changeListType={changeListType}
      />

      <ToolbarFooter 
        addNode={addNode} 
        removeNode={removeNode} 
        indexToChange={indexToChange} 
        setIndexToChange={setIndexToChange} 
      />
    </div>
  );
}
