import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"), // 메인 페이지
  route("upload", "routes/upload.tsx"), // 업로드 페이지
  route("recipes", "routes/recipes.tsx"), // 레시피 목록 페이지
  route("recipes/:id", "routes/recipes.$id.tsx"), // 레시피 상세 페이지
  route("recipes/:id/edit", "routes/recipes.$id.edit.tsx"), // 레시피 수정 페이지
] satisfies RouteConfig;
