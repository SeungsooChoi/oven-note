import { Form, useActionData } from "react-router";
import { supabase } from "~/utils/supabase.server";
import type { Route } from "./+types";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const cook_time = Number(formData.get("cook_time"));
  const difficulty = formData.get("difficulty");

  const { data, error } = await supabase
    .from("recipes")
    .insert([{ title, description, cook_time, difficulty }]);

  if (error) return { error: error.message };
  return { success: true };
}

export default function UploadRecipe() {
  const actionData = useActionData();

  return (
    <Form method="post">
      <Card>
        <CardHeader>
          <CardTitle>레시피 등록</CardTitle>
          <CardDescription>레시피를 등록하기 위해 모든 정보를 입력하세요.</CardDescription>
        </CardHeader>
      </Card>
      <input name="title" placeholder="레시피 제목" required />
      <textarea name="description" placeholder="설명" required />
      <input name="cook_time" type="number" placeholder="조리 시간 (분)" required />
      <select name="difficulty">
        <option value="easy">쉬움</option>
        <option value="medium">중간</option>
        <option value="hard">어려움</option>
      </select>
      <button type="submit">레시피 업로드</button>
      {actionData?.error && <p>Error: {actionData.error}</p>}
      {actionData?.success && <p>✅ 업로드 성공!</p>}
    </Form>
  );
}
