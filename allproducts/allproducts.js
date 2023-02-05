import {openCart, openNavbarMobile, openNavBarMDown} from "/components.js"

// ============================= Open Cart ======================================
openCart();
// =================================== OPEN NAVBAR MOBILE ============================
openNavbarMobile();

openNavBarMDown();

// ============================ Load Items Featured ==============================
function removeChildFeatured(){
    let featured1 = document.querySelector(".featured-1");
    let featured1List = featured1.querySelector(".featured-1-list");
    console.log(featured1List)
    featured1.removeChild(featured1List);
}

// // =============================== SORT MIN ==========================================
function sortCartItems(items) {
    let select = document.querySelector(".featured-1-tag-right select");
    select.addEventListener("change", function(){
        if(select.value == 'lowtohigh')
        {
            console.log("YES");
            lowAndHigh(select.value, items);
        }else if(select.value == "hightolow") {
            console.log("YES");
            lowAndHigh(select.value, items);
        }
    })
}

function lowAndHigh(typeSort, item){
    item.sort(function(a, b){
        if(typeSort == "lowtohigh")
            return a.price - b.price;
        else if(typeSort == "hightolow")
            return b.price - a.price;
    });
    let liItems = document.querySelectorAll(".featured-1-item").length;
    console.log(liItems);
    removeChildFeatured();
    let featured1 = document.querySelector(".featured-1");
    let div = document.createElement("div");
    div.className = "featured-1-list";
    featured1.append(div);
    for(let i = 0; i < liItems; i++)
    {
        createItems(item[i]);
    }
}
function createCartDafaultSort(item){
    let liItems = document.querySelectorAll(".featured-1-item").length;
    removeChildFeatured();
    let featured1 = document.querySelector(".featured-1");
    let div = document.createElement("div");
    div.className = "featured-1-list";
    featured1.append(div);
    for(let i = 0; i < liItems; i++)
    {
        createItems(item[i]);
    }
}

function dafaultSort(items) {
    let select = document.querySelector(".featured-1-tag-right select");
    select.addEventListener("change", function(){
        if(select.value != 'lowtohigh' &&
        select.value != "hightolow")
        {
            createCartDafaultSort(items);
        }
    });
}

/* 
    B1: Khỏi tạo max phần tử, số phần tử tăng, trang hiện tại, maxpage, 
    lấy DOM;
    B2:
        viết hàm kiểm tra button
    B3: tạo thẻ div của item
    B4: hàm thực hiện thêm 
        item bắt đầu
        item kết thúc
        item bắt đầu sẻ là currentPage - 1 * số pt thêm;
        item ket thúc sẽ là currentPage * soptthem khi nhỏ hơn max pt
        và ngược lại.
    B5: thực hiện hàm thực hiện thêm khi load trang
*/



function createItems(item){
    let featured1List = document.querySelector(".featured-1 .featured-1-list");
    let div = document.createElement("div");
    div.className = "featured-1-item";
    div.innerHTML+= `
        <div class="item-image">
            <img src="${item.iamge}" alt="${item.type}">
            <div class="item-view">
                quick view
            </div>
        </div>
        <div class="item-content">
            <div class="item-type">
                ${item.type}
            </div>
            <h5 class="item-content">
                ${item.content}
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
                <span>$${item.price}</span>
            </div>
            
        </div>
        <div class="item-sale">
            <span>sale!</span>
        </div>
    `;
    featured1List.append(div);
    let itemSale = div.querySelector(".featured-1-item .item-sale");
    if(item.sale == false)
        itemSale.style.display = "none";
}
// ======================== GET DATA FROM JSON =================================
async function getDataItems(){
    let data = await fetch("/package.json");
    let parseData = await data.json();
    return await parseData;
}
function handleButtonLoad(currentPage, pageCount){
    let buttonLoadMore = document.querySelector('.all-product .featured-load-more');
    if(buttonLoadMore == undefined)
        buttonLoadMore = document.querySelector(".all-product .load-more-filter")
    if(currentPage >= pageCount)
    {
        buttonLoadMore.style.display = "none";
    }
    else
    {
        buttonLoadMore.style.display = "block";

    }
}

