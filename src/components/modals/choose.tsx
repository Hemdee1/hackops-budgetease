import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";
import useOnboardStore from "@/store/onboard";
import { option1 } from "@/utils/data";

const ChooseBudgetModal = ({
  openModal,
  setOpenModal,
  setOpenNextModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenNextModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { selectedBudget, setSelectedBudget, selectedOption } =
    useOnboardStore();

  return (
    <Modal
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      width="700px"
      height="80vh"
      scroll
    >
      <h2 className="font-semibold text-gray1 text-xl">
        Choose budget category
      </h2>
      <p className="mt-1 font-semibold text-gray2 text-sm">
        You can select as much as you’d like but you must select at least 5
        categories
      </p>

      <div className="mt-7 flex gap-6 flex-wrap">
        {selectedOption.map((budget, index) => (
          <button
            onClick={() => setSelectedBudget(budget)}
            key={index}
            className={`py-4 px-5 text-sm flex items-center gap-2 font-semibold border rounded-full transition-colors duration-300  ${
              selectedBudget.find((b) => b.title === budget.title)
                ? "bg-[#EFF5FF] border-primary text-primary"
                : "bg-transparent border-gray3 text-gray2"
            }`}
          >
            <span>{budget.icon}</span> {budget.title}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            setOpenNextModal(true);
            setOpenModal(false);
          }}
          disabled={selectedBudget.length < 5}
          className="mt-8 w-[90%] mx-auto py-5 font-semibold text-white rounded-lg bg-primary transition-colors duration-300 disabled:bg-gray3"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default ChooseBudgetModal;
