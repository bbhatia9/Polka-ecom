

// add item from localstorage

 function fetchSavedItems(){
    let cartItemsOnPage = document.getElementsByClassName("cart-item");

    // cartItems;
    while(cartItemsOnPage.length>0){
        cartItemsOnPage[0].remove();
    }

    console.log("fetched");
    let cartItemsFromLocal=JSON.parse(localStorage.getItem("cartItems"));

    if(cartItemsFromLocal){
    for(let i=0;i<cartItemsFromLocal.length; i++){
        item=cartItemsFromLocal[i];
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
        cart.insertBefore(cartItem,total);
        
    }
    showtotals();
    }
};
fetchSavedItems();

let cartItems=[];

//show cart
(function(){
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");

    cartInfo.addEventListener("click",function(){
        cart.classList.toggle("show-cart");
    });
})();

//clear cart
(function(){
    const clearCart = document.getElementById("clear-cart");
    clearCart.addEventListener("click",function(){
        
        let cartItemsOnPage = document.getElementsByClassName("cart-item");
        console.log(cartItems);
        // cartItems;
        while(cartItemsOnPage.length>0){
            cartItemsOnPage[0].remove();
        }
        cartItems=[];
        localStorage.setItem("cartItems",JSON.stringify(cartItems));

        document.getElementById('cart-total').textContent = 0;
        // document.querySelector('.item-total').textContent = 0;
        // document.getElementById('item-count').textContent = 0;
        showtotals();
    });
})();



//add item to cart

(function(){
    const cartBtn = document.querySelectorAll('.store-item-icon');

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

        cartItems.push(item);
        console.log(cartItems);
        localStorage.setItem("cartItems",JSON.stringify(cartItems));
        
        cart.insertBefore(cartItem,total);
        alert("item added to cart");
        showtotals();
        deleteItemFromCart();
        }
        });
    });
})();




//delete item from cart
function deleteItemFromCart(){
    const delItem = document.querySelectorAll('.cart-item-remove');
    console.log(delItem);
    delItem.forEach(function(btn){
        btn.addEventListener("click",function(event){
            
            const dItem= event.target.parentElement.parentElement;
            let itemtobe = dItem.childNodes;
            console.log(itemtobe[2].childNodes[1].textContent);
            let nameofitemdel=itemtobe[2].childNodes[1].textContent;


            let cartItemsFromLocal=JSON.parse(localStorage.getItem("cartItems"));
            for(let i=0;i<cartItemsFromLocal.length;i++){
                // console.log(cartItemsFromLocal[i]);
                if(cartItemsFromLocal[i].name == nameofitemdel){
                    
                    cartItemsFromLocal.splice(i,1);
                    console.log(cartItemsFromLocal);
                }
            }
            localStorage.setItem("cartItems",JSON.stringify(cartItemsFromLocal));
            fetchSavedItems();
        });
    });
};

deleteItemFromCart();


//show totals
function showtotals(){
    const total=[];
    const items=document.querySelectorAll(".cart-item-price");

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


//to get filter buttons working
(function(){

    const buttons = document.getElementsByClassName('filter-btn');
    const storeItems= document.querySelectorAll('.store-item');
    //console.log(buttons);
    Array.from(buttons).forEach((button)=> {
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
    })
})();

//wire up search filter box
(function(){

    const searchBox = document.querySelector('#search-item')
    const storeItems = document.querySelectorAll('.store-item')

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

})();