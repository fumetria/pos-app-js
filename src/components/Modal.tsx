import { useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Show Modal</button>

      {showModal &&
        createPortal(
          <div className="flex items-center justify-center bg-white shadow absolute w-64 rounded">
            <div id="modal-header" className="bg-stone-600">
              {label}
            </div>
            <div id="modal-content">{children}</div>
          </div>,
          document.body
        )}
    </>
  );
}
