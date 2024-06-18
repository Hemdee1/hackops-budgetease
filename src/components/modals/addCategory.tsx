import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "../modal";
import useOnboardStore from "@/store/onboard";
import EmojiPicker from "emoji-picker-react";
import { CategoryType } from "@/store/user";

const AddNewCategoryModal = ({
  openModal,
  setOpenModal,
  setNewCatgories,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setNewCatgories?: Dispatch<SetStateAction<CategoryType[]>>;
}) => {
  const { setSelectedBudget } = useOnboardStore();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [percent, setPercent] = useState("");
  const [icon, setIcon] = useState("😎");
  const [openEmoji, setOpenEmoji] = useState(false);

  const handleAdd = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const budget = {
      title,
      desc,
      icon,
      percent: 0,
      price: 0,
    };

    if (setNewCatgories) {
      setNewCatgories((prev) => [...prev, budget as CategoryType]);
    } else {
      setSelectedBudget(budget);
    }

    setOpenModal(false);
    setIcon("😎");
    setTitle("");
    setDesc("");
    // setPercent("");
  };

  return (
    <Modal
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      width="400px"
    >
      <h2 className="font-semibold text-gray1 text-xl">Add New Category</h2>

      <form className="w-full space-y-4 mt-6" onSubmit={handleAdd}>
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => setOpenEmoji((prev) => !prev)}
          >
            <div className="w-11 h-11 min-w-[44px] rounded-full bg-[#F7F9FA] grid place-content-center text-xl">
              {icon}
            </div>
            <span className="text-gray-400 text-xs">Click to change emoji</span>
          </button>
          <div className="absolute left-0 -top-4 z-10">
            <EmojiPicker
              // width={350}
              // height={250}
              open={openEmoji}
              onEmojiClick={(e) => {
                setIcon(e.emoji);
                setOpenEmoji(false);
              }}
            />
          </div>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            className="bg-[#F5F5F5] px-4 py-3 rounded-lg w-full text-sm"
            placeholder="title"
            value={title}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length > 20) {
                setTitle(newValue.slice(0, 20));
              } else {
                setTitle(newValue);
              }
            }}
            required
          />
          <span className="absolute right-8 top-1/2 text-xs -translate-y-1/2">
            {title.length}/20
          </span>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            className="bg-[#F5F5F5] px-4 py-3 rounded-lg w-full text-sm"
            placeholder="description"
            value={desc}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length > 40) {
                setDesc(newValue.slice(0, 40));
              } else {
                setDesc(newValue);
              }
            }}
            required
          />
          <span className="absolute right-8 top-1/2 text-xs -translate-y-1/2">
            {desc.length}/40
          </span>
        </div>
        {/* <div className="relative w-full">
          <input
            type="number"
            className="bg-[#F5F5F5] px-4 py-3 rounded-lg w-full text-sm"
            placeholder="percent"
            value={percent}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length > 2) {
                setPercent(newValue.slice(0, 2));
              } else {
                setPercent(newValue);
              }
            }}
            required
          />
          <span className="absolute right-8 top-1/2 text-xs -translate-y-1/2">
            {percent.length}/2
          </span>
        </div> */}

        <div className="flex justify-center">
          <button className="mt-5 w-full py-5 font-semibold text-white rounded-lg bg-primary transition-colors duration-300 disabled:bg-gray3">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewCategoryModal;
