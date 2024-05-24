import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirect = function () {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("paytm-token")) {
      navigate("/signin");
    } else {
      navigate("/dashboard");
    }
  });
};
