import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { supabase } from "~/utils/supabase.server";

// 🛠️ 상세 페이지의 데이터 로더 (React Router v7 방식)
export async function loader({ params }: LoaderFunctionArgs) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", params.id)
    .single(); // 단일 레시피 가져오기

  if (error || !data) {
    throw new Response("레시피를 찾을 수 없습니다.", { status: 404 });
  }

  return data; // React Router v7에서는 그냥 객체 반환!
}

// 🖥️ 상세 페이지 컴포넌트
export default function RecipeDetail() {
  const recipe = useLoaderData<typeof loader>();

  return (
    <div className="w-full md:max-w-4xl mx-auto px-3 py-6">
      {/* 카드 스타일 컨테이너 */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
        {/* 제목 */}
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">{recipe.title}</h1>
        <p className="mt-4 text-md text-gray-600 leading-relaxed">{recipe.description}</p>

        {/* 조리 정보 */}
        <div className="mt-6 flex flex-wrap gap-6 text-gray-700">
          <p className="text-md flex items-center gap-2">
            ⏱️ <span className="font-medium">조리 시간:</span> {recipe.cook_time}분
          </p>
          <p className="text-md flex items-center gap-2">
            🌟 <span className="font-medium">난이도:</span> {recipe.difficulty}
          </p>
        </div>

        {/* 재료 목록 */}
        <div className="mt-8">
          <h2 className="text-md font-bold text-gray-900">📋 재료</h2>
          <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
            {recipe.ingredients?.map((ingredient: string, index: number) => (
              <li key={index} className="text-md">{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* 조리 방법 */}
        <div className="mt-8">
          <h2 className="text-md font-bold text-gray-900">🛠️ 만드는 방법</h2>
          <ol className="list-decimal list-inside mt-3 text-gray-700 space-y-2">
            {recipe.steps?.map((step: string, index: number) => (
              <li key={index} className="text-lg">{step}</li>
            ))}
          </ol>
        </div>

        {/* 버튼 */}
        <div className="mt-10 flex gap-4">
          <Link
            to="/recipes"
            className="px-2 py-1 border border-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-100 transition-all text-sm font-medium"
          >
            🔙 목록으로 돌아가기
          </Link>
          <Link
            to={`/recipes/${recipe.id}/edit`}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
          >
            ✏️ 수정하기
          </Link>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all text-sm font-medium"
          >
            ❤️ 좋아요
          </button>
        </div>
      </div>
    </div>
  );
}