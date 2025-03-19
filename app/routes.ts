import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"), // 메인 페이지
  route("upload", "routes/upload.tsx"), // 업로드 페이지
  route("recipes", "routes/recipes.tsx"), // 레시피 목록 페이지
  route("recipes/:id", "routes/recipes.$id.tsx"), // 레시피 상세 페이지
  route("recipes/:id/edit", "routes/recipes.$id.edit.tsx"), // 레시피 수정 페이지


  // 로그인 및 회원가입 모달을 위한 병렬 라우팅 추가
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
] satisfies RouteConfig;
