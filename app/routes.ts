import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"), // 메인 페이지
  route("login", "routes/login.tsx"), // 로그인
  route("signup", "routes/signup.tsx"), // 회원가입
  route("upload", "routes/upload.tsx"), // 업로드 페이지

  ...prefix("recipes", [
    index("routes/recipes.tsx"),
    route(":id", "routes/recipe.tsx"), // 레시피 상세 페이지
    route(":id/edit", "routes/recipe-edit.tsx"), // 레시피 수정 페이지
  ]),
] satisfies RouteConfig;
