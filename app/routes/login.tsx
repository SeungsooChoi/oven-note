import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-opacity-50"
      onClick={() => navigate(-1)}
    >
      <div
        className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">로그인</h2>
        <form>
          <input
            type="email"
            placeholder="이메일"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-2 border rounded mb-4"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
