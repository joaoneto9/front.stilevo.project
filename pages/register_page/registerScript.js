import { registerUser } from "../../routes/authenticathion/registerUser.js";

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
        const user = await registerUser(name, email, password, "USER")

        const newUser = {
            id: user.id,
            username: user.name,
            email: user.email,
        };

        console.log("USUARIO CADASTRADO COM SUCESSO: ", newUser); // usuario registardo; 

        Swal.fire({
            icon: 'success',
            title: 'Registro concluído!',
            text: 'Usuário cadastrado com sucesso.',
            timer: 2000,
            showConfirmButton: false
        });

        setTimeout(() => {
            window.location.href = "../login_page/loginPage.html";
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