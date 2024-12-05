import { toast } from "react-toastify";

const DisplayToast = (type = "success", message) => {
  const common_toast_props = {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: "light",
  };

  switch (type) {
    case "success":
      toast.success(message, common_toast_props);
      break;
    case "error":
      toast.error(message, common_toast_props);
      break;
    default:
      toast.info(message, common_toast_props);
  }
};

export default DisplayToast;
