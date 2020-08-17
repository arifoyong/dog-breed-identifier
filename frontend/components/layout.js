import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen container mx-auto">{children}</div>
  );
};

export default Layout;
