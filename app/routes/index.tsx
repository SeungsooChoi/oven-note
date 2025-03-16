import { supabase } from "~/utils/supabase.server";

export async function loader() {
  const { data, error } = await supabase.from("recipes").select("*");
  if (error) console.error(error);
  return { recipes: data };
}

export default function Index() {
  return <h1>🍰 Welcome to My Recipe App!</h1>;
}
