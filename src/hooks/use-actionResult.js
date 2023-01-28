import { useState } from "react";

const useActionResult = () => {
  const [isActive, setIsActive] = useState({ active: false, visible: false });

  const activate = () => {
    setIsActive({ active: true, visible: true });
    setTimeout(() => {
      setIsActive({ active: true, visible: false });
    }, 3500);
    setTimeout(() => {
      setIsActive({ active: false, visible: false });
    }, 4000);
  };

  return { isActive, activate };
};

export default useActionResult;
