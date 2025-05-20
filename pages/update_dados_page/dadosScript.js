import { updateParcialDataUser } from "../../routes/user/updateDados.js";
import { viaCepRequest } from "../function_page/viaCepRequest.js";
import { getUserEmail, getUserEndereco, getUserName, setToken, setUser } from "../user_config/user.js";

const inputCep = document.getElementById("cep");
const atributosEndereco = document.getElementById("atributosEndereco");

let enderecoToUpdate = null;

inputCep.addEventListener('input', () => {
    let valor = inputCep.value.replace(/\D/g, ''); // remove tudo que não for dígito

    if (valor.length > 5) {
        valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
    }

    inputCep.value = valor;
});

inputCep.addEventListener("blur", async () => {
    atributosEndereco.innerHTML = '';
    atributosEndereco.style.color = 'black';
    // limpa ess campo

    const valor = inputCep.value.trim();

    if (valor == "")
        return;

    try {
        const enderecoViaCep = await viaCepRequest(valor);

        if (enderecoViaCep.erro) {
            throw new error("cep invalido"); 
        }

        const endereco = {
            cep: enderecoViaCep.cep,
            logradouro: enderecoViaCep.logradouro,
            complemento: enderecoViaCep.complemento,
            bairro: enderecoViaCep.bairro,
            localidade: enderecoViaCep.localidade,
            uf: enderecoViaCep.uf,
            numero: null,
            pontoReferencia: null
        }

        showEndereco(endereco);

        enderecoToUpdate = endereco;
        return;
        
    } catch (error) {
        console.log("ERRO: " + error);
        atributosEndereco.innerHTML = `
            <small>CEP invalido, tente novamente.</small>
            <br></br>
        `;
        atributosEndereco.style.color = 'red';

        enderecoToUpdate = null;
        return;
    }

});

const form = document.getElementById("updateForm");

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim() || null;
    const email = document.getElementById("email").value.trim() || null;
    const password = document.getElementById("password").value.trim() || null;

    if (password === null) {
        Swal.fire({
            icon: 'error',
            title: 'senha da conta e necessaria para atualizar os dados',
            text: 'Verifique os dados e tente novamente.'
        });
        return;
    }

    if (enderecoToUpdate !== null) {
        // valores possiveis de mudanca
        enderecoToUpdate.logradouro = document.getElementById("logradouro").value.trim();
        enderecoToUpdate.complemento = document.getElementById("complemento").value.trim();
        enderecoToUpdate.numero = document.getElementById("numero").value.trim();
        enderecoToUpdate.pontoReferencia = document.getElementById("pontoReferencia").value.trim();
    }

    const updateUser = {
        name: name,
        email: email,
        password: password,
        endereco: enderecoToUpdate
    }

    try {
        const data = await updateParcialDataUser(updateUser);
        console.log(data);
        setUser(data.user); //reloga para atualizar os dados corretamente
        setToken(data.token); // manda um novo token

        Swal.fire({
            icon: 'success',
            title: 'Dados Atualizados!',
            text: 'Usuário atualizado com sucesso.',
            timer: 2000,
            showConfirmButton: false
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'senha incorreta, tente novamente',
            text: 'Verifique os dados e tente novamente.'
        });
        return;
    }
});

function showEndereco(endereco) {

    Object.entries(endereco).forEach(([atributo, valor]) => {
        if (atributo === "cep")
            return; // pula pro próximo

        // tenta achar o input existente pelo id
        let inputExistente = document.getElementById(atributo);

        if (inputExistente) {
            // só atualiza o valor se já existe
            inputExistente.value = valor !== null ? valor : "";
            return; // troca o valor e passa pro proximo ja 
        }

        // cria o grupo do zero se não existe
        const div = document.createElement("div");
        div.className = "form-group";

        const label = document.createElement("label");
        label.setAttribute("for", atributo);
        label.innerText = atributo.charAt(0).toUpperCase() + atributo.slice(1) + ":";

        const input = document.createElement("input");

        input.type = "text";
        input.id = atributo;
        input.name = atributo;
        input.value = valor !== null ? valor : "";

        if (atributo === "numero") {
            input.placeholder = 'numero da residencia (ex: 540)';
            input.type = "number"; // provavelmente era pra ser número
        }

        if (atributo === "uf") {
            input.maxLength = 2;
            input.readOnly = true;
        }

        if (atributo === "localidade" || atributo === "bairro") {
            input.readOnly = true;
        }

        div.appendChild(label);
        div.appendChild(input);
        atributosEndereco.appendChild(div);
    })
}

    
window.addEventListener('DOMContentLoaded', () => {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");

        if (getUserEmail() == undefined && getUserEmail() == undefined) {
            return;
        }

        emailInput.value = getUserEmail();
        nameInput.value = getUserName()

        if (getUserEndereco() == undefined) {
            return;
        }

        inputCep.value = getUserEndereco().cep;
        showEndereco(getUserEndereco());
});