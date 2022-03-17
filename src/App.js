import { useEffect, useState } from 'react';
import Recipe from './components/Recipe';
import './App.css';

function App() {
  
  const APP_ID = '27a40245';
  const APP_KEY = '12ac80c0f79d71e7359b287dd48a883b';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
 
  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventdefault();
    setQuery(search);
    setSearch('');
  }

  useEffect(()=>{
    getRecipes();
    
  }, [query])

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type="text" value={search} onChange={updateSearch}/>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe  key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  );
}

export default App;
