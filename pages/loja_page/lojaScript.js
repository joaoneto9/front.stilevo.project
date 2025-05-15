import { getProducts } from "../../routes/get_products_variation/getProductsVariation.js";

window.addEventListener('DOMContentLoaded', async () => {
    showProducts(await getProducts());
});

function showProducts(products) {

    const produtos = document.querySelector(".produtos");

    products.forEach(variation => {
        const div = document.createElement("div");
        div.classList.add("produto");

        const a = document.createElement("a");
        a.setAttribute('href', "../product_page/productPage.html?id=" + variation.id); 

        div.addEventListener('click', () => {
            a.click();
        })

        const img = document.createElement("img");
        img.setAttribute('alt', 'Produto ' + variation.id);
        img.setAttribute('src', variation.product.imageUrl); // exemplo de URL, ajuste conforme seu objeto

        const h3 = document.createElement("h3");
        h3.textContent = variation.product.name + " - " + variation.color;

        const p = document.createElement("p");
        p.textContent = "R$ " + variation.product.price.toFixed(2);

        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(a);

        div.addEventListener('click', () => {
            a.click();
        })

        produtos.appendChild(div);
    });
}