import { type JSX } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="mt-14">{children}</div>
    </div>
  );
};

export default Layout;
