import { useNavigate } from "react-router-dom";

//Function to go back to the previous page
const useGoBackHistory = () => {
  const history = useNavigate();
  return history(-1);
};

export default useGoBackHistory;
