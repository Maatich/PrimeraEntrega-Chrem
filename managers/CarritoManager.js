import fs from 'fs';

const path = './files/carrito.json';

export default class CarritoManager {

    getCarritos = async() =>{

        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const carritos = JSON.parse(data);
            return carritos;
        }else {
            return [];
        }
    }
    getCarrito = async(id) =>{
        const carritos = await this.getCarritos();
        
        const carrito = carritos.filter((carrito)=>{
            return carrito.id == id
        })

        return carrito

    }
    eliminarCarritos = async(id) =>{
        
        const carritos = await this.getCarritos();
        const carritoIndex = carritos.findIndex((carritos)=>{
            return carritos.id == id
        })
        carritos.splice(carritoIndex,1)

        try {
            await fs.promises.writeFile(path, JSON.stringify(carritos,null,'\t'))
            return 'Carrito eliminado'
        } catch (error) {
             return error   
        }

        
    }

    async addCart() {
        try {
            const carritos = await this.getCarritos()
            let carrito = { products: [] }

            if (carritos.length === 0) {
                carrito.id = 1
            } else {
                carrito.id = carritos[carritos.length - 1].id + 1
            }

            carritos.push(carrito)
            await fs.promises.writeFile(path, JSON.stringify(carritos, null, '\t'))
            return ({ msg: 'Carrito se ha añadido: ', carrito })
        } catch (error) {
            console.log(`Error al guardar el carrito ${error}`)
        }
    }

    async addProdInCart(idCart, idProd) {
        try {
            const carritos = await this.getCarritos()
            const findCart = carritos.find((c) => c.id == idCart)

            let prodInC = findCart.products
            const pIndex = prodInC.findIndex((p) => p.id === idCart)

            if (pIndex !== -1) {
                prodInC[pIndex].quantity = prodInC[pIndex].quantity + 1

            } else {
                let prod = { id: idProd, quantity: 1 }
                prodInC.push(prod)
            }
            await fs.promises.writeFile(path, JSON.stringify(carritos, null, '\t'))
            return findCart

        } catch (error) {
            console.log(error)
        }
    }


}