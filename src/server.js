// express: back-end server -> npm install express
// nodemon: monitor de alterações, que reinicia o server em caso de alterações
// -> npm install nodemon -D (-D = somente em desenvolvimento)
// -> "start": "nodemon src/server.js" para monitorar alterações
const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db.js")

// Configurar pasta pública (permite acesso do html aos arquivos .js e .css da pasta public)
server.use(express.static("public"))

// Habilita o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando o nunjucks: Template engine para utilizar funções dentro do HTML
// Substitui {{ }}
// Full MVC -> Front-end e Back-end na mesma aplicação
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { // Pasta onde estão os arquivos htmls
    express: server,
    noCache: true
})

// Configurar rotas
server.get("/", (req, res) => {
    // return res.sendFile(__dirname + "/views/index.html") // Sem nunjucks, chamar sendFile() e apontar direto pro arquivo
    return res.render("index.html", { title: "Um Título"}) // Com nunjucks, chamar render() e apontar apenas o nome do arquivo
})

server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    // Não é possível utilizar arrow function, pois é utilizado o this
    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total})
    })
})

// Inicia o server
server.listen(3000)