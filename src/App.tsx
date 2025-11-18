import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <>
      <CommonLayout>
        <div className="mx-auto">
          <Outlet />
        </div>
      </CommonLayout>
    </>
  );
}

export default App;
