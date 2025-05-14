import { login } from "../../routes/authenticathion/loginUser.js";
import { setToken, setUser } from "../user_config/user.js";

const toggleBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "🙈" : "👁️";
});

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede envio padrão

    const email = document.getElementById("email").value;
    const password = passwordInput.value

    try {
        const data = await login(email, password);
        setToken(data.token);
        setUser(data.user);

        setTimeout(() => {
            window.location.href = "../loja_page/lojaPage.html";
        }, 1000) // 1 segundo de espera
        
    } catch(error) {
        console.log("error", error);
        // Alerta de erro
        Swal.fire({
            icon: 'error',            
            title: 'email ou senha invalida',
            text: 'Verifique os dados e tente novamente.'
        });
    }
})

