// data items
const items = [
    {
        type: "tshirts",
        iamge: "./image/ts1.jpg",
        sale: true,
        content: "printed blue tshirt",
        vote: 4,
        price: 27.00,
    },
    {
        type: "tshirts",
        iamge: "./image/tshirt5.jpg",
        sale: false,
        content: "printed blue tshirt",
        vote: 4,
        price: 32.00,
    },
    {
        type: "tshirts",
        iamge: "./image/tshirt3.jpg",
        sale: false,
        content: "printed blue tshirt",
        vote: 4,
        price: 25.00,
    },
    {
        type: "tshirts",
        iamge: "./image/tshirt7.jpg",
        sale: true,
        content: "printed blue tshirt",
        vote: 4,
        price: 25.00,
    },
    {
        type: "mugs",
        iamge: "./image/mug-white.jpg",
        sale: false,
        content: "black printed coffee mug",
        vote: 4,
        price: 15.000,
    },
    {
        type: "mugs",
        iamge: "./image/mug-blue.jpg",
        sale: true,
        content: "black printed coffee mug",
        vote: 4,
        price: 15.000,
    },
    {
        type: "mugs",
        iamge: "./image/mug-yellow.jpg",
        sale: true,
        content: "black printed coffee mug",
        vote: 4,
        price: 15.000,
    },
    {
        type: "mugs",
        iamge: "./image/mug-blue.jpg",
        sale: true,
        content: "black printed coffee mug",
        vote: 4,
        price: 15.000,
    },
]

import {openCart, openNavbarMobile, openNavBarMDown} from "./components.js"

// ============================= Open Cart ======================================
openCart();
// =================================== OPEN NAVBAR MOBILE ============================
openNavbarMobile();

openNavBarMDown();

// ============================ Load Items Featured ==============================
loadFeatured();

function createFeaturedItem(arrayCart){
    let featured1List = document.querySelector(".featured-1 .featured-1-list");
    for(let i = 0; i < arrayCart.length; i++)
    {
        let div = document.createElement("div");
        div.className = "featured-1-item";
        div.innerHTML+= `
            <div class="item-image">
                <img src="${arrayCart[i].iamge}" alt="${arrayCart[i].type}">
                <div class="item-view">
                    quick view
                </div>
            </div>
            <div class="item-content">
                <div class="item-type">
                    ${arrayCart[i].type}
                </div>
                <h5 class="item-content">
                    ${arrayCart[i].content}
                </h5>
                <div class="items-star">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="item-price">
                    <span>$35.00</span>
                    <span>$${arrayCart[i].price}</span>
                </div>
                
            </div>
            <div class="item-sale">
                <span>sale!</span>
            </div>
        `;
        featured1List.append(div);
    }
    let itemSale = document.querySelectorAll(".featured-1-item .item-sale");
    for(let i = 0; i < arrayCart.length; i++)
    {
        if(arrayCart[i].sale == false)
            itemSale[i].style.display = "none";
    }
}
function loadFeatured(){
    let featured1List = document.querySelector(".featured-1 .featured-1-list");
    // let featured1Item = document.querySelectorAll(".featured-1-list .featured-1-item");
    let arrayCart = items.filter(key=>{
        return key.type == "tshirts";
    });
    createFeaturedItem(arrayCart);
}

openFeaturedType();

function removeChildFeatured(){
    let featured1 = document.querySelector(".featured-1");
    let featured1List = featured1.lastElementChild;
    featured1.removeChild(featured1List);
}
function openFeaturedType(){
    let featured1Tags = document.querySelectorAll(".featured-1-tags button");
    let featured1 = document.querySelector(".featured-1");
    for(let i = 0; i < featured1Tags.length; i++){
        featured1Tags[i].addEventListener("click", function(){
            removeChildFeatured();
            let att = featured1Tags[i].getAttributeNode("data-type").value;
           console.log(att);
            let div = document.createElement("div");
            div.className = "featured-1-list";
            featured1.append(div);
            let arrayCart = items.filter(key=>{
                return key.type == `${att}`;
            });
            createFeaturedItem(arrayCart);
            for(let j = 0; j < featured1Tags.length; j++)
            {
                if(featured1Tags[j].classList.contains("active"))
                    featured1Tags[j].classList.remove("active");
            }
            featured1Tags[i].classList.add("active");
        });
    }
}

// =============== OPEN VIDEO ============================
openVideo();
function openVideo(){
    let openOverLay = document.querySelector(".open-video");
    let btnOpenVideo = document.querySelector(".featured-2 .featured-2-watch-flex i")
    let closeVideo = document.querySelector(".open-video .close-video");
    let video = document.querySelector(".open-video video");
    btnOpenVideo.addEventListener("click", function(){
        openOverLay.classList.toggle("active");
    })
    closeVideo.addEventListener("click", function(){
        openOverLay.classList.toggle("active");
        if (video.paused) 
            video.play(); 
        else 
            video.pause();
    })
}

let slideIndex = 0;
slideShow();
function slideShow() {
    let slides = document.querySelectorAll(".featured-3 .slide-show-fade");
    for(let i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if(slideIndex > slides.length)
        slideIndex = 1;
    slides[slideIndex-1].style.display = "block";
    setTimeout(slideShow, 2000);
}


