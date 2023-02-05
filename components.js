// ============================= Open Cart ======================================
 export function openCart(){
    let overlay = document.querySelector(".open-cart .overlay");
    let cart = document.querySelector(".open-cart .open-cart-overlay");
    let btnOpen = document.querySelector(".nav-right .nav-cart");
    let close = document.querySelector(".shopping-cart-top i");
    btnOpen.addEventListener("click", function(){
        overlay.classList.toggle("active");
        cart.classList.toggle("active-right");
    })
    close.addEventListener("click", function(){
        overlay.classList.toggle("active");
        cart.classList.toggle("active-right");
    })
};
// =================================== OPEN NAVBAR MOBILE ============================

export function openNavbarMobile(){
    let btnBar = document.querySelector("header .navbar-mobile");
    let openNavM = document.querySelector(".open-navbar-mobile");
    let closeNavM = openNavM.querySelector(".navbar-mobile-close");
    let navbarFade = openNavM.querySelector(".navbar-mobile-link");
    console.log(openNavM);
    console.log(closeNavM);
    console.log(btnBar)
    btnBar.addEventListener("click", ()=>{
        openNavM.classList.add("active");
        navbarFade.style.width = "90%";
        navbarFade.style.animation = "navBarMFadeIn 0.4s ease";
    })
    closeNavM.addEventListener("click", ()=>{
        navbarFade.style.animation = "navBarMFadeOut 0.4s ease";
        navbarFade.style.width = "0";
        openNavM.classList.remove("active");
    })
}

export function openNavBarMDown(){
    let navDownI = document.querySelector("header .navbarM-a i");
    let navList = document.querySelector(".navbarM-list-dow");
    navDownI.addEventListener("click", ()=>{
        navList.classList.toggle("active");
        navDownI.classList.toggle("active");
    })
}