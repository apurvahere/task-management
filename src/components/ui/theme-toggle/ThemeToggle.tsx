import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../../hooks/useTheme";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer dark:border dark:border-white
      ${isDark ? "bg-gray-900" : "bg-blue-400"}`}
    >
      <div
        className={`w-5 h-5 flex items-center justify-center bg-white rounded-full shadow-md transform transition-transform duration-300
        ${isDark ? "translate-x-7" : "translate-x-0"}`}
      >
        {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
