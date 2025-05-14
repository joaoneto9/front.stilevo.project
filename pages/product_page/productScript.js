import { getProductVariation } from "../../routes/get_products_variation/getProductVariation.js";

function showProduct(variation) {
    document.getElementById('produtoImagem').src = variation.imageUrl;
    document.getElementById('produtoImagem').alt = variation.product.name + " " + variation.color;
    document.getElementById('produtoNome').textContent = variation.product.name + " " + variation.color;
    document.getElementById('produtoDescricao').textContent = variation.product.description;
    document.getElementById('produtoPreco').textContent = `R$ ${variation.product.price.toFixed(2)}`;
}

async function getProductById(id) {
    const product = await getProductVariation(id);
    return product;
}

window.addEventListener('DOMContentLoaded', async () => {
    // Captura os parâmetros da URL
    const params = new URLSearchParams(window.location.search);

    // Pega o valor do parâmetro 'id'
    const id = params.get('id');    

    showProduct(await getProductById(id));
})
