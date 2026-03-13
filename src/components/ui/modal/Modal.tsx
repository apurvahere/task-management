import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Button from "../button/Button";

type ButtonProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
  showCancel?: boolean;
  className?: string;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "max-w-lg",
  showCancel = true,
  className = "",
}: ButtonProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className={clsx(
          "relative bg-white rounded-xl shadow-xl w-full mx-4 p-6",
          width,
          className,
        )}
      >
        {title && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h2>

            <Button
              variant="link"
              onClick={onClose}
              className="!px-2 !py-1 dark:text-white"
            >
              ✕
            </Button>
          </div>
        )}

        <div className="mb-6">{children}</div>

        <div className="flex justify-end gap-3">
          {showCancel && (
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          )}

          {footer}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
