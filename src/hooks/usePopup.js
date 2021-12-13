import { useState } from 'react';

export default function usePopup() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return [open, setOpen, close];
}
