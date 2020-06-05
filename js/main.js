const $link = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; //api link w/o searched food name
let $url;
let $urlRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';
let $content; //api reponce with meals
let $randomMeal; //api responce with random meal
let $input;
let $searchBtn;
let $homeBtn;
let $thumbnailsSection; //thumbnails section
let $resultsSection; //result section
let $backSection; //section with back to list link
let $manualSection; //welcome section
let $backLink; //link 'back to list'
let $resultsList; // list with meals to select
let $resultsListContainer; // container with list with results to clear list

//section with chosen meal
let $choiceSection;
let $chosenMealTitle;
let $chosenMealImage;
let $chosenMealDecription;
let $chosenMealArea;
let $chosenMealIngListContainer;
let $chosenMealIngList;
let $chosenMealReceip;
let $chosenMealReceipParent;

// section with random meal
let $randomPropSection; //random proposal section
let $randomPropTitle;
let $randomPropImage;
let $randomPropDecription;
let $randomPropArea;
let $randomPropBtn;
let $randomRefreshBtn;

// different variables
let $searchedMeal;
let $mealId;
let $selectedMealsID;
let $previewMealsID;
let $receipeElNr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let $resultsImgBoxes;
let $nowPreviewed;





const main = () => {
    prepareDomElements();
    prepareEvents();
    getRandomProp();
}

const prepareDomElements = () => {
    $input = document.querySelector('.header-input');
    $searchBtn = document.querySelector('.header-input-btn');
    $homeBtn = document.querySelector('.home-btn');
    $resultsList = document.querySelector('.results');
    $resultsListContainer = document.querySelector('.results-container');
    $chosenMealTitle = document.querySelector('.chosen-title');
    $chosenMealImage = document.querySelector('.chosen-img');
    $chosenMealDecription = document.querySelector('.chosen-description');
    $chosenMealArea = document.querySelector('.chosen-area');
    $chosenMealIngListContainer = document.querySelector('.chosen-ingr');
    $chosenMealIngList = document.querySelector('.chosen-ingr-list');
    $chosenMealReceipParent = document.querySelector('.chosen-receipe');
    $chosenMealReceip = document.querySelector('.chosen-receipe-box');
    $resultsSection = document.querySelector('.search-results');
    $choiceSection = document.querySelector('.chosen-meal');
    $backSection = document.querySelector('.back');
    $backLink = document.querySelector('.back-link');
    $manualSection = document.querySelector('.manual');
    $thumbnailsSection = document.querySelector('.thubnails');
    $randomPropSection = document.querySelector('.todays-proposal');
    $randomPropTitle = document.querySelector('.proposal-title');
    $randomPropImage = document.querySelector('.proposal-img');
    $randomPropDecription = document.querySelector('.proposal-description');
    $randomPropArea = document.querySelector('.proposal-area');
    $randomPropBtn = document.querySelector('.proposal-btn');
    $randomRefreshBtn = document.querySelector('.proposal-refresh-btn');
}

const prepareEvents = () => {
    $backLink.addEventListener('click', listBack)
    $homeBtn.addEventListener('click', () => window.location.reload(true))
    $searchBtn.addEventListener('click', searchMeal)
    $randomPropBtn.addEventListener('click', selectRandomMeal)
    $randomRefreshBtn.addEventListener('click', getRandomProp);
    $input.addEventListener('keyup', function (key) {
        if (key.key == 'Enter') {
            searchMeal();
        }
    })
}


const searchMeal = () => {
    $searchedMeal = $input.value;
    $url = $link + $searchedMeal;
    axios.get($url)
        .then(res => {
            $content = res.data.meals;
            console.log($content);
            clearResultsList();
            $mealId = 0;
            if ($content) {
                $content.forEach(addResult)
            } else {
                wrongSearch();
            }
        })
        .catch(err => console.log('! ! ERROR ! !' + err))
}

