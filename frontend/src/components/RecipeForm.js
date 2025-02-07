import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useRecipesContext } from "../hooks/useRecipesContext"

const RecipeForm = () => {
    const { dispatch } = useRecipesContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const recipe = { name, ingredients: ingredients.split(','), instructions, prepTime, difficulty }

        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setIngredients('')
            setInstructions('')
            setPrepTime('')
            setDifficulty('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_RECIPE', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Recipe</h3>

            <label>Recipe Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Ingredients (comma separated):</label>
            <input 
                type="text"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                className={emptyFields.includes('ingredients') ? 'error' : ''}
            />

            <label>Cooking Instructions:</label>
            <textarea 
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
                className={emptyFields.includes('instructions') ? 'error' : ''}
            />

            <label>Preparation Time (in minutes):</label>
            <input 
                type="number"
                onChange={(e) => setPrepTime(e.target.value)}
                value={prepTime}
                className={emptyFields.includes('prepTime') ? 'error' : ''}
            />

            <label>Difficulty Level:</label>
            <select 
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
                className={emptyFields.includes('difficulty') ? 'error' : ''}
            >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button>Add Recipe</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RecipeForm