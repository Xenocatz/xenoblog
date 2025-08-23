import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

export const Modal = ({ children, onClose, open }: ModalProps) => {
  if (!open) return null;
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/30"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative h-full w-full rounded-lg bg-charcoal-100 p-5 shadow-2xl lg:h-fit lg:w-2/6"
        >
          <button
            onClick={onClose}
            title="Close"
            className="absolute top-2 right-2 cursor-pointer text-jet-100/70"
          >
            <X size={30} strokeWidth={1.5} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
