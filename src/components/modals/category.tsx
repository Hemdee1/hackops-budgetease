import { Dispatch, SetStateAction } from "react";
import Modal from "../modal";
import CategoryBox from "../categoryBox";
import useUserStore from "@/store/user";

const CategoryModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();

  return (
    <Modal
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      height="80vh"
    >
      <h2 className="font-semibold text-gray1 text-xl">Category</h2>

      <div className="mt-7 space-y-5 h-[60vh] overflow-y-scroll pr-3 py-2">
        {user?.budget?.category.map((data, index) => (
          <CategoryBox key={index} data={data} />
        ))}
      </div>
    </Modal>
  );
};

export default CategoryModal;
