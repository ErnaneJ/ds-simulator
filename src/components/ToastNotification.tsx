import * as Toast from '@radix-ui/react-toast';
import { useEffect, useRef } from 'react';

interface ToastNotificationProps {
  open : boolean, 
  setOpen : (open:boolean) => void,
  title : string,
  description : string,
}

export function ToastNotification({open, setOpen, title, description}:ToastNotificationProps) {
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot border-2 border-purple-900" open={open} onOpenChange={setOpen}>
        <Toast.Title className="text-purple-900 font-semibold text-md">
          <span>{title}</span>
        </Toast.Title>
        <Toast.Description asChild> 
          <span className="text-zinc-500/95 text-sm">
            {description}
          </span>
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="close">
          <button 
            className="px-2 py-1 text-purple-900 text-2xl"
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};