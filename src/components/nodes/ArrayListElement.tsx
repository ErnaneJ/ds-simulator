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
          {data.value}
        </span>
        <span className="text-white/80 font-bold text-sm absolute bottom-1 left-3">
          {data.label}
        </span>

        <Handle 
          className="-right-5 w-3 h-3 bg-purple-900/80"
          id="right" position={Position.Right} type="source" 
          style={{opacity: data.last ? 0 : 1}}
        />

        <Handle 
          className="-left-5 w-3 h-3 bg-purple-900/80"
          id="left" position={Position.Left} type="source" 
          style={{opacity: data.index === 0 ? 0 : 1}}
        />
      </div>
    </div>
  )
}