

const { Produto, User, Pedido } = require('../models/produtoModels')

module.exports={

   


    // criar os usuarios add-user
    async create(req, res){

        const { name, email,telefone, endereco } = req.body
        if (!name) {
            res.status(422).json({ msg: 'o nome é obrigatorio' })
        }

        if (!email) {
            res.status(422).json({ msg: 'o email é obrigatorio' })
        }

        const userExist = await User.findOne({ email: email })


        if (userExist) {
            res.status(422).json({ msg: 'email já existe, por favor use outro email' })
        }

        try {

            const user = await User.create({ name, email,telefone, endereco })
            res.status(200).json({ msg: 'user cadastrado com sucesso!' })

        } catch (error) {

            console.log(error)

        }


    },


 async createPedido(req, res) {

     const { cliente_id, produto_id, item_id, status,item_comprado } = req.body
       

        try {

            const pedido = await Pedido.create({ cliente_id, produto_id, item_id, status, item_comprado })
            res.status(200).json({ msg: 'compra realizado com sucesso!' })

        } catch (error) {

            console.log(error)

        }


    },

// criar a produto
async createProduto(req, res){

        const { name, description, preco, categories, destaque } = req.body
        if (!name) {
            res.status(422).json({ msg: 'o nome é obrigatorio' })
        }


        const produtoExist = await Produto.findOne({ name: name })


       if (produtoExist) {
            res.status(422).json({ msg: 'produto já existe, por favor use outro nome' })
        }

        try {

            const produto = await Produto.create({ name, description, preco, categories, destaque })
            res.status(200).json({ msg: 'produto cadastrada com sucesso!' })

        } catch (error) {

            console.log(error)

        }


    },

    async allProduct(req, res) {
        try {
            const produtos = await Produto.find();

            res.status(200).json(produtos);

        } catch (error) {

            res.status(400).send(error);
        }
    },

    async product(req, res) {
        try {
            const id = req.params.id

            const produto = await Produto.findOne({ _id:  id  })

            if (!produto) {
                return res.status(400).json('produto não encontrado!')
            }

            res.status(200).json(produto);
        } catch (error) {

            res.status(400).send(error);
        }
    },

    async allUser(req, res) {
        try {
            const users = await User.find();

            res.status(200).json(users);

        } catch (error) {

            res.status(400).send(error);
        }
    },

    async user(req, res) {
        try {
            const id = req.params.id

            const user = await User.findOne({ _id: id })

            if (!user) {
                return res.status(400).json('usuario não encontrado!')
            }

            res.status(200).json(user);
        } catch (error) {

            res.status(400).send(error);
        }
    },


// todas os pedidos junto com seus usuarios

    async allPedidos(req, res) {
        const id = req.params.id
        const result = await Pedido.aggregate(
            [
                {
                    $lookup: {
                        from: 'users',
                        localField: 'cliente_id',
                        foreignField: '_id',
                        as: 'usuario'
                    }
                },
                { $unwind: '$usuario' }, // retorna um objeto
              
               
                {
                    $lookup: {
                        from: 'produtos',
                        localField: 'produto_id',
                        foreignField: '_id',
                        as: 'produto'
                    }
                },
                { $unwind: '$produto' }, // retorna um objeto

                {
                    $lookup: {
                        from: 'produtos',
                        localField: 'item_id',
                        foreignField: '_id',
                        as: 'item_adicionado'
                    }
                },
                { $unwind: '$item_adicionado' }, // retorna um objeto

              
                
            ]
        )
        res.status(200).json(result)
    },





}