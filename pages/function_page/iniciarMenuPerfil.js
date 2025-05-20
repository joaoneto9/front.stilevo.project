import { getUserName, getUserEmail } from "../user_config/user.js"

export function abrirMenuPerfil() {
    const menu = document.getElementById("menu-perfil-lateral");
    const body = document.body;

    const sair = document.getElementById("Sair");

    sair.addEventListener('click', () => {
        menu.classList.remove("ativo");
        body.classList.remove("menu-aberto");
        return;
    })

    menu.classList.add("ativo");
    body.classList.add("menu-aberto");

    if (getUserName() == undefined || getUserEmail() == undefined) 
        return;

    const dados = document.getElementById("dados-usuario");
    dados.innerHTML = `
        <p>Name: ${getUserName()}</p>
        <p>Email: ${getUserEmail()}</p>
    `;
}

// Exporta para uso global
window.abrirMenuPerfil = abrirMenuPerfil;