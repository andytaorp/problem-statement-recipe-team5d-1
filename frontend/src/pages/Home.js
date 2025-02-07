import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import RecipeDetails from '../components/RecipeDetails'
import RecipeForm from '../components/RecipeForm'

const Home = () => {
    const [recipes, setRecipes] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!user) return

            const response = await fetch('/api/recipes', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                setRecipes(json)
            }
        }

        if (user) {
            fetchRecipes()
        }
    }, [user])

    return (
        <div className="home">
            <div className="recipes">
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>
            <RecipeForm />
        </div>
    )
}

export default Home
