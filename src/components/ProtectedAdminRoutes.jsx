import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

function ProtectedAdminRoutes() {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/not-authorized" replace />;
  }

  return (
    <section className="grid grid-cols-[16rem_1fr] w-full h-full flex-1">
      <div className="flex flex-col bg-gray-200 dark:bg-slate-900 pt-4">
        <div className="p-4 text-primary hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
          <p
            className="pl-6 text-left"
            onClick={() => navigate("/admin/products")}
          >
            PRODUCTS
          </p>
        </div>
        <div className="p-4 text-primary hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
          <p
            className="pl-6 text-left"
            onClick={() => navigate("/admin/users")}
          >
            USERS
          </p>
        </div>
        <div className="p-4 text-primary hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
          <p className="pl-6 text-left">SOMETHING</p>
        </div>
        <div className="p-4 text-primary hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
          <p className="pl-6 text-left">SOMETHING</p>
        </div>
        <div className="p-4 text-primary hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
          <p className="pl-6 text-left">SOMETHING</p>
        </div>
        <div className="p-4 text-primary hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
          <p className="pl-6 text-left">SOMETHING</p>
        </div>
      </div>

      <div className="flex flex-col itams-center">
        <Outlet />
      </div>
    </section>
  );
}

export default ProtectedAdminRoutes;
