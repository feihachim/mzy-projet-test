"use strict";

const initSlider = () => {
    const imageListe = document.querySelector(".sliderwrapper .imageListe");
    const slideButtons = document.querySelectorAll(".sliderwrapper .slide-button");
    const maxScrollleft = imageListe.scrollWidth - imageListe.clientWidth;

    slideButtons.forEach(button => {
        button.addEventListener("click" , () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageListe.clientWidth * direction;
            imageListe.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageListe.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageListe.scrollLeft >= maxScrollleft ? "none" : "block";
    }

    imageListe.addEventListener("scroll" , () => {
        handleSlideButtons();
    })

}

window.addEventListener("load" , initSlider);