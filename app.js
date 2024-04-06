let cartItems=[];
const StoreItems =[{
    name:"sweet item1",
    img:"img/sweets-1.jpeg",
    price:5
},
{
    name:"sweet item2",
    img:"img/sweets-2.jpeg",
    price:10
},
{
    name:"sweet item3",
    img:"img/sweets-3.jpeg",
    price:15
},
{
    name:"cupcake Item1",
    img:"img/cupcake-1.jpeg",
    price:5
},
{
    name:"cupcake Item2",
    img:"img/cupcake-2.jpeg",
    price:10
},
{
    name:"cupcake Item3",
    img:"img/cupcake-3.jpeg",
    price:15
},
{
    name:"cake Item1",
    img:"img/cake-1.jpeg",
    price:5
},
{
    name:"cake Item2",
    img:"img/cake-2.jpeg",
    price:10
},
{
    name:"cake Item3",
    img:"img/cake-3.jpeg",
    price:15
},
{
    name:"dougnut Item1",
    img:"img/doughnut-1.jpeg",
    price:5

},
{
    name:"dougnut Item2",
    img:"img/doughnut-2.jpeg",
    price:10
},
{
    name:"dougnut Item3",
    img:"img/doughnut-3.jpeg",
    price:15
}
];

function renderStoreItems(){
    let StoreEl = document.getElementById("store-items");
    let ItemsToBeRendered=""; 

if(StoreEl){
    for(let i=0;i<StoreItems.length;i++){
        
        item=StoreItems[i];
        
        ItemsToBeRendered += `<div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item cakes" data-item="cakes">
        <div class="card ">
          <div class="img-container">
            <img src="${item.img}" class="card-img-top store-img" alt="">
            <span class="store-item-icon">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </div>
          <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
              <h5 id="store-item-name">${item.name}</h5>
              <h5 class="store-item-value">₹ <strong id="store-item-price" class="font-weight-bold">${item.price}</strong></h5>
            </div>
          </div>
          </div>
        </div>`
    }

    StoreEl.innerHTML+=ItemsToBeRendered;
}



//     let singleitem=`<div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item cakes" data-item="cakes">
//     <div class="card ">
//       <div class="img-container">
//         <img src="${item.img}" class="card-img-top store-img" alt="">
//         <span class="store-item-icon">
//           <i class="fas fa-shopping-cart"></i>
//         </span>
//       </div>
//       <div class="card-body">
//         <div class="card-text d-flex justify-content-between text-capitalize">
//           <h5 id="store-item-name">${item.name}</h5>
//           <h5 class="store-item-value">₹ <strong id="store-item-price" class="font-weight-bold">${item.price}</strong></h5>

//         </div>
//       </div>


//     </div>
    
//   </div>`;


}
renderStoreItems();


//render items on checkout page
const renderoncheckout=function(){
    cartItems=JSON.parse(localStorage.getItem("cartItems"));

    let checkoutItems = document.getElementById("checkout-items");
    console.log(checkoutItems);
    if(checkoutItems){
            
        let str="";
        for(let i=0;i<cartItems.length; i++){
            let checkoutImg=cartItems[i].img;
            checkoutImg=checkoutImg.substring(9);
            checkoutImg="img/"+checkoutImg;
            console.log(checkoutImg);
            str+=`<li> <img src="${checkoutImg}" style="width:10%;height:auto;"> ${cartItems[i].name} , price: ${cartItems[i].price}</li>`;
        }
        
        checkoutItems.innerHTML=str;
    }
};

renderoncheckout();


// place order and generate orderId
(function placeOrder(){
    let OrderBtn = document.getElementById("placeOrder");

    let totalsEl = document.getElementById("totalprice");
    if(totalsEl){
        cartItems=JSON.parse(localStorage.getItem("cartItems"));
        let totPrice=0;
        for(let i=0;i<cartItems.length;i++){
            totPrice+=Number(cartItems[i].price);
        }

        totalsEl.textContent+=totPrice;
    }

    if(OrderBtn){
        OrderBtn.addEventListener("click",function(){
            
            let OrderId=Math.floor(Math.random()*10000);
            
            alert("Order Placed",OrderId);
            cartItems=[];
            localStorage.setItem("cartItems",JSON.stringify(cartItems));
            // renderoncheckout();
            window.location.href = "index.html";
        })
    }
})();


