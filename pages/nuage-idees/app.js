"use strict";

// let chosenMovie=false;
let genreList;
let movieList;
let movieListFiltered;
let genreResult=[];
let xhr;
const genreListBox=document.querySelector(".genre-list");
const choiceButton=document.querySelector(".choice-button");
const movieCardList=document.querySelector(".movie-list");

// TODO nuage idee logique et display resultat

function createGenreButton(genre){
    const button=document.createElement("div");
    button.classList.add("genre-button");
    button.textContent=genre;
    button.addEventListener("click",e=>{
        if(button.style.backgroundColor=="rgb(217, 217, 217)"){
            button.style.backgroundColor="rgb(217,217,217)";
            button.style.color = "rgb(19,19,19)";
            console.log("first change" + button.style.backgroundColor + " " +button.style.color);
        }
        else{
            button.style.backgroundColor="rgb(19,19,19)";
            button.style.color = "rgb(217,217,217)";
            console.log("second change" + button.style.backgroundColor + " " +button.style.color);
        }
        //button.style.backgroundColor=button.style.backgroundColor==="#d9d9d9"?"black":"#d9d9d9";
        
        movieListFiltered=movieListFiltered.filter(movie=>movie.genres.includes(genre));
        console.log(movieListFiltered);
        if(!genreResult.includes(genre)){
            genreResult.push(genre);
            console.log(genreResult);
        }
    });
    genreListBox.appendChild(button);
}

function createCardListItem(movie){
    const article=document.createElement("article");
    const h3=document.createElement("h3");
    const imgEl=document.createElement("img");
    article.classList.add("item-list");
    h3.textContent=movie.title;
    article.appendChild(h3);
    imgEl.src=movie.posterUrl;
    imgEl.alt=movie.title;
    article.appendChild(imgEl);
    movieCardList.appendChild(article);
}

function createCardSingleItem(movie){
    const articleEl=document.createElement("article");
    const divLeftEl=document.createElement("div");
    const divRightEl=document.createElement("div");
    const h3El=document.createElement("h3");
    const imgEl=document.createElement("img");
    const pEl=document.createElement("p");
    divLeftEl.classList.add("left-side");
    divRightEl.classList.add("right-side");
    h3El.textContent=movie.title;
    imgEl.src=movie.posterUrl;
    imgEl.alt=movie.title;
    pEl.textContent=movie.plot;
    divLeftEl.appendChild(imgEl);
    divRightEl.appendChild(h3El);
    divRightEl.appendChild(pEl);
    articleEl.appendChild(divLeftEl);
    articleEl.appendChild(divRightEl);
    movieCardList.appendChild(articleEl);
}

function createNoResultItem(){
    const divEl=document.createElement("div");
    const h3=document.createElement("h3");
    const imgEl=document.createElement("img");
    divEl.classList.add("no-result");
    h3.textContent="Désolé,pas de résultats";
    imgEl.src="../../assets/images/visuals-404.jpg";
    divEl.appendChild(h3);
    divEl.appendChild(imgEl);
    movieCardList.appendChild(divEl);
}

function displayResults(){
    choiceButton.addEventListener("click",e=>{
        if(movieListFiltered.length>1){
            movieListFiltered.map(movie=>createCardListItem(movie));
        }
        else if(movieListFiltered.length===1){
            createCardSingleItem(movieListFiltered[0]);
        }
        else{
            createNoResultItem();
        }
        window.location.href="#result-search";
    })
}

window.addEventListener("load",e=>{
    xhr=new XMLHttpRequest();
    xhr.open("GET","../../assets/data/db.json");
    xhr.responseType="json";
    xhr.send();

    xhr.onload=function(){
        if(xhr.status!=200){
            alert(`Error ${xhr.status}:${xhr.statusText}`);
        }
        else{
            movieList=xhr.response.movies;
            movieListFiltered=movieList;
            genreList=xhr.response.genres;
            genreList.map(genre=>createGenreButton(genre));
            displayResults();
        }
    };
});