import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";
import useAlertStore from "@/store/alert";
import UserIcon from "@/icons/userIcon";
import useUserStore from "@/store/user";
import Image from "next/image";
import { converImageToBlob } from "@/utils/helper";
import { API } from "@/utils/api";

const ProfileModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, setUser } = useUserStore();
  const { showAlert } = useAlertStore();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [avatar, setAvatar] = useState(user?.avatar);

  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    setLoading(true);

    const res = await API.post("/user/update?user=true", {
      firstName,
      lastName,
      avatar,
    });

    if (res.data) {
      setUser(res.data);

      setOpenModal(false);
      showAlert("Your profile has been updated succesfully");
    } else {
      console.log(res.error);
    }

    setLoading(false);
  };

  return (
    <Modal
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      height="80vh"
    >
      <h2 className="font-semibold text-gray1 text-xl">Profile</h2>

      <div className="mt-6 space-y-5">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12">
            {avatar ? (
              <Image
                src={avatar}
                alt="user image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <UserIcon />
            )}
          </div>

          <div className="relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => converImageToBlob(e, setAvatar)}
            />
            <span className="flex gap-1 items-center text-primary text-sm font-medium">
              <CameraIcon /> Upload new photo
            </span>
          </div>
        </div>

        <input
          type="text"
          className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm disabled:bg-gray-300"
          placeholder="Last Name"
          value={user?.email}
          disabled
        />

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleCreate}
            disabled={!firstName || !lastName || loading}
            className="w-[90%] mx-auto py-5 font-semibold text-white rounded-lg bg-primary transition-colors duration-300 disabled:bg-gray3"
          >
            {loading ? <span className="loader-small" /> : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const CameraIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6551 3.61977H10.9687L10.1394 2.37625C10.095 2.30966 10.0349 2.25506 9.96429 2.21728C9.89372 2.17951 9.81492 2.15972 9.73487 2.15967H5.84126C5.76121 2.15972 5.68241 2.17951 5.61184 2.21728C5.54127 2.25506 5.48111 2.30966 5.43669 2.37625L4.60686 3.61977H2.92104C2.5338 3.61977 2.16242 3.77361 1.88859 4.04743C1.61477 4.32125 1.46094 4.69264 1.46094 5.07988V11.8937C1.46094 12.281 1.61477 12.6523 1.88859 12.9262C2.16242 13.2 2.5338 13.3538 2.92104 13.3538H12.6551C13.0423 13.3538 13.4137 13.2 13.6875 12.9262C13.9614 12.6523 14.1152 12.281 14.1152 11.8937V5.07988C14.1152 4.69264 13.9614 4.32125 13.6875 4.04743C13.4137 3.77361 13.0423 3.61977 12.6551 3.61977ZM13.1418 11.8937C13.1418 12.0228 13.0905 12.1466 12.9992 12.2379C12.908 12.3291 12.7842 12.3804 12.6551 12.3804H2.92104C2.79196 12.3804 2.66817 12.3291 2.57689 12.2379C2.48562 12.1466 2.43434 12.0228 2.43434 11.8937V5.07988C2.43434 4.9508 2.48562 4.827 2.57689 4.73573C2.66817 4.64446 2.79196 4.59318 2.92104 4.59318H4.86785C4.948 4.59323 5.02692 4.57349 5.09761 4.53571C5.16829 4.49792 5.22855 4.44327 5.27303 4.3766L6.10164 3.13307H9.47388L10.3031 4.3766C10.3476 4.44327 10.4078 4.49792 10.4785 4.53571C10.5492 4.57349 10.6281 4.59323 10.7083 4.59318H12.6551C12.7842 4.59318 12.908 4.64446 12.9992 4.73573C13.0905 4.827 13.1418 4.9508 13.1418 5.07988V11.8937ZM7.78806 5.56658C7.25863 5.56658 6.74109 5.72358 6.30088 6.01772C5.86067 6.31185 5.51757 6.72992 5.31497 7.21905C5.11236 7.70819 5.05935 8.24641 5.16264 8.76567C5.26593 9.28493 5.52087 9.76191 5.89524 10.1363C6.2696 10.5106 6.74657 10.7656 7.26583 10.8689C7.7851 10.9722 8.32332 10.9191 8.81246 10.7165C9.30159 10.5139 9.71966 10.1708 10.0138 9.73063C10.3079 9.29042 10.4649 8.77288 10.4649 8.24344C10.4641 7.53374 10.1818 6.85334 9.68 6.35151C9.17817 5.84967 8.49777 5.56739 7.78806 5.56658ZM7.78806 9.9469C7.45115 9.9469 7.12181 9.847 6.84167 9.65982C6.56154 9.47264 6.34321 9.2066 6.21428 8.89533C6.08534 8.58406 6.05161 8.24155 6.11734 7.91112C6.18307 7.58068 6.34531 7.27715 6.58354 7.03892C6.82177 6.80069 7.1253 6.63845 7.45574 6.57272C7.78618 6.50699 8.12868 6.54072 8.43995 6.66966C8.75122 6.79859 9.01726 7.01692 9.20444 7.29705C9.39162 7.57719 9.49152 7.90653 9.49152 8.24344C9.49152 8.69523 9.31205 9.12851 8.99259 9.44797C8.67313 9.76743 8.23985 9.9469 7.78806 9.9469Z"
      fill="#0257EF"
    />
  </svg>
);

export default ProfileModal;
