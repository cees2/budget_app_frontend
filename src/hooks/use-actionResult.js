import { useState } from "react";

const useActionResult = () => {
  const [isActive, setIsActive] = useState(false);

  const activate = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 4000);
  };

  return { isActive, activate };
};

export default useActionResult;
