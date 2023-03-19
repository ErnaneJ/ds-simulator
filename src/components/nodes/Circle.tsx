import { NodeResizer } from "@reactflow/node-resizer"
import { NodeProps, Handle, Position } from "reactflow"

import '@reactflow/node-resizer/dist/style.css';
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

export function Circle({ selected }: NodeProps) {
  const [color, setColor] = useState("#8b5cf6");
  const [opacity, setOpacity] = useState('1');
  const [bgColor, setBgColor] = useState("#8b5cf6");
  const [borderColor, setBorderColor] = useState("#8b5cf6");

  const upateBackground = () => {
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)

    setBgColor(`rgba(${r}, ${g}, ${b}, ${opacity})`)
    setBorderColor(`rgba(${r}, ${g}, ${b}, 1)`)
  }
  
  
  return (
    <div className="relative w-full h-full">
      <div className="rounded-full shadow-xl w-full h-full min-w-[100px] min-h-[100px]" style={{backgroundColor: bgColor, border: "2px solid "+borderColor}}>
        <NodeResizer 
          minWidth={100}
          minHeight={100}
          isVisible={selected}
          lineClassName="border-blue-400 p-[.15rem]"
          handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
        />
        <Handle 
          className="-right-5 w-3 h-3 bg-blue-400/80"
          id="right" position={Position.Right} type="source" />
        <Handle 
          className="-left-5 w-3 h-3 bg-blue-400/80"
          id="left" position={Position.Left} type="source" />
        <Handle 
          className="-top-5 w-3 h-3 bg-blue-400/80"
          id="top" position={Position.Top} type="source" />
        <Handle 
          className="-bottom-5 w-3 h-3 bg-blue-400/80"
          id="bottom" position={Position.Bottom} type="source" />
      </div>

      {
        selected && (
          <div className="fixed -top-10 -right-10 flex items-center justify-center">
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="bg-zinc-50 border-2 border-zinc-200 shadow-lg p-[.15rem] rounded-full" aria-label="Update properties"> ⚙️ </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="bg-white p-2 shadow w-[200px] rounded-md" sideOffset={5}>
                  <div className="flex flex-col gap-2">
                    <fieldset className="flex items-center justify-between gap-5">
                      <label className="text-blue-400/80 font-semibold" htmlFor="color">
                        Cor
                      </label>
                      <input type="color" onChange={e => {setColor(e.target.value); upateBackground()}} defaultValue={color} className="border-0 outline-0 rounded-md w-1/3" id="color" />
                    </fieldset>
                    <fieldset className="flex items-center justify-between gap-5">
                      <label className="text-blue-400/80 font-semibold" htmlFor="bg-opacity">
                        Transparência
                      </label>
                      <input type="range" min="0" max="1" step="0.01" onChange={e => {setOpacity(e.target.value); upateBackground()}} defaultValue={opacity} className="border-0 outline-0 rounded-md w-1/3" id="bg-opacity" />
                    </fieldset>
                  </div>
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        )}
    </div>
  )
}