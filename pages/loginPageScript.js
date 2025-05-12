import { login } from "../routes/authenticathion/loginUser.js";

const toggleBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "🙈" : "👁️";
});

const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede envio padrão

    const email = document.getElementById("email").value;
    const password = passwordInput.value

    login(email, password)
        .then(token => {
        console.log("token: " + token);
        })
})

