import { Form, redirect, useNavigate, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/utils/supabase.server";

// 회원가입 액션
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("회원가입 에러:", error.message);
    throw new Response("회원가입 실패.", { status: 404 });
  }

  return redirect("/login"); // 회원가입 후 로그인 페이지로 이동
}

export default function Signup() {
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
        <h2 className="text-lg font-bold mb-4">회원가입</h2>
        <Form method="post">
          <input
            name="name"
            type="text"
            placeholder="이름"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            name="email"
            type="email"
            placeholder="이메일"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            className="w-full p-2 border rounded mb-4"
          />
          <button className="w-full bg-green-500 text-white p-2 rounded">
            회원가입
          </button>
        </Form>
      </div>
    </div>
  );
}
