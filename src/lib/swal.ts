import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Utility to check if dark mode is active
const isDarkMode = () => {
  if (typeof window !== "undefined") {
    return document.documentElement.classList.contains("dark");
  }
  return false;
};

const getSwalOptions = (options: SweetAlertOptions) => ({
  ...options,
  background: isDarkMode() ? "#111827" : "#ffffff", // gray-900 or white
  color: isDarkMode() ? "#f3f4f6" : "#1f2937", // gray-100 or gray-800
  confirmButtonColor: isDarkMode() ? "#059669" : "#10b981", // Emerald 600 or 500
  cancelButtonColor: isDarkMode() ? "#e11d48" : "#f43f5e", // Rose 600 or 500
});


export const toast = {
  fire: (options: SweetAlertOptions) => {
    return MySwal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: isDarkMode() ? "#111827" : "#ffffff",
      color: isDarkMode() ? "#f3f4f6" : "#1f2937",
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire(options);
  },
};

export const confirmAlert = ({
  title,
  text,
  icon = "warning",
  confirmButtonText = "হ্যাঁ",
  cancelButtonText = "না",
}: {
  title: string;
  text?: string;
  icon?: "warning" | "error" | "success" | "info" | "question";
  confirmButtonText?: string;
  cancelButtonText?: string;
}) => {
  return MySwal.fire(
    getSwalOptions({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      customClass: {
        popup:
          "rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl",
        confirmButton:
          "rounded-xl px-6 py-3 font-black uppercase tracking-wider text-xs",
        cancelButton:
          "rounded-xl px-6 py-3 font-black uppercase tracking-wider text-xs",
      },
    }),
  );
};

export const successAlert = (title: string, text?: string) => {
  return MySwal.fire(
    getSwalOptions({
      title,
      text,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup:
          "rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl",
      },
    }),
  );
};

export const errorAlert = (title: string, text?: string) => {
  return MySwal.fire(
    getSwalOptions({
      title,
      text,
      icon: "error",
      customClass: {
        popup:
          "rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl",
      },
    }),
  );
};

export default MySwal;
