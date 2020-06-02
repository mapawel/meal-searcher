const $link = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; //api link w/o searched food name
let $url;
let $content; //api reponce with meals
let $input;
let $searchBtn;
// sections to display:
let $resultsSection;
let $choiceSection;

let $resultsList; // list with meals to select
let $resultsListContainer; // list with meals to select

// different variables
let $searchedMeal;




const main = () => {
    prepareDomElements();
    prepareEvents();
}

const prepareDomElements = () => {
    $input = document.querySelector('.header-input');
    $searchBtn = document.querySelector('.header-input-btn');
    $resultsList = document.querySelector('.results');
    $resultsListContainer = document.querySelector('.results-container');
}

const prepareEvents = () => {
    $searchBtn.addEventListener('click', searchMeal)
}



const searchMeal = () => {
    $searchedMeal = $input.value;
    console.log($searchedMeal)
    $url = $link + $searchedMeal;
    axios.get($url)
        .then(res => {
            $content = res.data.meals;
            console.log($content);
            clearResultsList();
            $content.forEach(addResult);
        })
        .catch(err => console.log('! ! ERROR ! !' + err))
}

const clearResultsList = () => {
    $resultsListContainer.removeChild($resultsList);
    $resultsList = document.createElement('ul');
    $resultsList.classList.add('results');
    $resultsListContainer.appendChild($resultsList);
}

const addResult = (meal) => {
    let newResult = document.createElement('li');
    newResult.classList.add('result');
    $resultsList.appendChild(newResult);
    let newResultTxtName = document.createElement('p');
    newResultTxtName.classList.add('result-txt-name');
    newResultTxtName.innerText = meal.strMeal;
    newResult.appendChild(newResultTxtName);
    let newResultTxtDesc = document.createElement('p');
    newResultTxtDesc.classList.add('result-txt-desciption');
    newResultTxtDesc.innerText = meal.strArea;
    newResult.appendChild(newResultTxtDesc);
    let newResultToolsBox = document.createElement('div');
    newResultToolsBox.classList.add('result-tools');
    newResult.appendChild(newResultToolsBox);
    let newButtonCheck = document.createElement('button');
    newButtonCheck.classList.add('result-check');
    newResultToolsBox.appendChild(newButtonCheck);
    let iconSearch = document.createElement('i')
    iconSearch.classList.add('fas', 'fa-search');
    newButtonCheck.appendChild(iconSearch);
    let newButtonChoose = document.createElement('button');
    newButtonChoose.classList.add('result-choose');
    newResultToolsBox.appendChild(newButtonChoose);
    let iconChoose = document.createElement('i')
    iconChoose.classList.add('fas', 'fa-check');
    newButtonChoose.appendChild(iconChoose);
}















document.addEventListener("DOMContentLoaded", main)












// const display = (id) => {
//     img.setAttribute('src', content[id].strMealThumb)
// }

// const test = (chosen) => {
//     display(chosen.getAttribute('id'))
// }

// const createMeals = (meal) => {
//     console.log(meal.strMeal);
//     let foodElement = document.createElement('a');
//     container.appendChild(foodElement)
//     foodElement.innerText = meal.strMeal;
//     // foodElement.setAttribute('href', meal.strMealThumb)
//     foodElement.setAttribute('id', id)
//     id += 1;
//     foodElement.setAttribute('onclick', 'test(this)')
// }

// const link = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
// let content;
// let id = 0;

//     searched = 'beef';
//     url = link + searched
//     axios.get(url)
//         .then(res => {
//             content = res.data.meals;
//             console.log(content);
//             // console.log(content.length);
//             // content.forEach(createMeals)
//         })
//         .catch(err => console.log('ERROR' + err))