


const mongoose = require('mongoose')

const User = mongoose.model('user', {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telefone: {
        type: Array,
        default: []
    },
    endereco: {
    type: Array,
    default: []
}
})


const Pedido = mongoose.model('pedido', {
    cliente_id: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    produto_id: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    item_id: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    item_comprado: {
        type: Array,
        default: []
    }
})


const Produto = mongoose.model('produto', {
    name: {
        type: String
    },
    description: {
        type: String
    },
    preco: {
        type: Number
    },
    categories: {
        type: Array,
        default: []
    },
    destaque: {
        type: String
    },
})

module.exports ={ Pedido, Produto, User}

