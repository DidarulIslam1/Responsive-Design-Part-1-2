// step-03:-
let dataSet;
// step-01:-
fetch('../data.json')
    .then((res) => res.json())
    .then((data) => {
        dataSet = data;
        displayData(data)
    });

// ---------------------------------------
// uses of async await:-
// const phoneData = async () => {
//     const res = await fetch('../data.json');
//     const data = await res.json();
//     displayData(data);
// }
// phoneData();
// ---------------------------------------
// step-02:-
function displayData(data) {
    const cartContainer = document.getElementById('homepage-content');
    data.forEach(element => {
        // console.log(element);
        const { id, img, price, name } = element;
        const divContainer = document.createElement('div');
        divContainer.classList.add('card', 'bg-base-100', 'shadow-2xl');
        divContainer.innerHTML = `
                    <div class="">
                        <figure>
                            <img src="${img}" class="rounded-lg w-3/4" alt="" />
                        </figure>
                    </div>
                    <div class="card-body">
                        <div class="flex justify-between">
                            <h2 class="card-title">${name}</h2>
                            <div class="flex flex-row gap-1 items-start justify-end w-40 ">
                                <span><i
                                        class="fa-solid fa-heart border p-[2px] cursor-pointer text-lg hover:text-red-600 hover:bg-blue-500 hover:p-1 hover:m-1 duration-500 rounded"></i></span>
                                <span><i
                                        class="fa-solid fa-square-minus border p-[2px] cursor-pointer text-lg hover:text-red-600 hover:bg-blue-500 hover:p-1 hover:m-1 rounded duration-500"></i></span>
                            </div>
                        </div>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <h1 class="text-2xl">Price: $${price}</h1>
                        <div class="mt-2 flex justify-between">
                            <div class="">
                             <label 
                            onclick="handleModal('${id}')" 
                            for="my-modal-3" 
                            class="btn btn-outline hover:text-green-600 duration-500 w-full mx-auto flex justify-center items-center"
                             >
                            <i class="fa-solid fa-circle-info"></i>Details
                             </label>
                            </div>
                            <div class="">
                             <label 
                            onclick="handleBuyNow('${id}')" 
                            class="btn btn-outline hover:text-red-600 duration-500 w-full mx-auto flex justify-center items-center"
                             >
                            <i class="fa-solid fa-basket-shopping"></i>BUY NOW
                             </label>
                            </div>
                        </div>
                    </div>
        `;
        cartContainer.appendChild(divContainer);
    });
}

