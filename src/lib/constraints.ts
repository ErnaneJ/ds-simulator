import DefaultEdge from "../components/edges/DefaultEdge"
import { ArrayListElement } from "../components/nodes/ArrayListElement"
import { DoubleLinkedListNode } from "../components/nodes/DoubleLinkedList"
import { LinkedListNode } from "../components/nodes/LinkedListNode"

interface IsizeNodes{
  arrayListElement: { width: number, height: number },
  linkedListNode: { width: number, height: number },
  doubleLinkedListNode: { width: number, height: number },
}

export const NODE_TYPES = {
  arrayListElement: ArrayListElement,
  linkedListNode: LinkedListNode,
  doubleLinkedListNode: DoubleLinkedListNode
}

export const EDGE_TYPES = {
  default: DefaultEdge,
}

export const SIZES_NODES:IsizeNodes = {
  arrayListElement: { width: 110, height: 110 },
  linkedListNode: { width: 250, height: 110 },
  doubleLinkedListNode: { width: 310, height: 120 },
}