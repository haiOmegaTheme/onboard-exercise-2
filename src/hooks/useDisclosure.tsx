import { useState } from "react";

export function useDisclosure(initial: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initial);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((state) => !state);

  return { isOpen, open, close, toggle };
}