const getRandomProp = () => {
    axios.get($urlRandom)
        .then(res => {
            $randomMeal = res.data.meals;
            displayRandomMeal();
            console.log($randomMeal);
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
    $resultsSection.classList.remove('nodisplay');
    $choiceSection.classList.add('nodisplay');
    $manualSection.classList.add('nodisplay');
    $backSection.classList.add('nodisplay');
    $input.value = '';
    let newResult = document.createElement('li');
    newResult.classList.add('result');
    newResult.setAttribute('id', $mealId);
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
    newButtonCheck.setAttribute('onclick', 'showImgBox(this)');
    newResultToolsBox.appendChild(newButtonCheck);
    let iconSearch = document.createElement('i')
    iconSearch.classList.add('fas', 'fa-search');
    newButtonCheck.appendChild(iconSearch);
    let newButtonChoose = document.createElement('button');
    newButtonChoose.classList.add('result-choose');
    newButtonChoose.setAttribute('onclick', 'selectMealfromList(this)');
    newResultToolsBox.appendChild(newButtonChoose);
    let iconChoose = document.createElement('i')
    iconChoose.classList.add('fas', 'fa-check');
    newButtonChoose.appendChild(iconChoose);

    let newResultImgBox = document.createElement('div');
    newResultImgBox.classList.add('result-img-box', 'hidden-img-box');
    newResultImgBox.setAttribute('id', $mealId);
    newResult.appendChild(newResultImgBox);

    let newResultImg = document.createElement('img');
    newResultImg.classList.add('result-img');
    newResultImg.setAttribute('src', meal.strMealThumb);
    newResultImgBox.appendChild(newResultImg);

    let newResultImgTxt = document.createElement('p');
    newResultImgTxt.classList.add('result-thumb-close');
    newResultImgTxt.innerText = 'click image to close';
    newResultImgBox.appendChild(newResultImgTxt);

    let newResultImgBtn = document.createElement('button');
    newResultImgBtn.classList.add('result-thumb-select-btn', 'blue-btn');
    newResultImgBtn.setAttribute('id', $mealId);
    newResultImgBtn.setAttribute('onclick', 'selectMealfromList(this)');
    newResultImgBtn.innerText = 'check';
    newResultImgBox.appendChild(newResultImgBtn);

    $mealId += 1;
}

const wrongSearch = () => {
    $resultsSection.classList.remove('nodisplay');
    $choiceSection.classList.add('nodisplay');
    $manualSection.classList.add('nodisplay');
    $input.value = '';
    let newResult = document.createElement('li');
    newResult.classList.add('result');
    $resultsList.appendChild(newResult);
    let newResultTxtName = document.createElement('p');
    newResultTxtName.classList.add('result-txt-name');
    newResultTxtName.innerText = "not found - try another dish name...";
    newResultTxtName.style.color = 'red';
    newResultTxtName.style.fontSize = '1.5em';
    newResultTxtName.style.textAlign = 'center';
    newResultTxtName.style.width = '100%';
    newResult.appendChild(newResultTxtName);
}

const showImgBox = (id) => {
    ($nowPreviewed) ? closeImgBox(): '';
    $previewMealsID = id.closest('li').getAttribute('id');
    $resultsImgBoxes = document.querySelectorAll('.result-img-box');
    $resultsImgBoxes[$previewMealsID].classList.remove('hidden-img-box');
    $resultsImgBoxes[$previewMealsID].addEventListener('click', closeImgBox);
    $nowPreviewed = $resultsImgBoxes[$previewMealsID];
}

const closeImgBox = () => {
    $nowPreviewed.classList.add('hidden-img-box')
}



const selectMealfromList = (id) => {
    $choiceSection.classList.remove('nodisplay');
    $selectedMealsID = id.closest('li').getAttribute('id');
    $resultsSection.classList.add('nodisplay');
    $backSection.classList.remove('nodisplay');
    $randomPropSection.classList.add('nodisplay');
    ($nowPreviewed) ? closeImgBox(): '';
    displayChosenMeal();
    displayIngreadients();
    displayReceipe();
}

const selectRandomMeal = () => {
    $choiceSection.classList.remove('nodisplay');
    $content = $randomMeal;
    $selectedMealsID = 0;
    $resultsSection.classList.add('nodisplay');
    $randomPropSection.classList.add('nodisplay');
    $manualSection.classList.add('nodisplay');
    ($nowPreviewed) ? closeImgBox(): '';
    displayChosenMeal();
    displayIngreadients();
    displayReceipe();
    $content = '';
}



const listBack = () => {
    $backSection.classList.add('nodisplay');
    $choiceSection.classList.add('nodisplay');
    $resultsSection.classList.remove('nodisplay');
}

const displayChosenMeal = () => {
    $chosenMealImage.setAttribute('src', '');
    $chosenMealImage.setAttribute('src', $content[$selectedMealsID].strMealThumb);
    $chosenMealTitle.innerText = $content[$selectedMealsID].strMeal;
    $chosenMealDecription.innerText = $content[$selectedMealsID].strMeal;
    $chosenMealArea.innerText = $content[$selectedMealsID].strArea;
}

const displayIngreadients = () => {
    $chosenMealIngListContainer.removeChild($chosenMealIngList);
    $chosenMealIngList = document.createElement('ul');
    $chosenMealIngList.classList.add('chosen-ingr-list');
    $chosenMealIngListContainer.appendChild($chosenMealIngList);
    $receipeElNr.forEach(nr => {
        let ingreadient = eval('$content[$selectedMealsID].strIngredient' + String(nr));
        let measure = eval('$content[$selectedMealsID].strMeasure' + String(nr));
        if (ingreadient) {
            let newIngreadient = document.createElement('li');
            newIngreadient.classList.add('chosen-ingr-el');
            $chosenMealIngList.appendChild(newIngreadient);
            let newIngreadientName = document.createElement('p');
            newIngreadientName.classList.add('ingr-name');
            newIngreadientName.innerText = ingreadient;
            newIngreadient.appendChild(newIngreadientName);
            let newIngreadientMeasure = document.createElement('p');
            newIngreadientMeasure.classList.add('ingr-measure');
            newIngreadientMeasure.innerText = measure;
            newIngreadient.appendChild(newIngreadientMeasure);
        }
    })
}

const displayReceipe = () => {
    $chosenMealReceipParent.removeChild($chosenMealReceip);
    $chosenMealReceip = document.createElement('div');
    $chosenMealReceip.classList.add('chosen-receipe-box');
    $chosenMealReceipParent.appendChild($chosenMealReceip);

    let instructionsTxt = $content[$selectedMealsID].strInstructions.split(/\n/ig);
    instructionsTxt.forEach(receipEl => {
        if (receipEl != '<br>') {
            let newInstructionPar = document.createElement('p');
            newInstructionPar.classList.add('txt-receipe');
            newInstructionPar.innerHTML = receipEl;
            $chosenMealReceip.appendChild(newInstructionPar);
        }
    })

}
const displayRandomMeal = () => {
    $randomPropTitle.innerText = '';
    $randomPropTitle.innerText = $randomMeal[0].strMeal;
    $randomPropDecription.innerText = '';
    $randomPropDecription.innerText = $randomMeal[0].strMeal;
    $randomPropArea.innerText = '';
    $randomPropArea.innerText = $randomMeal[0].strArea;
    $randomPropImage.setAttribute('src', '');
    $randomPropImage.setAttribute('src', $randomMeal[0].strMealThumb);
}



document.addEventListener("DOMContentLoaded", main)