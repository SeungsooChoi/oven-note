import { Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
  const navigate = useNavigate();

  return (
    <div>
      <Outlet />
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={() => navigate(-1)}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
