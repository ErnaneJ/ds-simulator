import { NodeProps, Handle, Position } from "reactflow"

import '@reactflow/node-resizer/dist/style.css';

export function ArrayListElement({ selected, data }: NodeProps) {
  return (
    <div className="relative w-full h-full border-[1px] p-1 rounded-md" style={{borderColor: selected ? 'rgba(255, 255, 255, .3)' : 'transparent'}}>
      <div className="rounded bg-purple-900 shadow-xl w-full h-full min-w-[100px] min-h-[100px] flex items-center justify-center">
        <span className="text-white/80 font-bold text-sm absolute top-1 right-3">
          {data.index}
        </span>
        <span className="text-white font-bold text-2xl">
          {data.value ? data.value : <span className="text-white/50"> null </span>}
        </span>
        <span className="text-white/80 font-bold text-sm absolute bottom-1 left-3">
          {data.label}
        </span>
      </div>
    </div>
  )
}