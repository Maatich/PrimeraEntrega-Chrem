import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import { joiValidator } from "../utils.js";


const router = Router()





const productManager = new ProductManager();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    res.send(products)
})



router.get('/:id', async (req,res)=>{

    const id = req.params.id;
    const productId = await productManager.getProduct(id);
    res.send(productId)

})


router.put('/:id', async (req,res)=>{
    /*try {
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
        const productUpdate = await productManager.getProducts(id, product)

        res.status(200).send({ msg: 'Producto actualizado', productUpdate })
    } catch (error) {
        console.log(error)
    }*/
    

    //Le hice unos cambios al put porque me traia ese error  [Error [ValidationError]: "title" is required], al metodo modificarProducto solo mofique lo que ves  .
    const id = req.params.id;
    const updateProduct = req.body
    res.send(await productManager.modificarProducto(id, updateProduct));
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

    const msg = await productManager.crearProducto(producto);
    res.send(msg);

})

router.delete('/:id', async (req,res)=>{

    const id = req.params.id;

    const msg = await productManager.eliminarProducto(id);
    res.send(msg)
    
})

export default router