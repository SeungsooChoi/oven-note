import { Form, useLoaderData, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/utils/supabase.server";

// 🛠️ 기존 데이터 로드
export async function loader({ params }: LoaderFunctionArgs) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    throw new Response("레시피를 찾을 수 없습니다.", { status: 404 });
  }

  return data;
}

// 🔄 수정 요청 처리
export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updatedRecipe = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    cook_time: Number(formData.get("cook_time")),
    difficulty: formData.get("difficulty") as string,
  };

  const { error } = await supabase
    .from("recipes")
    .update(updatedRecipe)
    .eq("id", params.id);

  if (error) {
    throw new Response("수정에 실패했습니다.", { status: 500 });
  }

  return redirect(`/recipes/${params.id}`);
}

// 🖥️ 수정 페이지 컴포넌트
export default function EditRecipe() {
  const recipe = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">레시피 수정</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block font-medium">제목</label>
          <input name="title" defaultValue={recipe.title} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">설명</label>
          <textarea name="description" defaultValue={recipe.description} className="w-full p-2 border rounded"></textarea>
        </div>
        <div>
          <label className="block font-medium">조리 시간 (분)</label>
          <input type="number" name="cook_time" defaultValue={recipe.cook_time} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">난이도</label>
          <select name="difficulty" defaultValue={recipe.difficulty} className="w-full p-2 border rounded">
            <option value="easy">쉬움</option>
            <option value="medium">보통</option>
            <option value="hard">어려움</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          저장하기
        </button>
      </Form>
    </div>
  );
}
