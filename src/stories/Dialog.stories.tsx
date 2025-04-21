import React, { useState } from "react";
import Dialog from "../components/Dialog/Dialog";   

export default {
  title: "Components/Dialog",
  component: Dialog,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
  },
};

export const PrimaryDialog = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Primary Dialog</button>
      {isOpen && (
        <Dialog
          title="Primary Dialog"
          onClose={() => setIsOpen(false)}
          variant="primary"
        >
          <p>This is the content of the primary dialog. You can close it by clicking the × button.</p>
        </Dialog>
      )}
    </>
  );
};

export const SecondaryDialog = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Secondary Dialog</button>
      {isOpen && (
        <Dialog
          title="Secondary Dialog"
          onClose={() => setIsOpen(false)}
          variant="secondary"
        >
          <p>This is the content of the secondary dialog. Styled differently than the primary.</p>
        </Dialog>
      )}
    </>
  );
};