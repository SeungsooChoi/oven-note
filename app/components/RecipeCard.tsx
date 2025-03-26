import { Link } from "react-router";
import type { Recipe } from "~/utils/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="group">
      <Card>
        {recipe.image_url ? <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        /> : '이미지가 없습니다.'}
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription>{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>⏱ {recipe.cook_time}분</p>
          <p>🌟 {recipe.difficulty}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
