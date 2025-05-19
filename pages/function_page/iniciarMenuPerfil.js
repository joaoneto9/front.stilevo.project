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
}

// Exporta para uso global
window.abrirMenuPerfil = abrirMenuPerfil;