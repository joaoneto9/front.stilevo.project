import { updateParcialDataUser } from "../../routes/user/updateDados.js";
import { viaCepRequest } from "../function_page/viaCepRequest.js";
import { setUser } from "../user_config/user.js";

const inputCep = document.getElementById("cep");

let enderecoToUpdate = null;

inputCep.addEventListener("blur", async () => {
    const valor = inputCep.value.trim();

    if (valor == "")
        return;

    try {
        const enderecoViaCep = await viaCepRequest(valor);

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

        const atributosEndereco = document.getElementById("atributosEndereco");

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
                input.placeholder = '540';
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

            enderecoToUpdate = endereco;
            return;
        });
    } catch (error) {
        console.log("ERRO: " + error);
        atributosEndereco.innerHTML = '';
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
    const passwordCheck = document.getElementById("passwordCheck").value.trim() || null;

    if (password !== passwordCheck) {
        Swal.fire({
            icon: 'error',
            title: 'senha nao confirmada',
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

    const newUserConfig = await updateParcialDataUser(updateUser);
    setUser(newUserConfig);

    Swal.fire({
        icon: 'success',
        title: 'Dados Atualizados!',
        text: 'Usuário atualizado com sucesso.',
        timer: 2000,
        showConfirmButton: false
    });

});