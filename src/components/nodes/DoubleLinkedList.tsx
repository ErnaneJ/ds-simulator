import { NodeProps, Handle, Position } from "reactflow"

export function DoubleLinkedListNode({ data }: NodeProps) {
  return (
    <div className="relative w-full h-full">
      <div className="rounded bg-purple-800 shadow-xl w-full h-full min-w-[300px] min-h-[100px] flex items-center justify-center overflow-hidden">
        
        <div className="relative text-white font-bold text-2xl flex-1 w-full min-h-[100px] flex items-center justify-center">
          <span className="text-white font-bold text-2xl" style={{opacity: data.prev ? 1 : .5}}>
            {data.prev || "null"}
          </span>
        </div>
        <div className="relative text-white font-bold text-2xl flex-1 w-full min-h-[100px] flex items-center justify-center border-r-[2px]  border-l-[2px]  border-white/50">
          <span className="text-white font-bold text-2xl">
            {data.value}
          </span>
        </div>
        <div className="relative text-white font-bold text-2xl flex-1 w-full min-h-[100px] flex items-center justify-center">
          <span className="text-white font-bold text-2xl" style={{opacity: data.next ? 1 : .5}}>
            {data.next || "null"}
          </span>
        </div>
        <span className="bg-purple-800 text-white/80 font-bold text-sm absolute left-1/2 bottom-0 -translate-x-1/2 px-2 rounded-t border-l-[2px] border-t-[2px] border-r-[2px] border-white/50">
          {data.label}
        </span>

        {
          (!data.prev || !data.next) && (
            <span className="bg-purple-800 text-white/80 font-bold text-sm absolute left-1/2 top-0 -translate-x-1/2 px-2 rounded-b border-l-[2px] border-b-[2px] border-r-[2px] border-white/50">
              {!data.prev && "HEAD"}
              {!data.next && "TAIL"}
            </span>
          ) 
        }

        <Handle 
          className="-left-5 w-3 h-3 bg-blue-400/80"
          id="left" position={Position.Left} type="source" 
          style={{opacity: data.index === 0 ? 0 : 1}}
        />

        <Handle 
          className="-right-5 w-3 h-3 bg-blue-400/80"
          id="right" position={Position.Right} type="source" 
          style={{opacity: data.next ? 1 : 0}}
        />
      </div>
    </div>
  )
}