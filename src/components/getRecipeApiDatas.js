import React, { useState } from 'react'
import axios from 'axios'

const GetRecipeApiDatas = () => {

  const [numOfResult, setNumOfResult] = useState(0)
  const [userIngredient1, setUserIngredient1] = useState('')
  const [userIngredient2, setUserIngredient2] = useState('')
  const [userIngredient3, setUserIngredient3] = useState('')
  const [userCalories, setUserCalories] = useState(0)
  const [errorRequest, setErrorRequest] = useState(false)
  const [recipe, SetRecipes] = useState([])

  // Generate a random number
  const getRandomNumber = (max) => Math.floor(Math.random() * Math.floor(max))
  //Define the range of search for the api request
  const defineRangeNumber = (nbResults) => {
    console.log(nbResults, "firstresult")
    const rangewidth = 50
    const numberToRandom = getRandomNumber(Math.ceil(nbResults / rangewidth))
    console.log(numberToRandom, "numberRandom")
    const max = (numberToRandom * rangewidth) + rangewidth > nbResults ? nbResults - 1 : (numberToRandom * rangewidth) + rangewidth
    console.log(max, "max")
    const min = max - rangewidth < 0 ? 0 : max - rangewidth
    return `&from=${min}&to=${max}`
  }

  const defineRequestUrl = (count) => {
    count = count ? count : numOfResult
    const calories = userCalories && `&calories=${userCalories}`
    const ingredients = userIngredient1 && `${userIngredient1},${userIngredient2},${userIngredient3}`
    console.log(count, "inDefine")
    const rangeRequest = count ? defineRangeNumber(count) : ''
    // url which will be send to the API request
    return `https://api.edamam.com/search?q=${ingredients}${calories}${rangeRequest}&app_id=812f083c&app_key=57cd06930f1a1d5818380b512897cc58`

  }

  // We verify if the number of results are define
  const callApi = (url) => numOfResult === 0 ? getNumRecipes(url) : getApiDatas(url)
  // If the number of result is unknown, we go fetch it
  const getNumRecipes = (url) => {
    axios.get(url)
      .then((res) => {
        console.log(res.data.count, "first")
        setNumOfResult(res.data.count)
        getApiDatas(defineRequestUrl(res.data.count))
      })
      .catch(e => setErrorRequest("Error, please check your ingredients"))
  }
  // Else we fetch the datas
  const getApiDatas = (url) => {
    axios.get(url)
      .then(res => {
        SetRecipes(res.data.hits.recipe)
      })
  }

  const submitForm = (e) => {
    e.preventDefault()
    callApi(defineRequestUrl())
  }

  const handleChange = (e) => {
    switch (e.target.id) {

      case "userIngredient1":
        setUserIngredient1(e.target.value)
        break
      case "userIngredient2":
        setUserIngredient2(e.target.value)
        break
      case "userIngredient3":
        setUserIngredient3(e.target.value)
        break
      case "userCalories":
        setUserCalories(e.target.value)
        break
      default:
    }
  }

  return (
    <div className='recipeSearch'>
      <h2>Recipe by ingredient</h2>
      <h3>What do you have in your fridge?</h3>
      <div className='ingredientSearch'>
        <form onSubmit={submitForm} class="form-example">
          <label htmlFor='userIngredient1'></label>
          <input onChange={handleChange} id='userIngredient1' type='text' placeholder='first ingredient' required pattern="[A-Za-z]+"></input>

          <label htmlFor='userIngredient2'></label>
          <input onChange={handleChange} id='userIngredient2' type='text' placeholder='second ingredient' />

          <label htmlFor='userIngredient3'></label>
          <input onChange={handleChange} id='userIngredient3' type='text' placeholder='third ingredient' />
          <div>{errorRequest}</div>
          <label htmlFor="userCalories">Number of minimum calories:</label>
          <input onChange={handleChange} type="range" id="userCalories" name="userCalories" min="0" max="10000" step="1" />{userCalories}
          <p>{numOfResult} recettes trouvées !</p>
          <div><input className="submit" type="submit" value="Get recipe"></input></div>
        </form>
        <ul>{recipe && recipe.map(e => e.label)}</ul>
      </div>
    </div>
  )
}

export default GetRecipeApiDatas