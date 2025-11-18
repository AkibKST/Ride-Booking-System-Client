import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div>
        <Navbar />
        <div className="">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
