import { Link } from "react-router";
import type { Recipe } from "~/utils/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="group">
      <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg">
        {/* 레시피 이미지 */}
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* 카드 내용 */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{recipe.description}</p>

          {/* 추가 정보 */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <span>⏱ {recipe.cook_time}분</span>
            <span>🌟 {recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
