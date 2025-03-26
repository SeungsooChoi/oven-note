import { Form, redirect, useNavigate, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/utils/supabase.server";

// 로그인 액션
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  console.log(data, error)

  if (error) {
    throw new Response("로그인 실패.", { status: 404 });
  }

  return redirect("/recipes"); // 로그인 성공 시 이동
}

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
        <Form method="post">
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
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            로그인
          </button>
        </Form>
      </div>
    </div>
  );
}
