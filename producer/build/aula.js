let shoppingCart = [];

function addItemToCar(item){
    shoppingCart.push(item);
}

function removeItemFromCart(item){
   
        shoppingCart = shoppingCart.filter(texto => texto !== item);

}
function viewCart(){
    if (shoppingCart.length == 0){
        console.log("Itens in your shopping cart: ");
       
    }
    else{
        for(let i = 0; i < shoppingCart.length;i++){
            console.log(`${i + 1} - ${shoppingCart[i]}`);
        }
    }
}
function clearCart(){
    shoppingCart.length = 0;
    console.log("Yout shopping cart has been cleared ")
}
addItemToCar("Tenis")
addItemToCar("blusa")
addItemToCar("jeans")
addItemToCar("calsinha")

clearCart()
