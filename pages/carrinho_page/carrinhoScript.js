import { getCart } from "../../routes/cart/getCartUser.js";
import { decreseQuantity } from "../../routes/cart/decreaseProductAtCart.js";
import { increaseQuantity } from "../../routes/cart/increaseProductAtCart.js";
import { postCartItemToOrder } from "../../routes/order/postCartItemAtOrder.js";

window.addEventListener('DOMContentLoaded', async () => {
    showProducts(await getCart());
});

function showProducts(cartItens) {

    const produtos = document.querySelector(".produtos");

    if (cartItens.length == 0) {
        produtos.innerHTML = `
        <div class="carrinho-vazio">
            <p>Seu carrinho está vazio</p>
            <a href="../loja_page/lojaPage.html" class="btn-voltar">Ver produtos</a>
        </div>
    `;
        return;
    }

    cartItens.forEach(cartItem => {
        const div = document.createElement("div");
        div.classList.add("produto");

        const a = document.createElement("a");
        a.setAttribute('href', "../product_page/productPage.html?id=" + cartItem.productVariation.id);

        // Clicando no card inteiro, navega para a página do produto
        div.addEventListener('click', () => {
            a.click();
        });

        const img = document.createElement("img");
        img.setAttribute('alt', 'Produto ' + cartItem.productVariation.id);
        img.setAttribute('src', cartItem.productVariation.imageUrl);

        const h3 = document.createElement("h3");
        h3.textContent = cartItem.productVariation.product.name + " - " + cartItem.productVariation.color + " - " + cartItem.size;

        const p = document.createElement("p");
        p.textContent = "R$ " + cartItem.productVariation.product.price.toFixed(2);

        // Div para controle de quantidade
        const quantidadeDiv = document.createElement("div");
        quantidadeDiv.classList.add("quantidade");

        const quantidadeSpan = document.createElement("span");
        quantidadeSpan.textContent = cartItem.quantity;
        quantidadeSpan.style.margin = "0 10px";

        const btnDiminuir = document.createElement("button");

        btnDiminuir.textContent = "–";
        btnDiminuir.addEventListener('click', async (e) => {
            e.stopPropagation(); // Impede que o clique vá para o <div> e acione o <a>
            const updateCartItem = await decreseQuantity(cartItem.id); 

            if (updateCartItem.quantity == 0) {
                location.reload();
            }

            quantidadeSpan.textContent = updateCartItem.quantity;
        });

        const btnAumentar = document.createElement("button");

        btnAumentar.textContent = "+";
        btnAumentar.addEventListener('click', async (e) => {
            e.stopPropagation();
            const updateCartItem = await increaseQuantity(cartItem.id);
            quantidadeSpan.textContent = updateCartItem.quantity;
            // Aqui também você pode atualizar o back-end
        });

        const divAddToOrder = document.createElement("div");
        const btnAddToOrder = document.createElement("button");

        btnAddToOrder.addEventListener('click', async (e) => {
            e.stopPropagation();

            try {
                const addItemResponse = await postCartItemToOrder(orderId, cartItem.id);
                
                Swal.fire({
                    icon: 'success',
                    title: 'item adicionado ao pedido',
                    text: 'Acesse o seu pedido e veja o Produto.',
                });

            } catch(error) {

                Swal.fire({
                    icon: 'error',            
                    title: 'erro ao adicioanar o item ao pedido.',
                    text: 'tente novamente.',
                    timer: 1000,
                    showConfirmButton: false
                });

            }
        })

        btnAddToOrder.innerText = "ADICIONAR AO PEDIDO";

        divAddToOrder.appendChild(btnAddToOrder);
        
        quantidadeDiv.appendChild(btnDiminuir);
        quantidadeDiv.appendChild(quantidadeSpan);
        quantidadeDiv.appendChild(btnAumentar);

        // Monta o card
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(quantidadeDiv);
        div.appendChild(a); // opcional, pois o clique já redireciona
        div.appendChild(divAddToOrder);

        produtos.appendChild(div);
    });
}