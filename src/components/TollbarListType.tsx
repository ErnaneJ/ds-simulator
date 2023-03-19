import * as ToggleGroup  from "@radix-ui/react-toggle-group";

interface TollbarListTypeProps {
  objectType: string;
  changeListType: (type:string) => void;
}

export function TollbarListType({ objectType, changeListType }:TollbarListTypeProps) {
  return (
    <ToggleGroup.Root
      className="fixed top-2 left-2 gap-1 flex dounded-md shadow"
      type="single"
      defaultValue={objectType}
      aria-label="Tipo de lista"
      onValueChange={changeListType}
    >
      <ToggleGroup.Item 
        className="bg-white border-[2px] gap-1 border-transparent cursor-pointer text-purple-800 font-semibold flex font-md items-center justify-center px-4 py-1 rounded transition ToggleGroupItem" 
        value="arrayListElement" 
        aria-label="Array List"
      >
        <i className="fa-solid fa-layer-group"></i>
        Array List
        { objectType === "arrayListElement" && <i className="fa-regular fa-circle-check"></i> }
      </ToggleGroup.Item>
      <ToggleGroup.Item 
          className="bg-white border-[2px] gap-1 border-transparent cursor-pointer text-purple-800 font-semibold flex font-md items-center justify-center px-4 py-1 rounded transition ToggleGroupItem" 
          value="linkedListNode"
          aria-label="Linked List"
        >
          <i className="fa-sharp fa-solid fa-arrow-up"></i>
          Linked List
          { objectType === "linkedListNode" && <i className="fa-regular fa-circle-check"></i> }
      </ToggleGroup.Item>
      <ToggleGroup.Item 
        className="bg-white border-[2px] gap-1 border-transparent cursor-pointer text-purple-800 font-semibold flex font-md items-center justify-center px-4 py-1 rounded transition ToggleGroupItem" 
        value="doubleLinkedListNode" 
        aria-label="Double Linked List"
      >
        <i className="fa-solid fa-arrows-up-down"></i>
        Double Linked List
        { objectType === "doubleLinkedListNode" && <i className="fa-regular fa-circle-check"></i> }
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}