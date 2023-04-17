
import express from 'express';
import productsRouter from './routes/products.router.js'
import carritoRouter from './routes/carrito.router.js'
import __dirname from './utils.js'

const PORT = 8080;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))


app.listen(PORT, ()=>{
    //console.log(`Servidor funcionando en el puerto ${ PORT }`)
    console.log('Servidor funcionando en el puerto: ' + PORT)
})



app.use('/api/products',productsRouter);
app.use('/api/carritos',carritoRouter);
