import { useNavigate } from "react-router-dom";
import NotFound from "../../pages/NotFound";

const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    try {
      navigate(route);
    } catch (error) {
      console.error("Error navigating to route:", route, error);
      return <NotFound />
    }
  };

  return handleNavigation;
};

export default useNavigation;
