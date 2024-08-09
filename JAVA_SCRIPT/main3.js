////////////////////PRODUCT PAGES AND HOME PAGE////////////////////////////////// 

//Add to wishlist

//DOMContentLoaded ensures the DOM uis fully loaded before running the script.

document.addEventListener('DOMContentLoaded', ()=>{
    const hearts = document.querySelectorAll(".off_like-icon i");


function changeHeart(event){

    const heart = event.target;  //refers to specific element that was clicked.

    if (heart.classList.contains('fa-regular')){
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
        alert('You liked a product!');
    }else {
        heart.classList.remove('fa-solid');
        heart.classList.add('fa-regular');
    }

}
hearts.forEach(heart => {
    heart.addEventListener('click',changeHeart);

});

});






