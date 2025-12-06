import { Outlet } from "react-router";
import ClickSpark from "../ClickSpark";

export default function AdminLayout() {
  return (
    <div>
      {/* for click spark effect */}
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <h1>This is Admin Layout</h1>

        <Outlet />
      </ClickSpark>
    </div>
  );
}
