import * as Toolbar from "@radix-ui/react-toolbar";
import { useEffect } from "react";

interface ToolbarFooterProps {
  addNode: () => void;
  removeNode: () => void;
  indexToChange: number;
  maxIndex: number;
  setIndexToChange: (index: number) => void;
}

export function ToolbarFooter({ addNode, removeNode, indexToChange, setIndexToChange, maxIndex }:ToolbarFooterProps){
  
  const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value)
    
    if(isNaN(value)) value = -1;

    setIndexToChange(parseInt(e.target.value))
  }

  useEffect(() => {
    if(isNaN(indexToChange)) setIndexToChange(-1)
  }, [indexToChange]);
  
  return (
    <>
    
      <Toolbar.Root 
        className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden flex items-start justify-center gap-3'
      >
        <Toolbar.Button 
          onClick={addNode}
          className='w-24 h-24 font-xl bg-purple-900 shadow-xl mt-6 rounded transition-transform hover:-translate-y-2 text-white flex items-center pb-8 font-bold justify-center'>
          <i className="fa-solid fa-plus"></i>
        </Toolbar.Button>

        <Toolbar.Button
          onClick={removeNode} 
          className='w-24 h-24 font-xl bg-purple-900 shadow-xl mt-6 rounded transition-transform hover:-translate-y-2 text-white flex items-center pb-8 font-bold justify-center'>
          <i className="fa-solid fa-trash"></i>
        </Toolbar.Button>

        <div className="flex flex-col items-start justify-center mt-2 text-purple-900 font-semibold">
          <span>Index</span>
          <input 
            type="number"
            value={indexToChange} 
            min={-1}
            max={maxIndex}
            className="border border-gray-300 rounded-md w-24 h-10 pl-4 pr-2 outline-2 outline-purple-800 text-purple-800 font-semibold"
            onChange={handleChangeInput}
          />
        </div>
      </Toolbar.Root>
      <span className="text-white/50 fixed italic bottom-12 left-1/2 -translate-x-1/2">
        Utilize (-1) para adicionar/remover no fim
      </span>
    </>
  );
}