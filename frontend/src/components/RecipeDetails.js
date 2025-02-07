import { useAuthContext } from '../hooks/useAuthContext';
import { useRecipesContext } from '../hooks/useRecipesContext';
import EditRecipe from './EditRecipe'; 

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/recipes/' + recipe._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: json });
    }
  };

  return (
    <div className="recipe-details">
      <h4>{recipe.name}</h4>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <EditRecipe recipe={recipe} /> {/* Use EditRecipe */}
    </div>
  );
};

export default RecipeDetails;