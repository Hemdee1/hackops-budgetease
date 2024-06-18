import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../modal";
import useAlertStore from "@/store/alert";
import { API } from "@/utils/api";

const ChangePasswordModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { showAlert } = useAlertStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setLoading(true);

    const res = await API.post("/user/update-password", {
      password,
    });

    if (res.data) {
      setOpenModal(false);
      showAlert("Your password has been changed succesfully");
    } else {
      setError(res.error);
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
      <h2 className="font-semibold text-gray1 text-xl">Change Password</h2>

      <div className="mt-6 space-y-5">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-[#7E7E7E] text-sm font-medium absolute right-4 top-1/2 -mt-2.5"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="text-[#7E7E7E] text-sm font-medium absolute right-4 top-1/2 -mt-2.5"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mt-4">
          <p className="text-red text-center mb-4">{error}</p>
          <button
            onClick={handleUpdate}
            disabled={
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              loading
            }
            className="w-full py-5 font-semibold text-white rounded-lg bg-primary transition-colors duration-300 disabled:bg-gray3"
          >
            {loading ? <span className="loader-small" /> : "Update"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
