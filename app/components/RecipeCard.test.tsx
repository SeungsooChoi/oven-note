import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import RecipeCard from "./RecipeCard";
import { MemoryRouter } from "react-router";

describe("RecipeCard Component", () => {
  let recipe: {
    id: string;
    title: string;
    description: string;
    cook_time: number;
    image_url: string;
    difficulty: "easy" | "medium" | "hard";
  };

  beforeEach(() => {
    // 🟢 Given: 테스트에 사용할 레시피 데이터를 설정
    recipe = {
      id: "1",
      title: "🍫 맛있는 초코케이크",
      description: "달콤한 초코케이크 만드는 방법",
      cook_time: 30,
      image_url: "/images/cake.jpg",
      difficulty: "medium",
    };
  });

  test("레시피 카드가 정상적으로 렌더링 되어야 한다", async () => {
    // 🟡 When: RecipeCard를 렌더링
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>
    );

    // 🔵 Then: 제목과 설명이 화면에 보여야 함
    expect(await screen.findByText(recipe.title)).toBeTruthy();
    expect(await screen.findByText(recipe.description)).toBeTruthy();
  });
});
