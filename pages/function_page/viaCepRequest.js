export function viaCepRequest(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`) 
    .then(response => {
        return response.data; // retorna o Objeto da resposata da viaCep
    })
    .catch(error => {
        console.log("ERRO: ", error);
        throw error;
    })
}