import { useRef, useState, type RefObject } from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { loadUser } from "../../utils/storage";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { Button, ThemeToggle } from "../ui";
import { FaTasks } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = loadUser();
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useOutsideClick(menuRef as RefObject<HTMLDivElement>, () => setOpen(false));

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 border-b border-gray-300 shadow-sm px-6 py-3 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="flex gap-2 items-center justify-center text-xl font-bold text-blue-600 dark:text-white">
            <FaTasks />
            TaskList
          </span>
        </div>

        <div className="flex justify-center items-center gap-2.5">
          <ThemeToggle />
          {user && (
            <div ref={menuRef} className="relative">
              <Button
                variant="link"
                onClick={() => setOpen(!open)}
                data-testid="user-button"
                className="text-3xl text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-white cursor-pointer !p-0"
              >
                <BiUserCircle />
              </Button>

              {open && (
                <div className="absolute right-0 mt-2 w-max bg-white dark:bg-gray-700 border dark:border-white rounded-lg shadow-lg p-4">
                  <p className="font-medium text-gray-800 dark:text-white break-all">
                    {user?.email}
                  </p>

                  <Button
                    variant="link"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 mt-4 hover:text-red-600 border border-red-500 dark:bg-white"
                  >
                    <BiLogOut />
                    <span className="text-sm">Logout</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
