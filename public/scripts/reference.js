// GET nativo do navegador, gerando uma Promise
// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

// Promise pode ser tratada com uso de then(), criando uma função interna
// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) { console.log(res)});

// Transforma para JSON, gerando outra Promise
// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) { console.log(res.json())});

// Retornando uma Promise, é possível trata-la 
// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) { return res.json()}).then(function(data) { console.log(data)});