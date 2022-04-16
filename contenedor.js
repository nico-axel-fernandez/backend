/* Implementar programa que contenga una clase llamada Contenedor que reciba el
 nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo. */

const fs = require('fs');

class Contenedor {
    
    constructor (fileName) {
        this.fileName = fileName;
    };

    async save(nombre,precio,url) {

        let producto = {title: nombre, price: precio, thumbnail: url, id: null}
        let data
        let id
        
        try {
            data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data);
            id = producto.id = data[data.length - 1].id + 1
        
        } catch (error){
            console.log('Archivo sin crear');
            id = producto.id = 1;
            data = []

        }

        data.push(producto)
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data))
            return id;
        }
        catch(err) {
            console.log(err)
        }
    };
    async getById(id){
        let data
        try {
            data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data);
            producto = data.find(producto => producto.id === id)
            return producto
        
        } catch (error){
            console.log(error)
            return null

        }
    };
    async deleteById(id){
        /**  @type {Array} */
        let data
        let index

        try {
            data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data);
            index = data.findIndex(producto => producto.id === id)
            if(index < 0)
                {console.log('Producto inexistente')}
            else {
            data.splice(index, 1)
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            }
        } catch (error){
            console.log(error)

        }

    };
    async getAll(){
        /**  @type {Array} */
        let data

        try {
            data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data);
            return data
        } catch (error){
            console.log(error)
            return null
        }
    };
    async deleteAll(){
        let data = []
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
        } catch (error){
            console.log(error)
        }
    };
}

module.exports = {Contenedor}