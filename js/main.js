let charactersArray;

const getCharacters = async () =>{
    console.log('Start');
    const response = await fetch('https://my-got-api.herokuapp.com/')
    const formatedResonse = await response.json();    
    charactersArray = formatedResonse;
    console.log('Finish');    
}

let charactersList = document.querySelector('.characters__list');
let searchButton = document.querySelector(".search__btn");
let inputCharacter = document.querySelector(".search");

function selectItem(input, allName){
    input = input.toLowerCase();
    allName = allName.toLowerCase(); 
    if (allName.indexOf(input)!=-1) return true; else return false;
}

inputCharacter.addEventListener('keydown', logKey);

function logKey(e){    
    if (e.code == "Enter"&&inputCharacter.value) printCharacters();
    if (e.code == "Enter"&&!inputCharacter.value) 
    {   charactersList.replaceChildren();
        showCharacters();
    }
}

searchButton.addEventListener('click', printCharacters);

function printCharacters () {
    if (inputCharacter.value) {        
        let selectedArray = [];
        for(item of charactersArray){
            if (selectItem(inputCharacter.value, item.fullName)) selectedArray.push(item);            
        }
        console.log(selectedArray);
        charactersList.replaceChildren();
        for(character of selectedArray){
            let item = {
                fullName: character.fullName,
                title: character.title,
                imageUrl: character.imageUrl,
            }
            createCharacter(item);    
        }
    } else 
    {   charactersList.replaceChildren();
        showCharacters();}
};

function createCharacter({fullName, title, imageUrl}) {
    const container = document.createElement('li');
    container.classList.add('character__item');

    const avatar = document.createElement('img');
    avatar.classList.add('character__img');
    avatar.setAttribute('src', imageUrl);

    const fullNameItem = document.createElement('h1');
    fullNameItem.classList.add('character__fullname');
    fullNameItem.innerText = fullName;

    const titleItem = document.createElement('p');
    titleItem.classList.add('character__title');
    titleItem.innerText = title;
    
    container.append(avatar);
    container.append(fullNameItem);
    container.append(titleItem);
    charactersList.append(container);
}

const showCharacters = async () =>{
    await getCharacters();
    for(let i = 0; i<charactersArray.length; i++){
        let item = {
            fullName: charactersArray[i].fullName,
            title: charactersArray[i].title,
            imageUrl: charactersArray[i].imageUrl,
        }
        createCharacter(item);
    }    
    console.log(charactersArray[4]);
}

showCharacters();

