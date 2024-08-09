//////////////////////ORDER PAGE/////////////////////////////

//1
//Selecting elements
const productSection = document.querySelector(".product-section");
const section = document.querySelector(".section-head");

const cartProducts = document.querySelector(".cart-products");
const subTotal = document.querySelector(".subtotal");
const removeProduct = document.querySelector(".cancel");

const btnAddToFav = document.getElementById("add-fav");
const btnApplyFav = document.getElementById("apply-fav");
const btnClearCart = document.getElementById("clear_cart");

//2
//function to render products
function renderProducts(){
    
    /*products.forEach((product)=>{   
        productSection.innerHTML += 
            `<div class="odd">
                <img src="${product.image}" alt=${product.name}><span>${product.name}</span><p>${product.price.toFixed(2)}</p>
                <button class="cart" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-shopping"></i></button>
            </div>`;
    });*/

    console.log(products); //check the structure of prducts

    //Array for categories of Products array
    const categories = ['Vegetables', 'Dairy Products', 'Skincare Products','Fruits','Meat & Seafood','Baking & Cooking Ingredients'];

    let sectionHTML = '';
    //let productSectionHTML = '';

    categories.forEach(category => {
        
        //creating category heading HTML
        sectionHTML += `<h2>${category}</h2>`;

        //creating product items HTML
        if (products[category]){
            let productSectionHTML = '';
            products[category].forEach(product => {       //forEach() calls a function for each array element.
                console.log(`Product: ${product.name}, Price: ${product.price},`);
                productSectionHTML += 
                `<div class="odd">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                    <p>Rs.${product.price.toFixed(2)}</p>
                    <button class="cart" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>`;
            });

            //Each products in relavent category
            sectionHTML+= `<div class= "product-section">${productSectionHTML}</div>`
        }else {
            console.log(`Category ${category} does not exist in products data.`);
        }

    });

    //set HTML content
    section.innerHTML = sectionHTML;

    console.log(sectionHTML);

            ////check
        /*console.log(`processing category: ${category}`);

        const categories = ['vegetables', 'dairyProducts', 'skincareProducts','fruits','meatSeafood','bakingCookingIngr'];
        
        if (products[category]){
            section.innerHTML += 
            `<h2>${category}</h2>`;
            console.log(`Found products for category: ${category}`);

            products[category].forEach(product => {
                console.log(`products: ${product.name},Price: ${product.price}`);
                productSection.innerHTML +=
                `<div class="odd">
                    <img src="${product.image}" alt=${product.name}><span>${product.name}</span><p>${product.price.toFixed(2)}</p>
                    <button class="cart" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>`;
            });

        }*/

}

//3
renderProducts();

//4
//Cart array
//let cart = [];   //this creates a new array.

//16
let cart = JSON.parse(localStorage.getItem("CART")) || [];   //  '||' this means 'Logical OR operator'
updateCart();

//5
//Add to cart function
function addToCart(id){

    //7
    //checking if product already exist in cart    
    if(cart.some((item) => item.id === id)){       //some() method returns true (and stops) if the function returns true for one of the array elements.
        alert("Product already in cart!");

    }else{
        //6
        console.log(id); //checking whether this function working or not.
        //const item = products.find((product) => product.id === id);  //find() returns the value of the first element in an array that pass a test.
        let item = null;
        for (const category in products) {
            item = products[category].find((product)=> product.id === id);
            if (item) break; 
        }

        console.log(item) //This will show the details of selected product in console.

        //Adding selected product 'item' to the cart.
        //cart.push(item); //All the selected items will move to the cart.
        
        //8 
        //push() adds new elements to the end of an array, and returns the new length.
        cart.push({
            ...item,     //(...) spread operator => this allows quickly copy all or part of an existing array or object into another array or object.
            numberOfUnits: 1
        })
        console.log(cart);
    }

    //9
    //Updating cart by filling the products which were selected.
    updateCart();    //As changing the cart array we need to call updateCart(); function.

}

//10
//Function for updating the cart
function updateCart(){
    renderCartItems();
    renderSubtotal();

    //15
    //save cart to the local storage.
    localStorage.setItem("CART",JSON.stringify(cart));

}

//11
//Function for rendering cart items
function renderCartItems(){
    cartProducts.innerHTML=""; //clear cart element
    cart.forEach((item) =>{
        cartProducts.innerHTML +=
        `<tr>
            <td class="product-name"><img src="${item.image}" alt="${item.name}"><span>${item.name}</span></td>
            <td>Rs.${item.price.toFixed(2)}<span>/${item.quantity}</span></td>
            <td><span class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</span><span>${item.numberOfUnits}</span><span class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</span></td>
            <td>${(item.price*item.numberOfUnits).toFixed(2)}</td>
            <td class="action"><button class="cancel" onclick="removeItem(${item.id})"><i class="fa-solid fa-xmark"></i></button></td>
        </tr>`;
            //<td><span class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</span><input type="number" value="0" min="${item.numberOfUnits}"><span class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</span></td>
            //<td><input type="number" value="0" min="${item.numberOfUnits}"></td>
    });

}

