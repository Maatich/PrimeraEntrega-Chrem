import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import { joiValidator } from "../utils/validator.js";
import CarritoManager from "../managers/CarritoManager.js"

const router = Router()


const productManager = new ProductManager();

router.post('/', async (req,res)=>{
    let nuevoCarro = await CarritoManager.agregarCarrito();
    res.send(nuevoCarro)
})

router.get('/:id', async (req,res)=>{

    const id = req.params.id;
    const productId = await productManager.getProduct(id);
    res.send(productId)


})


router.put('/', async (req,res)=>{
    try {
        const { id } = req.params
        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        const product = await joiValidator.product.validateAsync({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })
        const productUpdate = await db.getProducts(id, product)

        res.status(200).send({ msg: 'Producto actualizado', productUpdate })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req,res)=>{

    const {tittle, description, prince, thumbnail, code, stock, category} = req.body

    if(!tittle || !description, !prince, !thumbnail, !code, !stock, !category){
        res.send('faltan datos')
        return
    }

    const producto = {
        tittle, description, prince, thumbnail, code, stock, status:true, category
    }

    const msg = await productManager.createProducto(producto);
    res.send(msg);

})

router.delete('/:id', async (req,res)=>{

    const id = req.params.id;

    const msg = await productManager.eliminarProducto(id);
    res.send(msg)
    
})

export default router