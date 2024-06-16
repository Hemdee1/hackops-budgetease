import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";

const LoadingModal = ({
  openModal,
  setOpenModal,
  setOpenNextModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenNextModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!openModal) return;

    const totalDuration = 3000; // Total duration in milliseconds
    const pauseDuration = totalDuration / 4; // Pause every 25%

    let currentTime = 0;

    const timeout = setTimeout(function updatePercent() {
      currentTime += 30; // Increment time by 30 milliseconds

      if (currentTime < totalDuration) {
        let calculatedPercent = Math.floor((currentTime / totalDuration) * 100);

        // Pause at 25%, 50%, and 75%
        if (
          calculatedPercent === 22 ||
          calculatedPercent === 55 ||
          calculatedPercent === 70
        ) {
          setTimeout(updatePercent, pauseDuration);
        } else {
          setPercent(calculatedPercent);
          setTimeout(updatePercent, 30);
        }
      } else {
        // Ensure percent is 100 when time is up
        setPercent(100);
      }
    }, 30);

    return () => clearTimeout(timeout);
  }, [openModal]);

  useEffect(() => {
    if (percent === 100) {
      setOpenNextModal(true);
      setOpenModal(false);
    }
  }, [percent, setOpenModal, setOpenNextModal]);

  return (
    <Modal openModal={openModal}>
      <h2 className="font-semibold text-gray1">Please wait...⌛</h2>
      <p className="mt-4 text-gray2 text-sm">AI Generating categories</p>
      <div className="flex justify-end">
        <span className="text-sm text-gray2 font-semibold">{percent}%</span>
      </div>

      <div className="h-1 w-full bg-gray3 rounded-full mt-3">
        <span
          className="h-full bg-primary block rounded-full"
          style={{ width: `${percent}%` }}
        ></span>
      </div>
    </Modal>
  );
};

export default LoadingModal;
