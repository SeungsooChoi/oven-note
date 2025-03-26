import { useLoaderData } from "react-router";
import RecipeCard from "~/components/RecipeCard";
import { supabase } from "~/utils/supabase.server";

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
