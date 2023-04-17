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

router.delete('/:id', async (req,res)=>{

    const id = req.params.id;

    const msg = await carritoManager.eliminarCarritos(id);
    res.send(msg)
    
})

export default router