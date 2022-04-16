// >> Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:

const express = require('express')
const fs = require('fs')

const Contenedor = require('./contenedor.js').Contenedor
let contenedor = new Contenedor('./productos.json');

const saveProductos = async () => {
    await contenedor.save('Prod1', 100, 'https://1');
    await contenedor.save('Prod2', 200, 'https://2');
    await contenedor.save('Prod3', 300, 'https://3');
}
saveProductos()

const app = express()
app.use(express.urlencoded({extended:false}));

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Init on localhost:${server.address().port}`)
})

server.on("error", error => console.log (`El error es ${error}`))

// GET '/api/productos' -> devuelve todos los productos.

app.get('/api/productos', (req,res) => {
    contenedor.getAll().then(data => {
        res.json(data)
    })
});

// GET '/api/productos/:id' -> devuelve un producto según su id.

app.get('/api/productos/:id', (req,res) => {
    contenedor.getById(req.params.id).then(producto => {
        res.json(producto)
    })
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

app.post('/api/productos/', (req,res) => {
    const body = req.body
    contenedor.save(body.nombre, body.precio, body.url).then(producto => {
        res.json(producto)
    })

});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

app.put('/api/productos/:id', (req,res) => {
    const body = req.body

    contenedor.getAll().then(data => {
        console.log(data)
        producto = data.find(producto => producto.id === parseInt(req.params.id))
        Object.assign(producto, body)
        try {
            fs.writeFileSync(contenedor.fileName, JSON.stringify(data))
            res.json(data);
            }
            catch(err) {
                res.json(err)
            }  
    })

});

// DELETE '/api/productos/:id' -> elimina un producto según su id.

app.delete('/api/productos/:id', (req,res) => {
    
    producto = data.find(producto => producto.id === req.params.id)
    
    contenedor.deleteById(req.params.id).then(producto => {
        res.send(`Tu producto se ha eliminado: ${producto}`)
    })

});