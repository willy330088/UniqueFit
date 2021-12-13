import { useState, useEffect } from 'react';

export default function usePopup() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return [open, setOpen, close];
}
