import { login } from "../../routes/authenticathion/loginUser.js";
import { registerUser } from "../../routes/authenticathion/registerUser.js";
import { sendEmail } from "../../routes/email/sendEmail.js";
import { getToken, setToken, setUser } from "../user_config/user.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',            
            title: 'senha nao confirmada',
            text: 'Verifique os dados e tente novamente.'
        });
        return;
    }

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value; 

    try {
        await registerUser(name, email, password, "USER"); // registra o usuario

        const user = await login(email, password);

        setUser(user.user);
        setToken(user.token)

        await sendEmail("Bem-vindo à nossa loja! - STILEVO CLUB", 
            "<h2 style='color:#4CAF50;'>Bem-vindo à Stilevo Store!" + 
            "</h2><p>Olá, seu cadastro foi concluído com sucesso." + 
            "</p><p>Aproveite nossas ofertas exclusivas e confira nossa loja:</p>" + 
            "<a href='https://stilevo-store.com' style='display:inline-block; padding:10px 20px; background-color:#4CAF50; color:#fff; text-decoration:none; border-radius:5px;'>Visitar Loja</a>"+
            "<p style='font-size:12px; color:#777; margin-top:20px;'>Se você não solicitou este cadastro, apenas ignore este e-mail.</p>");

        Swal.fire({
            icon: 'success',
            title: 'Registro concluído!',
            text: 'Usuário cadastrado com sucesso.',
            timer: 2000,
            showConfirmButton: false
        });

        setTimeout(() => {
            window.location.href = "../loja_page/lojaPage.html";
        }, 2000) // 2 segundos de espera

    } catch (error) {
        console.log("error", error);
        // Alerta de erro
        Swal.fire({
            icon: 'error',            
            title: 'email ja tem cadastro',
            text: 'Verifique os dados e tente novamente.'
        });
    } 
})