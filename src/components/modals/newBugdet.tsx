import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";
import Image from "next/image";
import { API } from "@/utils/api";
import useUserStore from "@/store/user";
import { useRouter } from "next/router";

const NewBudgetModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);

    const res = await API.post("/budget/delete-budget?user=true", {});

    if (res.data) {
      console.log(res.data);

      setUser(res.data);

      router.push("/generate");
    } else {
      console.log(res.error);
    }

    setLoading(false);
  };

  return (
    <Modal
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      width="500px"
      height="90vh"
    >
      <div className="px-5 space-y-6 text-sm text-gray1 font-medium">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/warning.svg"
            alt="warning icon"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto min-h-[64px]"
          />
          <h2 className="mt-3 font-semibold text-gray1 text-xl">New Budget</h2>
        </div>
        <p>
          Creating a new budget will replace your existing budget and all
          associated data.
        </p>
        <div>
          <h5 className="font-bold">What You Need to Know:</h5>
          <ul className="list-disc space-y-3 mt-3 ml-6">
            <li>
              All current budget data will be lost. This includes your income,
              expenses.
            </li>
            <li>Categories and expense allocation will disappear as well.</li>
          </ul>
        </div>
        <p>Are you sure you want to continue?</p>
        <div className="flex gap-6">
          <button
            className="w-full border-2 border-primary rounded-lg text-primary font-semibold py-4"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="w-full bg-primary rounded-lg flex items-center justify-center gap-3 text-white font-semibold py-4 transition-colors duration-300 disabled:bg-gray3"
            onClick={handleCreate}
          >
            Create budget
            {loading && <span className="loader-small"></span>}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewBudgetModal;
