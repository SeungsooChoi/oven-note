import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // ✅ jsdom 환경 사용
    globals: true, // ✅ `describe`, `test` 같은 전역 테스트 함수 사용 가능하게 설정
    setupFiles: "./vitest.setup.ts", // ✅ 테스트 실행 전 설정 파일 추가
  },
});
