import { Router } from 'express';
import CarritoManager from '../managers/CarritoManager.js';

const router = Router()


const carritoManager = new CarritoManager();

router.get('/', async (req,res)=>{
    const carritos = await carritoManager.getCarritos();
    res.send(carritos)
})

router.get('/:id', async (req,res)=>{
    const id = req.params.id;

    const carrito = await carritoManager.getCarrito(id);
    res.send({carrito})

})
router.post('/', async (req, res) => {
    let nuevoCarro = await carritoManager.addCart();
    res.send({nuevoCarro});
});

router.delete('/:id', async (req,res)=>{

    const id = req.params.id;

    const msg = await carritoManager.eliminarCarritos(id);
    res.send(msg)
    
})
router.post('/:id/product/:pid', async (req,res) => {
    try{
        const idCart = req.params.id
        const idProd = req.params.pid
        const resultado = await carritoManager.addProdInCart(idCart, idProd)

        res.send(resultado);
    }catch (error){
        res.status(400).send({error: "not found"})
    }
})

export default router