function addItems(pageIndex, increase, limited, items, pageCount){
    handleButtonLoad(pageIndex, pageCount);
    let startIndex = (pageIndex - 1) * increase;
    let endIndex = pageIndex * increase > limited ? limited : pageIndex * increase;
    for(let i = startIndex; i < endIndex; i++)
    {
        createItems(items[i]);
    }
}


// 
function categoriesFilter(){
    let lowValue = document.getElementById("lower");
    let highValue = document.getElementById("upper");
    
    let priceLowInner = document.querySelector(".filter-price .price-low"); 
    let priceHighInner = document.querySelector(".filter-price .price-high"); 
    
    let lowValueInt = parseInt(lowValue.value);
    let highValueInt = parseInt(highValue.value);

    priceLowInner.innerHTML = lowValueInt;
    priceHighInner.innerHTML = highValueInt;

    lowValue.addEventListener("input", function(){
        lowValueInt = parseInt(lowValue.value);
        highValueInt = parseInt(highValue.value);
        if(lowValueInt > highValueInt - 10)
        {
            highValue.value = lowValueInt + 10;
            if(highValueInt == highValue.max){
                lowValue.value = parseInt(highValue.max) - 10;
            }
        }
        // console.log(lowValue.value);
        priceLowInner.innerHTML = parseInt(lowValue.value);
        priceHighInner.innerHTML = parseInt(highValue.value);
    })
    
   highValue.addEventListener("input", function(){
        lowValueInt = parseInt(lowValue.value);
        highValueInt = parseInt(highValue.value);
        if(highValueInt < lowValueInt + 10)
        {
            lowValue.value = highValueInt - 10;
            if(lowValueInt == lowValue.min){
                highValue.value = parseInt(lowValue.min) + 10;
            }
        }
        // console.log(highValue.value);
        priceLowInner.innerHTML = parseInt(lowValue.value);
        priceHighInner.innerHTML = parseInt(highValue.value);
    })
}
function getDataAraay(items){
    let featuredList = document.querySelector(".featured-1-list");
    let buttonLoadMore = document.querySelector('.all-product .featured-load-more');
    if(buttonLoadMore == undefined)
        return;
    let countTotal = document.querySelector(".all-product .countTotal");
    let limited = items.length;
    let increase = 6;
    let pageCount = Math.ceil(limited / increase);
    let pageIndex = 1;
    console.log("Thuc hien getDataArray lan 1");
    addItems(pageIndex, increase, limited, items, pageCount);
    pageIndex++;
    buttonLoadMore.addEventListener("click", function(){
        console.log(`thuc hien get array ${pageIndex}`);
        addItems(pageIndex, increase, limited, items, pageCount);
        pageIndex++;
    })
}

function getDataAraay2(items){
    let featuredList = document.querySelector(".featured-1-list");
    let buttonLoadMore = document.querySelector('.all-product .load-more-filter ');
    if(buttonLoadMore == undefined)
        return;
    let countTotal = document.querySelector(".all-product .countTotal");
    let limited = items.length;
    let increase = 6;
    let pageCount = Math.ceil(limited / increase);
    let pageIndex = 1;
    console.log("Thuc hien getDataArray lan 1");
    addItems(pageIndex, increase, limited, items, pageCount);
    pageIndex++;
    buttonLoadMore.addEventListener("click", function(){
        console.log(`thuc hien get array ${pageIndex}`);
        addItems(pageIndex, increase, limited, items, pageCount);
        pageIndex++;
    })
}

