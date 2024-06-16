import { useState, useEffect } from "react";

type ModalType = {
  closeModal?: () => void;
  openModal: boolean;
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
  height?: string;
  width?: string;
};

const defaultHeight = "65vh";
const defaultWidth = "600px";
const defaultScroll = false;

const Modal = ({
  closeModal,
  openModal,
  children,
  className,
  scroll = defaultScroll,
  height = defaultHeight,
  width = defaultWidth,
}: ModalType) => {
  const [isVisible, setIsVisible] = useState(openModal);

  useEffect(() => {
    if (openModal) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 320); // Assuming the duration of the animation is 300ms, adjust if needed
      return () => clearTimeout(timeout);
    }
  }, [openModal]);

  if (!isVisible) return null;

  return (
    <div
      className={`font-Inter fixed inset-0 z-[100] px-4 sm:px-10 bg-[#0922564D] backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
        openModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={"relative py-2 bg-white max-w-full rounded-2xl " + className}
        style={{ width }}
      >
        {closeModal && (
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-6 top-6 z-[1]"
          >
            <CloseIcon />
          </button>
        )}

        <div
          className={`px-5 py-5 relative ${scroll ? "overflow-y-scroll" : ""}`}
          style={{ maxHeight: height }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#F3F3F3" />
    <path
      d="M12.6666 12.667L19.3333 19.3337M12.6666 19.3337L19.3333 12.667"
      stroke="#092256"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Modal;