// step-03: set modal function:-
function handleModal(id) {
    // console.log(dataSet);
    const product = dataSet.find((item) => item.id === id);
    const { img, price, modalName, details } = product;

    const modalContainer = document.getElementById('modal-info');
    modalContainer.innerHTML = `
                <div class="rounded-xl w-[70%]">
                    <img src="${img}" class="" alt="">
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-500"><span class="text-slate-700"></span >${modalName}</h1>
                    <div class="flex flex-col gap-[2px]">
                        <h1 class="text-2xl font-bold text-slate-700">Features</h1>
                        <p class="border-2 font-semibold"><span>Released: </span>${details.date}</p>
                        <p class="border-2 font-semibold"><span>OS: </span>${details.os}</p>
                        <p class="border-2 font-semibold"><span>Camera: </span>${details.camera}</p>
                        <p class="border-2 font-semibold"><span>RAM: </span>${details.ram}</p>
                        <p class="border-2 font-semibold"><span>Battery: </span>${details.battery}</p>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-500"><span class="text-slate-700">Price: </span>$${price}</h1>
                </div>
    `;
}
// -------------------------------------------------------------------
// side drawer:-
let count = 0;
let newPrice = 0;
let tax = 0;
function handleBuyNow(id) {
    // count ++;
    count = count + 1
    const product = dataSet.find((item) => item.id === id);
    const { id: productId, name, price, img } = product;
    cart.push(product);
    newPrice = newPrice + price;
    // 10% tax:-
    tax = newPrice * 0.1;

    const localData = getLocalStorage('cart');
    setLocalStorage('cart', [...localData, product]);

    const cartItemsContainer = document.getElementById('cart-items-container');
    const div = document.createElement('div');
    div.classList.add(
        "rounded-lg",
        "border-[1px]",
        "p-2",
        "flex",
        "flex-row",
        "gap-2",
        "justify-between",
        "items-center",
        "bg-slate-500",
        "font-cart",
        "cart-item-style"
    );
    div.innerHTML = `
        <img src="${img}" class="w-[20%] h-full p-[1px] rounded-lg" alt="">
        <div class="flex flex-col text-white">
            <p class="text-lg text-center font-medium rounded bg-slate-700
            p-[2px] mb-[2px]">${name}</p>
            <p class="text-center font-bold rounded bg-slate-700 text-red-200"><span class="text-red-600 text-lg">$</span>${price}</p>
        </div>
            <input class="w-10 border border-black px-[2px] rounded text-lg text-black" type="number" min="0" value="1">
        <i onclick="handleRemove('${productId}')" class="fa-solid fa-trash text-base cursor-pointer border border-black bg-red-200 text-black hover:bg-red-500 p-[2px] m-[2px] rounded"></i>
    `;
    cartItemsContainer.appendChild(div);
    document.getElementById('badge-count').innerText = count;
    document.getElementById('product-count').innerText = count;
    document.getElementById('price-count').innerText = newPrice.toFixed(2);
    document.getElementById('tax-count').innerText = tax.toFixed(2);
    document.getElementById('total-price').innerText = (newPrice + tax).toFixed(2);
};
// ---------------------------------------------
// clear cart:-
function clearCart() {
    document.getElementById('cart-items-container').innerHTML = "";
    document.getElementById('badge-count').innerText = 0;
    count = 0;
}
// -----------------------------------------------
// product individually delete from from cart:-
let cart = [];
function handleRemove(id) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = "";
    count = count - 1;
    const product = cart.filter((item) => item.id !== id);
    cart = product;
    product.forEach((data) => {
        const { id: productID, name, price, img } = data;
        newPrice = newPrice - price;
        tax = newPrice * 0.1;
        const div = document.createElement('div');
        div.classList.add(
            "rounded-lg",
            "border-[1px]",
            "p-2",
            "flex",
            "flex-row",
            "gap-2",
            "justify-between",
            "items-center",
            "bg-slate-500",
            "font-cart",
            "cart-item-style"
        );
        div.innerHTML = `
        <img src="${img}" class="w-[20%] h-full p-[1px] rounded-lg" alt="">
        <div class="flex flex-col text-white">
            <p class="text-lg text-center font-medium rounded bg-slate-700
            p-[2px] mb-[2px]">${name}</p>
            <p class="text-center font-bold rounded bg-slate-700 text-red-200"><span class="text-red-600 text-lg">$</span>${price}</p>
        </div>
            <input class="w-10 border border-black px-[2px] rounded text-lg text-black" type="number" min="0" value="1">
        <i onclick="handleRemove('${productID}')" class="fa-solid fa-trash text-base cursor-pointer border border-black bg-red-200 text-black hover:bg-red-500 p-[2px] m-[2px] rounded"></i>
    `;
        cartItemsContainer.appendChild(div);
    })
    document.getElementById('badge-count').innerText = "";
    document.getElementById('badge-count').innerText = count;

    document.getElementById('product-count').innerText = "";
    document.getElementById('product-count').innerText = count;

    document.getElementById('price-count').innerText = "";
    document.getElementById('price-count').innerText = newPrice.toFixed(2);

    document.getElementById('tax-count').innerText = "";
    document.getElementById('tax-count').innerText = tax.toFixed(2);

    document.getElementById('total-price').innerText = "";
    document.getElementById('total-price').innerText = (newPrice + tax).toFixed(2);
};
// -----------------------------------------------

// This function for local storage:-
function displayPrevData() {
    const localData = getLocalStorage('cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = "";
    count = localData.length || 0;
}