function startFilter(lowValue, highValue, checkedRadioType, items){
    let arrayItems = [];
    let arrayItemsTemp = [];
    if(checkedRadioType == "all")
    {
        items.forEach(key=>{
            if(key.price >= lowValue && key.price <= highValue){
                arrayItems.push(key);
                arrayItemsTemp.push(key);
            }
        })
    }else {
        items.forEach(key=>{
            if(key.price >= lowValue && key.price <= highValue && key.type == checkedRadioType){
                arrayItems.push(key);
                arrayItemsTemp.push(key);
            }
        })
    }
    console.log("List items sau khi filter");
    console.log(arrayItems);
    removeChildFeatured();
    let featured1 = document.querySelector(".featured-1");
    let div = document.createElement("div");
    div.className = "featured-1-list";
    featured1.append(div);
    // arrayItems.forEach(key=>{
    //     createItems(key);
    // })  
    let btnLoad = document.querySelector(".all-product .featured-load-more")
    if(btnLoad != undefined)
        removeCreateBtnLoad();
    getDataAraay2(arrayItems);   
    // let buttonLoadMore = document.querySelector('.all-product .featured-load-more');
    // buttonLoadMore.style.display = "none";
    sortCartItems(arrayItems);
    dafaultSort(arrayItemsTemp);
    // getDataAraay(arrayItems); // cap nhat list sau khi filter
}

function filterRender(items) {
    let btnFilter = document.querySelector(".open-filter .submit-filter");
    btnFilter.addEventListener("click", function(){
        let lowValue = document.getElementById("lower");
        let highValue = document.getElementById("upper");
        let btnRadio = document.querySelectorAll(".radio-row input");
        let checkedRadioType;
        lowValue = parseInt(lowValue.value);
        highValue = parseInt(highValue.value);
        btnRadio.forEach(key=>{
            if(key.hasAttribute("checked"))
                checkedRadioType = key.value;
        })
        if(checkedRadioType == undefined)
            checkedRadioType = "all";
        startFilter(lowValue, highValue, checkedRadioType, items); // thuc hien filter items phu hop voi value tren
        let overlay = document.querySelector(".open-filter .overlay");
        overlay.style.display = 'none';
    })
}


getTypeRadio();

function getTypeRadio(){
    let btnRadio = document.querySelectorAll(".radio-row input");
    btnRadio.forEach(index=>{
        index.addEventListener("click", function(){
            btnRadio.forEach(key=>{
                if(key.hasAttribute("checked"))
                    key.removeAttribute("checked");
            })
            index.setAttribute("checked", "checked");
        })
    })
}

//


getDataItems()
    .then(data=>{
        console.log("Get data success 2");
        // khi click vao default sort   
        dafaultSort(data);
        return data;
    })
    .then((data)=>{
        console.log("thuc hien filter");
        categoriesFilter(); //  Cap gia tri hien tai cua filter
        filterRender(data); // Thuc hien filter khi lick vao submit
    })
getDataItems()
    .then(data=>{
        console.log("Thuc hien render list khi load");
        getDataAraay(data);     
        return data;
    })
    .then(data=>{
        console.log("Get data success");
        sortCartItems(data);
    });
// 
openBtnFilter();
function openBtnFilter(){
    let btnFilter = document.querySelector(".all-product .featured-1-filter");
    let openFilter = document.querySelector(".open-filter .overlay");
    let closeFilter = document.querySelector(".open-filter .close-filter");
    btnFilter.addEventListener("click", ()=>{
        openFilter.style.display = "block";
    })
    closeFilter.addEventListener("click", ()=>{
        openFilter.style.display = "none";

    })
}


function removeCreateBtnLoad(){
    let container = document.querySelector(".all-product .container");
    let btnLoad = document.querySelector(".all-product .featured-load-more");
    container.removeChild(btnLoad);
    let div = document.createElement("div");
    div.className = "load-more-filter";
    let span = document.createElement("span");
    span.innerHTML = "load more";
    div.append(span);
    container.append(div);
}
