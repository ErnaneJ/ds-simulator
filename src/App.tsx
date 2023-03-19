import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, Background, Connection, ConnectionMode, Controls, MiniMap, useEdgesState, useNodesState } from 'reactflow';
import * as Toolbar from '@radix-ui/react-toolbar';
import 'reactflow/dist/style.css';
import { neutral } from 'tailwindcss/colors';
import DefaultEdge from './components/edges/DefaultEdge';
import { ArrayListElement } from './components/nodes/ArrayListElement';
import { Circle } from './components/nodes/Circle';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { LinkedListNode } from './components/nodes/LinkedListNode';
import { DoubleLinkedListNode } from './components/nodes/DoubleLinkedList';
import { MarkerType } from 'reactflow';

const NODE_TYPES = {
  arrayListElement: ArrayListElement,
  linkedListNode: LinkedListNode,
  doubleLinkedListNode: DoubleLinkedListNode,
  circle: Circle
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

function App() {
  const [objectType, setObjectType] = useState('doubleLinkedListNode');

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node, i) => {
        if(objectType === 'arrayListElement') node.data = { ...node.data, last: nds.length === i+1 };
        if(objectType === 'linkedListNode') node.data = { ...node.data, index: i, next: nds[i+1]?.data.label };
        if(objectType === 'doubleLinkedListNode') node.data = { ...node.data, next: nds[i+1]?.data.label, prev: nds[i-1]?.data.label };

        const source = node;
        const target = nds[i + 1];
        if(source && target){
          let connection = {
            "type": "default",
            "source": source.id,
            "sourceHandle": "right",
            "target": target.id,
            "targetHandle": "left",
            // "animated": true,
          }
          if(objectType === 'arrayListelement'){
            // NOOP
          }else if(objectType === 'linkedListNode'){
            connection = { ...connection, "targetHandle": "bottom" };
          }else if(objectType === 'doubleLinkedListNode'){
            const connection2 = { 
              "type": "default", 
              "source": target.id,
              "sourceHandle": "left",
              "target": source.id,
              "targetHandle": "right",
            };
            setEdges(edges => addEdge(connection2, edges));
          }
          
          setEdges(edges => addEdge(connection, edges));
        }
    

        return node;
      })
    );

    setEdges((eds) =>
      eds.map((edge, i) => {
        // if(objectType === 'arrayListElement') node.data = { ...node.data, last: nds.length === i+1 };
        // if(objectType === 'doubleLinkedListNode') 
        edge['markerEnd'] = { type: MarkerType.Arrow };
        edge['markerStart'] = { type: MarkerType.Arrow };
        
        // if(objectType === 'doubleLinkedListNode' || objectType === 'linkedListNode' ) edge['markerEnd'] = { type: MarkerType.Arrow };

        return edge;
      })
    );
  }, [nodes, edges]);

  function addNode(){
    const lastNode = nodes[nodes.length - 1];
    const newNode = {
      id: crypto.randomUUID(),
      type: objectType, 
      position: {}, 
      data: { },
    }

    if(objectType === 'arrayListElement'){
      newNode.position = {x: (lastNode?.position.x || 0) + 200, y: (lastNode?.position.y || 50)};
      newNode.data = {
        label: `0x${String(nodes.length).padStart(4,'0')}`,
        value: Math.floor(Math.random() * 100),
        index: nodes.length,
        last: true
      }
    }else if(objectType === 'linkedListNode'){
      const yPos = (lastNode?.position.y || 100) + (nodes.length % 2 == 0 ? -1 : 1) * 50;
      newNode.position = {x: (lastNode?.position.x || 0) + 250, y: yPos};
      newNode.data = {
        index: nodes.length,
        next: null,
        value: Math.floor(Math.random() * 100),
        label: `0x${String(Math.floor(Math.random() * 9999)).padStart(4,'0')}`
      }
    }else if(objectType === 'doubleLinkedListNode'){
      const yPos = (lastNode?.position.y || 100) + (nodes.length % 2 == 0 ? -1 : 1) * 50;
      newNode.position = {x: (lastNode?.position.x || 0) + 350, y: yPos};
      newNode.data = {
        value: Math.floor(Math.random() * 100),
        label: `0x${String(Math.floor(Math.random() * 9999)).padStart(4,'0')}`,
        index: nodes.length,
        next: null,
        prev: lastNode?.data.label
      }
    }
    
    setNodes(nodes => [...nodes, newNode]);
  }

  const changeListType = (type:string) => {
    setObjectType(type || 'arrayList');
    setNodes([]);
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

      <ToggleGroup.Root
          className="fixed top-2 left-2 gap-1 flex dounded-md shadow"
          type="single"
          defaultValue={objectType}
          aria-label="Tipo de lista"
          onValueChange={changeListType}
        >
          <ToggleGroup.Item 
            className="bg-white hover:bg-purple-200 focus:bg-purple-200 cursor-pointer text-purple-800 font-semibold flex font-md items-center justify-center px-4 py-1 rounded ToggleGroupItem" 
            value="arrayListElement" 
            aria-label="Array List"
          >
            Array List
          </ToggleGroup.Item>
          <ToggleGroup.Item 
            className="bg-white hover:bg-purple-200 focus:bg-purple-200 cursor-pointer text-purple-800 font-semibold flex font-md items-center justify-center px-4 py-1 rounded ToggleGroupItem" 
            value="linkedListNode"
             aria-label="Linked List"
            >
             Linked List
          </ToggleGroup.Item>
          <ToggleGroup.Item 
            className="bg-white hover:bg-purple-200 focus:bg-purple-200 cursor-pointer text-purple-800 font-semibold flex font-md items-center justify-center px-4 py-1 rounded ToggleGroupItem" 
            value="doubleLinkedListNode" 
            aria-label="Double Linked List"
          >
            Double Linked List
          </ToggleGroup.Item>
        </ToggleGroup.Root>

      <Toolbar.Root 
        className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden flex items-start justify-center gap-3'>
       
        <Toolbar.Button 
          onClick={addNode} 
          className='w-24 h-24 font-xl bg-violet-800 shadow-xl mt-6 rounded transition-transform hover:-translate-y-2 text-white flex items-start pt-4 font-bold justify-center'>
          Add
        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  )
}

export default App
