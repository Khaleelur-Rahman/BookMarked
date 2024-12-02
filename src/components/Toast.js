import { toast } from "react-toastify";

export const showToast = (message, type = "success") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const Toast = () => {
  return null; // This component doesn't render anything, it's just for organizing the toast function
};

export default Toast;
