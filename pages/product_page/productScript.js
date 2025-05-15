import { getProductVariation } from "../../routes/get_products_variation/getProductVariation.js";
import { insertProductAtCart } from "../../routes/cart/insertProductVariationAtCart.js";

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
    let tamanho = "";

    // Captura os parâmetros da URL
    const params = new URLSearchParams(window.location.search);

    // Pega o valor do parâmetro 'id'
    const id = params.get('id');    

    showProduct(await getProductById(id));

    document.getElementById("adicionarCarrinho").addEventListener('click', async () => {
        if (tamanho == "") {
            Swal.fire({
                icon: 'error',            
                title: 'escolha o tamanho do produto.',
                text: 'Verifique os dados e tente novamente.',
                timer: 1000,
                showConfirmButton: false
            });
            return;
        }

        const newProduct = await insertProductAtCart(id, tamanho);

        Swal.fire({
            icon: 'success',
            title: 'Produto ' + newProduct.productVariation.product.name + ' - ' + newProduct.productVariation.color + ' adicionado ao carrinho',
            text: 'Acesse o carrinho e veja o Produto.',
        });

        setTimeout(() => {
            window.location.href = "../carrinho_page/carrinhoPage.html";
        }, 1000) // 2 segundos de espera

    });

    document.querySelector(".btn-tamanho").addEventListener('click', () => {
        const opcoes = document.querySelector(".opcoes-tamanho");
        opcoes.style.display = opcoes.style.display === "none" ? "block" : "none";
    })


    document.querySelectorAll(".tamanho").forEach(button => {
        button.addEventListener('click', () => {
            tamanho = button.textContent;
            document.querySelector(".opcoes-tamanho").style.display = "none";
        })
    })
})
