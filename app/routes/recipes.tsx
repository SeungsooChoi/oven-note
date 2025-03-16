import { createClient } from "@supabase/supabase-js";
import { Link, useLoaderData } from "react-router";
import RecipeCard from "~/components/RecipeCard";

// Supabase 클라이언트 생성
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export async function loader() {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error) {
    throw new Response("레시피를 불러올 수 없습니다.", { status: 500 });
  }

  return data;
}

export default function RecipesList() {
  const recipes = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ul>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </ul>
    </div>
  );
}
