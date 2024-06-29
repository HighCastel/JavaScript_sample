const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];
//AGREGAR PRODUCTO CON SU DESCRIPCION (NOMBRE DE PRODUCTO, DESCRIPCION, PRECIO Y CANTIDAD)
function aggProducto() {
    const selectedOption = priceElement.options[priceElement.selectedIndex];
    const selectedProduct = selectedOption.getAttribute('data-descripcion');
    const price = parseInt(priceElement.value);
    const number = parseInt(numberElement.value);

    if (!selectedProduct || !price || !number) {
        window.alert("seleccione un producto y una cantidad.");
        return;
    }

    let purchase = {
        product: selectedProduct,
        price: price,
        number: number,
    };

    const existingPurchaseIndex = purchases.findIndex((item) => item.product === purchase.product);

    if (existingPurchaseIndex === -1) {
        purchases.push(purchase);
    } else {
        purchases[existingPurchaseIndex].number += purchase.number;
    }
// VENTANA EMERGENTE CON DESCRIPCION DE (AGG PRODUCTO PRECIO Y CANTIDAD)
    function alerta() {
        return purchases.map(purchase => {
            return `${purchase.product}, ${purchase.price}¥. ${purchase.number} productos`;
        }).join("\n");
    }

    window.alert(`${alerta()}\n Subtotal ${subtotal()}¥`);

    priceElement.value = "0";
    numberElement.value = "";
}
//CALCULO DE SUBTOTAL
function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.price * purchase.number;
    }, 0);
}
//CALCULO DE TARIFA DE ENVIO
function calculoDeTarifa(sum) {
    if (sum >= 3000) {
        return 0;
    } else if (sum >= 2000) {
        return 250;
    } else {
        return 500;
    }
}
//CALCULO TOTAL + VENTANA EMERGENTE CON DESCRIPCION DE COMPRA
function calcularPedido() {
    const sum = subtotal();
    const postage = calculoDeTarifa(sum);
    const total = sum + postage;

    const details = purchases.map(purchase =>
        `${purchase.product}, ${purchase.price}¥. ${purchase.number} productos`).join('\n');

    window.alert(`${details}\n\nEl subtotal es de ${sum}¥. \nLa tarifa de envio es de ${postage}¥. \nEl total es de ${total}¥.`);

    purchases = [];
    priceElement.value = "0";
    numberElement.value = "";
}
