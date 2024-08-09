/////////////////////FINAL_ORDER PAGE////////////////////////////

//////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function(){

//Retrieving cart data from session storage
const cartSum = JSON.parse(sessionStorage.getItem("CART")) || [];

const orderSummaryProducts = document.querySelector(".summary_products");

let totalPrice = 0; 

//Function for Order summary in final order page
function orderSummary(){
    orderSummaryProducts.innerHTML = '';

    cartSum.forEach ((item) =>{
        const itemTotalPrice = item.price * item.numberOfUnits;
        totalPrice +=itemTotalPrice;

        orderSummaryProducts.innerHTML +=
        `<tr>
            <td>${item.name}<br><span>${item.quantity}/${item.numberOfUnits}</span></td>
            <td>Rs.${itemTotalPrice.toFixed(2)}</td>
        </tr>`;
    });
    orderSummaryProducts.innerHTML += 
    `<tfoot>
        <tr>
            <td>Sub Total:</td>
            <td>Rs.${(totalPrice).toFixed(2)}</td>
        </tr>
        <tr>
            <td>Delivery Charge:</td>
            <td>Rs.200.00</td>
        </tr>
        <tr>
            <td>Total:</td>
            <td>Rs.${(totalPrice + 200).toFixed(2)}</td>
        </tr>
    </tfoot>`;
    

}
orderSummary();
});

//Rating Function

const stars = document.querySelectorAll(".rating i");
const ratingDescription = document.querySelector(".rate-dis");
console.log(stars);

ratingDescription.innerHTML="";

stars.forEach((star, index1) =>{
    //Adding an event listener that runs a function when clicked.
    star.addEventListener("click", () =>{
        console.log(index1);
        console.log(star);

        stars.forEach((star,index2) => {
            console.log(index2)
            if (index1 >= index2) {
                star.classList.add("fa-solid");
            };
        });
        //Updating the rating description based on the clicked star's index.
        if (index1 == 0){
            ratingDescription.innerHTML = `<span>Very Poor <i class="fa-regular fa-face-frown"></i> - The experience was extremely unsatisfactory. There were major issues or disappointments. </span>`;
        }else if (index1 ==1){
            ratingDescription.innerHTML = `<span>Poor <i class="fa-regular fa-face-frown-open"></i> - The experience was lacking, with several problems or unmet expectations. </span>`;
        }else if (index1 == 2){
            ratingDescription.innerHTML = `<span>Average <i class="fa-regular fa-face-meh"></i> - The experience was acceptable but had noticeable areas for improvement. </span>`;
        }else if (index1 == 3){
            ratingDescription.innerHTML = `<span>Good <i class="fa-regular fa-face-smile"></i> - The experience was quite positive, with minor issues or areas for improvement </span>`;
        }else{
            ratingDescription.innerHTML = `<span>Excellent <i class="fa-regular fa-face-laugh-beam"></i> - The experience was outstanding with no significant issues. </span>`;
        }

    });


});




//Confirmation message with delivery date
const finalForm = document.getElementById('checkout');

finalForm.addEventListener('submit',(event) => {

    event.preventDefault();
    
    const deliveryDate = new Date();
    
    console.log(deliveryDate);  //This shows the real time in console.
    
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    document.getElementById('confirmation-message').innerHTML= `Thank you for ordering from our store!! Your order will be delivered by ${deliveryDate}`

});


