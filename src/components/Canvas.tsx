import { useCallback, useEffect, useState } from 'react';

import { neutral } from 'tailwindcss/colors';
import { MarkerType } from 'reactflow';
import { ToolbarFooter } from './ToolbarFooter';
import { TollbarListType } from './TollbarListType';
import { SwitchAutoLayout } from './SwitchAutoLayout';
import { NODE_TYPES, EDGE_TYPES, SIZES_NODES, loadDefaltNode } from '../lib/constraints';

import * as Add from '../lib/Add';
import * as Remove from '../lib/Remove';
import * as Errors from '../lib/Errors';

import ReactFlow, {
  addEdge, Background, Connection, ConnectionMode, Controls,
  Node, useEdgesState, useNodesState
} from 'reactflow';

import 'reactflow/dist/style.css';
import { ToastNotification } from './ToastNotification';

export default function Canvas() {
  const [objectType, setObjectType] = useState('arrayListElement');
  const [indexToChange, setIndexToChange] = useState(-1);
  const [autoLayoutToggle, setAutoLayoutToggle] = useState(true);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(loadDefaltNode(objectType));

  const [toastOpen, setToastOpen] = useState(false);
  const [titleToast, setTitleToast] = useState('');
  const [descriptionToast, setDescriptionToast] = useState('');

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, []);

  useEffect(() => {
    setEdges([]);
    setNodes((nds) => {
      return nds.map((node, i) => {
        if (objectType === 'arrayListElement') {
          const firstElementPosition = nds[0].position;
          node.data = {
            ...node.data, 
            index: i,
            last: nds.length === i + 1,
            label: `0x${i.toString(16).padStart(4, '0')}`,
          };
          node.draggable = false,
          node.position = {
            x: firstElementPosition.x + (i * SIZES_NODES.arrayListElement.width),
            y: firstElementPosition.y
          }
        }

        if (objectType === 'linkedListNode') node.data = {
          ...node.data, index: i,
          next: nds[i + 1]?.data.label
        };

        if (objectType === 'doubleLinkedListNode') node.data = {
          ...node.data,
          next: nds[i + 1]?.data.label,
          prev: nds[i - 1]?.data.label
        };

        const source = node;
        const target = nds[i + 1];
        if (source && target) {
          let defaultConnection: any = {
            type: "default",
            source: source.id,
            sourceHandle: "right",
            target: target.id,
            targetHandle: "left",
            markerEnd: { type: MarkerType.ArrowClosed },
            markerStart: { type: MarkerType.ArrowClosed },
            animated: true,
          };

          if (objectType === 'arrayListElement') {
            return node;
          } else if (objectType === 'linkedListNode') {
            defaultConnection = { ...defaultConnection, "targetHandle": "bottom" }
          } else if (objectType === 'doubleLinkedListNode') {
            const inverseConnection = {
              type: "default",
              source: target.id,
              sourceHandle: "left",
              target: source.id,
              targetHandle: "right",
              markerEnd: { type: MarkerType.ArrowClosed },
              markerStart: { type: MarkerType.ArrowClosed },
              animated: true
            };
            setEdges(edges => addEdge(inverseConnection, edges));
          }

          setEdges(edges => addEdge(defaultConnection, edges));
        }

        return node;
      })
    });

    const realSize = nodes.filter(e => e.data.value).length;
    if (indexToChange >= realSize - 1) setIndexToChange(realSize - 1);   
  }, [nodes, edges, indexToChange]);

  useEffect(() => {
    if(toastOpen) setTimeout(() => {
      setToastOpen(false);
    }, 5000);
  }, [toastOpen]);

  function addNode() {
    const realSize = nodes.filter(e => e.data.value).length;
   
    if (Errors.objectType({
      objectType,
      setToastOpen,
      setTitleToast,
      setDescriptionToast
    })) return;

    if (Errors.invalidIndex({
      indexToChange,
      nodesLength: realSize,
      setToastOpen,
      setTitleToast,
      setDescriptionToast
    })) return;

    const refNode = indexToChange != -1 ? nodes[indexToChange] : nodes[nodes.length - 1];
    const sizesNode = (SIZES_NODES as any)[objectType];
    const yPos = (refNode?.position.y || 200) + (nodes.length % 2 == 0 ? -1 : 1) * sizesNode.height;

    if (objectType === 'arrayListElement') Add.FromArrayList({
      refNode, yPos, nodes,
      indexToChange, sizesNode, setNodes,
      setToastOpen, setTitleToast, setDescriptionToast
    });

    if (objectType === 'linkedListNode') Add.FromLinkedList({
      refNode, yPos, nodes,
      indexToChange, sizesNode, setNodes,
      setToastOpen, setTitleToast, setDescriptionToast
    });

    if (objectType === 'doubleLinkedListNode') Add.FromDoubleLinkedList({
      refNode, yPos, nodes,
      indexToChange, sizesNode, setNodes,
      setToastOpen, setTitleToast, setDescriptionToast
    });

    autoLayout();
  }

  function removeNode(index?: number) {
    const indexToRemove = typeof index === 'number' ? index : indexToChange;
    const realSize = nodes.filter(n => n.data.value).length;

    if (Errors.listIsEmpty({
      setToastOpen,
      setTitleToast,
      setDescriptionToast,
      realSize
    })) return;

    if (Errors.objectType({
      objectType,
      setToastOpen,
      setTitleToast,
      setDescriptionToast
    })) return;

    if (Errors.invalidIndex({
      indexToChange: indexToRemove,
      nodesLength: realSize,
      setToastOpen,
      setTitleToast,
      setDescriptionToast
    })) return;

    const paramsToRemove = {
      nodes, indexToRemove, setNodes
    }

    if (objectType === 'arrayListElement') Remove.FromArrayList(paramsToRemove);
    if (objectType === 'linkedListNode') Remove.FromLinkedList(paramsToRemove);
    if (objectType === 'doubleLinkedListNode') Remove.FromDoubleLinkedList(paramsToRemove);

    autoLayout();
  }

  function handleNodeClick(event: React.MouseEvent, node: Node) {
    switch (event.detail) {
      case 1: {
        // setIndexToChange(parseInt(node.data.index));
        break;
      }
      case 2: {
        removeNode(parseInt(node.data.index));
        break;
      }
      default: {
        break;
      }
    }
  }

  function autoLayout() {
    if (!autoLayoutToggle) return;
    if(objectType ==='arrayListElement') return;
    setNodes((nds: Node[]) => {
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

  const changeListType = (type: string) => {
    setObjectType(type);
    setNodes(loadDefaltNode(type));
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
        onNodeClick={handleNodeClick}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background gap={12} size={2} color={neutral[800]} />
        <Controls style={{ backgroundColor: neutral[50] }} />
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
        maxIndex={nodes.filter(n => n.data.value).length - 1}
      />

      <ToastNotification
        open={toastOpen}
        setOpen={setToastOpen}
        title={titleToast}
        description={descriptionToast}
      />
    </div>
  );
}
