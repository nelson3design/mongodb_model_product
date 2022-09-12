

const express = require('express')

const router = express.Router()

const produtoContreollers = require('./controllers/produtoControllers')


router.get('/',(req, res)=>{
    res.send('salut le monde!')
})

router.post('/add_user', produtoContreollers.create)

router.post('/add_pedido', produtoContreollers.createPedido)

router.post('/add_produto', produtoContreollers.createProduto)

router.get('/pedidos', produtoContreollers.allPedidos)


router.get('/produtos', produtoContreollers.allProduct)

router.get('/produto/:id', produtoContreollers.product)

router.get('/users', produtoContreollers.allUser)
router.get('/user/:id', produtoContreollers.user)


module.exports = router

