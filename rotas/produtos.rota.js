const express = require('express')
const router = express.Router()
const validarProdutos = require('../middleware/produtos.mid')
const { Produto } = require('../models')

var multer = require('multer')
const path = require('path')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() +
      path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const extensoes = /jpeg|jpg/i
  if (extensoes.test(path.extname(file.originalname))) {
    cb(null, true)
  } else {
    return cb('Arquivo não suportado. Apenas jpg ejpeg são suportados.')
  }
}

var upload = multer({
  storage: storage, fileFilter: fileFilter
})


router.post('/', validarProdutos)
router.put('/', validarProdutos)



router.get('/', async (req, res) => {
  const produtos = await Produto.findAll()
  res.json({ produtos: produtos })
})

router.get('/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id)
  res.json({ produto: produto })
})

router.post('/upload', upload.single('foto'), async (req, res) => {
  console.log(req.file)
  res.json({ msg: 'Arquivo enviado com sucesso' })
})

router.post('/', async (req, res) => {
  const produto = await Produto.create(req.body)
  res.json({ msg: "Produto adicionado com sucesso!" })
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const produto = await Produto.findByPk(id)

  if (produto) {
    produto.nome = req.body.nome
    produto.descricao = req.body.descricao
    produto.preco = req.body.preco
    await produto.save()
    res.json({ msg: "Produto atualizado com sucesso!" })
  } else {
    res.status(400).json({ msg: "Produto não encontrado!" })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const produto = await Produto.findByPk(id)
  if (produto) {
    await produto.destroy()
    res.json({ msg: "Produto deletado com sucesso!" })
  } else {
    res.status(400).json({ msg: "Produto não encontrado!" })
  }
})

module.exports = router;