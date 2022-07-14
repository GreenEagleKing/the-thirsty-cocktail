//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click',() =>{
    removeIngredients()
    loader()
    getDrink()
    setTimeout(showResult, 1500)
    window.scrollTo(0,700)
})
welcome()



//const cocktailURL = https://www.thecocktaildb.com/api/json/v1/1/search.php?s=

function getDrink() {
    let cocktailName = document.querySelector('input').value
    carouselInput(cocktailName)
    

// Fetches cocktails from API
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks)
        numOfIngredients(data.drinks[0])
        getMeasures(data.drinks[0]) 
        document.querySelector('h2').innerText = data.drinks[0].strDrink.toUpperCase()
        document.querySelector('#drinkImg').src = data.drinks[0].strDrinkThumb
        document.querySelector('.drinkInstructions').innerText = data.drinks[0].strInstructions
        document.querySelector('#carousel').addEventListener('click',() => {
            removeIngredients()
            nextDrink()
            
        })

        //Retrieves next drink in same category
        let i = 1
        function nextDrink() {
            numOfIngredients(data.drinks[i])
            getMeasures(data.drinks[i])     
            document.querySelector('h2').innerText = data.drinks[i].strDrink.toUpperCase()
            document.querySelector('#drinkImg').src = data.drinks[i].strDrinkThumb
            document.querySelector('.drinkInstructions').innerText = data.drinks[i].strInstructions
            data.drinks[i++]

            if (i === data.drinks.length) {
                i = 0;
            }
        }

       
                       
    })
    .catch(err => {
        console.log(`error ${err}`)
        alert("Error! Drink not found try another")
    })

    
}

// Welcome message varies depending on time of day
function welcome() {

    const today = new Date()
    const time = today.getHours()
    let greet

    if (time >= 12 && time < 18) {
        greet = 'What would you like to drink this afternoon?'
    } else if (time >= 18 && time < 23.59) {
        greet = 'What drink would you like this evening?'
    } else if (time > 0 && time < 1) {
        greet = 'Last orders!'
    } else {
        greet = 'Never a better time for a drink, what would you like?'
    }

    document.querySelector('h1').innerText = greet
}

// When user enters drink, carousel button text is replaced with user drink
function carouselInput(drinkName) {
    let btnText = document.getElementById('carousel').textContent
    console.log(btnText)
    btnText = 'Try another ' + drinkName + ' drink'
    console.log(btnText)

    document.getElementById('carousel').textContent = btnText
}

// When drink is fetched this function creates a new div element for each ingredient
function numOfIngredients(drinkName) {
    let i = 0
    for(i = 1; i < 16; i++) {

     let ingredient = document.createElement('li')
     ingredient.innerText = drinkName[`strIngredient${i}`]
    
     if(ingredient.innerText !== "") {
        document.querySelector('.ingredients').appendChild(ingredient)
     }
    }
}

//Removes blank ingredients and measures
function removeIngredients() {
    document.querySelector('.ingredients').innerText = ""
    document.querySelector('.measurements').innerText = ""
 }

 // When "I want this drink" clicked ingredients and result show
 function showResult() {
     document.querySelector('.result-ingredient-container').style.display = 'flex'
     document.querySelector('.ingredients-measures-container').style.display = 'flex'
 }

 // Fetching the drink measurements and appending to dom
 function getMeasures(drinkName) {
    let i = 0
    for(i = 1; i < 15; i++) {

     let measurement = document.createElement('li')
     measurement.innerText = drinkName[`strMeasure${i}`]
    
     if(measurement.innerText !== "") {
        document.querySelector('.measurements').appendChild(measurement)
     }
    }
}

// When drink choice is clicked gif animation appears for 1.5 seconds

function loader() {
    const loader = document.getElementById("loader")

    show = function(){
        loader.style.display = "flex";
        setTimeout(hide, 1500); // 1.5 seconds
      },

      hide = function(){
        loader.style.display = "none";
      };

show()

}