// add item from localstorage

function fetchSavedItems(){

    cartItems=JSON.parse(localStorage.getItem("cartItems"));
    const cart=document.getElementById("cart");

    if(cart){

        for(let i=0;i<cartItems.length; i++){
            item=cartItems[i];
            const cartItem=document.createElement('div');
            cartItem.classList.add('cart-item','d-flex','justify-content-between','text-capitalize','my-3');

            cartItem.innerHTML=`<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="cart-item-text">

            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
            <span>₹</span>
            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
            <i class="fas fa-trash"></i>
            </a>
            </div>`;
            //select cart
            
            const total=document.querySelector(".cart-total-container");
            cart.insertBefore(cartItem,total);
            showtotals();
        }
    }
}

fetchSavedItems();


//show cart
(function(){
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");
    if(cartInfo){
        cartInfo.addEventListener("click",function(){
            cart.classList.toggle("show-cart");
        });
}
})();

//clear cart
(function(){
    const clearCart = document.getElementById("clear-cart");
    if(clearCart)
    {   clearCart.addEventListener("click",function(){
            let cartItems = document.getElementsByClassName("cart-item");
            console.log(cartItems);
            cartItems;
            while(cartItems.length>0){
                cartItems[0].remove();
            }
            cartItems=[];
            localStorage.setItem("cartItems",JSON.stringify(cartItems));

            document.getElementById('cart-total').textContent = 0;
            // document.querySelector('.item-total').textContent = 0;
            // document.getElementById('item-count').textContent = 0;
            showtotals();
        });
    }
})();

//delete item from cart
(function(){
    const delItem = document.querySelectorAll('.cart-item-remove');
    if(delItem){
        delItem.forEach(function(btn){
            btn.addEventListener("click",function(event){
                const dItem= event.target.parentElement.parentElement;
                console.log(dItem);
            });
        });
    }
})();

//add item to cart

(function(){
    const cartBtn = document.querySelectorAll('.store-item-icon');

    if(cartBtn){
        cartBtn.forEach(function(btn){
            btn.addEventListener("click",function(event){
                //console.log(event.target);

            if(event.target.parentElement.classList.contains("store-item-icon"))
            {
                let fullPath = event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf('img')+3;
                let partPath = fullPath.slice(pos);
                
                const item={};

                item.img=`img-cart${partPath}`;
                
                let name= event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name=name;
                let price= event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                let finalPrice=price.slice(1).trim();
                item.price=finalPrice;

                //console.log(item);
                const cartItem=document.createElement('div');
                cartItem.classList.add('cart-item','d-flex','justify-content-between','text-capitalize','my-3');

                cartItem.innerHTML=`<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="cart-item-text">

                <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                <span>₹</span>
                <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                <i class="fas fa-trash"></i>
                </a>
            </div>`;
            //select cart
            const cart=document.getElementById("cart");
            const total=document.querySelector(".cart-total-container");

            cartItems.push(item)
            localStorage.setItem("cartItems",JSON.stringify(cartItems));
            
            cart.insertBefore(cartItem,total);
            alert("item added to cart");
            showtotals();
            }
            });
        });
    }
})();



//show totals
function showtotals(){
    const total=[];
    const items=document.querySelectorAll(".cart-item-price");
    if(items){
        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        });
        const totalMoney=total.reduce(function(total,item){
            total+=item;
            return total;
        },0);
        const finalMoney = totalMoney.toFixed(2);
        
        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
    }
}


//to get filter buttons working
(function(){

    const buttons = document.getElementsByClassName('filter-btn');
    const storeItems= document.querySelectorAll('.store-item');
    //console.log(buttons);
   if(buttons){ Array.from(buttons).forEach((button)=> {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;
            
            storeItems.forEach((item)=> {
                if (filter === 'all'){
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filter)){
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            })
        })
    })}
})();

//wire up search filter box
(function(){

    const searchBox = document.querySelector('#search-item')
    const storeItems = document.querySelectorAll('.store-item')
    if(searchBox){
        searchBox.addEventListener('keyup', (e) => {
        
            const searchFilter = e.target.value.toLowerCase().trim()
            //display only items that contain filter input

            storeItems.forEach((item) => {
                if (item.textContent.includes(searchFilter)){
                    item.style.display = 'block'
                } else {
                    item.style.display = 'none'
                }
            })
        })
    }
})();