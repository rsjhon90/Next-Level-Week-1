const express = require("express") // importa library express
const server = express()

//configurar pasta pública
server.use(express.static("public"))

//configurar caminhos da aplicação
//página inicial
//req: Request/Requisição/Solicitação
//res: Response/Resposta
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})
//ligar o servidor
server.listen(3000)