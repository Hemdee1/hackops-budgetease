import { create } from "zustand";
import { combine } from "zustand/middleware";

const useAlertStore = create(
  combine(
    {
      alert: false,
      alertMessage: "",
    },

    (set) => ({
      showAlert: (value: string) =>
        set(() => ({ alertMessage: value, alert: true })),
      offAlert: () => set(() => ({ alert: false })),
    })
  )
);

export default useAlertStore;
