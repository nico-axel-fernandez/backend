// >> Consigna:
// Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
// Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
// Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
// Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

const express = require('express')
const Contenedor = require('./contenedor.js').Contenedor
let contenedor = new Contenedor('./productos.json');

const saveProductos = async () => {
    await contenedor.save('Prod1', 100, 'https://1');
    await contenedor.save('Prod2', 200, 'https://2');
    await contenedor.save('Prod3', 300, 'https://3');
}
saveProductos()

const app = express()

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Init on localhost:${server.address().port}`)
})

server.on("error", error => console.log (`El error es ${error}`))

app.get('/productos', (req,res) => {
    contenedor.getAll().then(data => {
        res.json(data)
    })
});

app.get('/productosRandom', (req,res) => {
    contenedor.getAll().then(data => {
        let prodRand = data[Math.floor(Math.random() * data.length)]
        res.json(prodRand)
    })
});