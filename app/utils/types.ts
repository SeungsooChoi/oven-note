export interface Recipe {
  id: string;
  title: string;
  description: string;
  cook_time: number;
  difficulty: "easy" | "medium" | "hard"; // 난이도가 정해진 값이라면
  image_url: string;
}
