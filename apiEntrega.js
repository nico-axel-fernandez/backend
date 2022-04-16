// >> Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
// Para el caso de que un producto no exista, se devolverá el objeto:
// { error : 'producto no encontrado' }
// Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
// Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
// Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
// El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
// Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

const express = require('express')
const fs = require('fs')
const app = express()
const { Router } = express
const router = Router()

app.use('/', express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
app.use('/api', router)

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Init on localhost:${server.address().port}`)
})

server.on("error", error => console.log (`El error es ${error}`))

const Contenedor = require('./contenedor.js').Contenedor
let contenedor = new Contenedor('./productos.json');

const saveProductos = async () => {
    await contenedor.save('Prod1', 100, 'https://1');
    await contenedor.save('Prod2', 200, 'https://2');
    await contenedor.save('Prod3', 300, 'https://3');
}
saveProductos()


// GET '/api/productos' -> devuelve todos los productos.

router.get('/productos', (req,res) => {
    contenedor.getAll().then(data => {
        res.json(data)
    })
});

// GET '/api/productos/:id' -> devuelve un producto según su id.

router.get('/productos/:id', (req,res) => {
    contenedor.getById(parseInt(req.params.id)).then(producto => {
        res.json(producto)
    })
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

router.post('/productos/', (req,res) => {
    const body = req.body
    contenedor.save(body.title, body.price, body.thumbnail).then(producto => {
        res.json(producto)
    })

});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

router.put('/productos/:id', (req,res) => {
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
                res.json({ error : 'producto no encontrado' })
            }  
    })

});

// DELETE '/api/productos/:id' -> elimina un producto según su id.

router.delete('/productos/:id', (req,res) => {
    
    producto = data.find(producto => producto.id === parseInt(req.params.id))
    
    contenedor.deleteById(parseInt(req.params.id)).then(producto => {
        res.send(`Tu producto se ha eliminado: ${producto}`)
    })

});