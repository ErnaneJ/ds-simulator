import * as Switch from "@radix-ui/react-switch";

interface SwitchAutoLayoutProps {
  autoLayoutToggle: boolean;
  setAutoLayoutToggle: (value:boolean) => void;
}

export function SwitchAutoLayout({ autoLayoutToggle, setAutoLayoutToggle }:SwitchAutoLayoutProps){
  return (
    <div className="flex items-center fixed top-2 right-2 bg-white px-2 py-[.35rem] rounded">
      <label className="pr-2 font-semibold text-purple-800" htmlFor="autolayout">
        Organização automática
      </label>
      <Switch.Root 
        defaultChecked={autoLayoutToggle}
        onCheckedChange={(value) => setAutoLayoutToggle(value)}
        className="w-[42px] h-[25px] bg-zinc-400 rounded-full relative shadow-xl SwitchRoot" id="autolayout">
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
    </div>
  );
}