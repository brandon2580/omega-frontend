import React, { useEffect } from "react";
import useDarkMode from "use-dark-mode";
import DarkModeToggle from "react-dark-mode-toggle";

const DarkModeToggler = (props) => {
  const darkMode = useDarkMode(true);
  
  // We use this variable to conditionally set the styles to many components
  useEffect(() => {
    props.setDarkMode(darkMode.value)
  }, [darkMode.value])

  return (
    <div className="dark-mode-toggle">
      <DarkModeToggle
        onChange={darkMode.toggle}
        speed={1}
        checked={darkMode.value}
        size={70}
      />
    </div>
  );
};

export default DarkModeToggler;
