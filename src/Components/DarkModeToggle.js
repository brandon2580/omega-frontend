import React from "react";
import useDarkMode from "use-dark-mode";
import DarkModeToggle from "react-dark-mode-toggle";

const DarkModeToggler = () => {
  const darkMode = useDarkMode(true);

  return (
    <div className="dark-mode-toggle">
      <DarkModeToggle
        onChange={darkMode.toggle}
        speed={2}
        checked={darkMode.value}
        size={80}
      />
    </div>
  );
};

export default DarkModeToggler;