//13
//Function for making the total as number. (To prevent from NaN output (Not a Number))
function formatCurrency(amount){
    return amount.toFixed(2);
}

//16
//Calculate and render the subtotal.
function renderSubtotal(){
    let totalPrice = 0;
    let totalItem = 0;
    
    cart.forEach((item) => {
        totalPrice += item.price*item.numberOfUnits;
        totalItem += item.numberOfUnits;
    });

    //subTotal.innerText = formatCurrency(totalPrice);
    /*subTotal.innerHTML =`<tr>
                            <td colspan="3">SUB TOTAL : </td>
                            <td>${formatCurrency(totalPrice)}</td>
                            <td></td>
                        </tr>`;*/

    if (totalPrice <=0) {
        subTotal.innerHTML=`<tr>
                                <td colspan="5">Your cart is empty!!</td>
                            </tr>`;
    }else{
        subTotal.innerHTML =`<tr>
                                <td colspan="3">SUB TOTAL : </td>
                                <td>${formatCurrency(totalPrice)}</td>
                                <td></td>
                            </tr>`;
    }

    document.querySelector(".orders span").textContent = totalItem;

}

//12
//Change Number of units for a product in Cart.
function changeNumberOfUnits(unit, id){
    //map() Creates a new array with the results of calling a function for each array element.
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if(item.id === id){
            if (unit === "minus" && numberOfUnits >1){     //  '&&' this means 'Logical AND operator.'
                numberOfUnits-- ;
            }else if (unit === "plus"){
                numberOfUnits++ ;
            }
        }
        //return item;
        return {
            ...item,   //(...) spread operator => this allows quickly copy all or part of an existing array or object into another array or object.
            numberOfUnits,
        };

    });

    updateCart();  //As changing the cart array we need to call updateCart(); function.

}

//14
//Removing item from cart
function removeItem(id){

    cart = cart.filter((item)=> item.id != id);  //filter() method creates a new array filled with elements that pass a test provided by a function. this method does not execute the function for empty elements. 

    updateCart();  //As changing the cart array we need to call updateCart(); function.
}

//17
//Save cart to the local storage by clicking the 'add to favourite' button

//adding event listener to buttons (add to favourite and apply favourite)
btnAddToFav.addEventListener("click",addToFavourite);
btnApplyFav.addEventListener("click",applyFavourites);
btnClearCart.addEventListener("click",clearCart);


btnAddToFav.disabled=false;
btnClearCart.disabled =false;
//btnApplyFav.disabled=true;

function addToFavourite(){
    //localStorage.setItem("CART",JSON.stringify(cart));
    const cartPro = JSON.parse(localStorage.getItem("CART")) || [];
    console.log('Cart before adding to favourites:',cartPro);
    localStorage.setItem("FAVOURITES", JSON.stringify(cartPro));

    btnApplyFav.disabled=false;
    alert("Products added to favourites.");

}

function applyFavourites(){
    //cartProducts.innerHTML = localStorage.getItem("CART", JSON.stringify(cart));
    const favourites = JSON.parse(localStorage.getItem("FAVOURITES")) || [];
    console.log('Favourites retrieved:', favourites);

    if (favourites.length > 0){
        cart = favourites; //directly setting cart to favourites. As apply favourites doesn't work when applyed to favourites.
        localStorage.setItem("CART",JSON.stringify(cart));
        
        updateCart();
        alert("Your favourite products added to your cart.");

    } else{
        alert("No favourites to apply.")
    }

}

function clearCart(){
    //localStorage.clear();  //This is not suitable. This clears all local storage data, not just the cart. Also favourites. 
    localStorage.removeItem("CART");  //This clear only the cart data.
    cart = []; //clear cart array


    cartProducts.innerHTML = '';
    subTotal.innerHTML=
        `<tr>
            <td colspan="5">Your cart is empty!!</td>
        </tr>`;

    btnAddToFav.disabled = true;
    btnApplyFav.disabled = false;

}


///////////////////////////////////////////////////////////////


function proceedToCheckout(){

    //Check if the cart is empty
    if (cart && cart.length >0){
        //Save the cart to session storage
        sessionStorage.setItem("CART", JSON.stringify(cart));
        console.log('Cart saved to session storage', sessionStorage.getItem("CART"));

        //Redirect to the final order page
        window.location.href = 'final_order.html';
    } 
    else{
        //Empty cart alert.
        alert("Your cart is empty. Please add items in your cart.")
    }
}

document.getElementById('buy_now').addEventListener('click',function(){
    proceedToCheckout();
});