const express = require("express");
const userModel = require('../models/nosql/user')
const OrderModel = require('../models/nosql/orders')
const beatModel = require('../models/nosql/beats');
const adminMiddleware = require("../middleware/adminVerify");
const router = express()

router.get('/', async (req, res) => {
    try {
        const order = await OrderModel.find().populate('beat').populate('buyer').populate('seller')
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/seller/:userSellerId', async (req,res)=>{
    try {
        const {userSellerId} = req.params
        const orders = await OrderModel.find({seller: userSellerId}).populate('beat').populate('buyer').populate('seller')
        if (orders.length === 0) return res.status(400).json({message: 'Este usuario no tiene ninguna order'})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


router.get('/buyer/:userBuyerId', async (req,res)=>{
    try {
        const {userBuyerId} = req.params
        const orders = await OrderModel.find({buyer: userBuyerId}).populate('beat').populate('buyer').populate('seller')
        if (orders.length === 0) return res.status(400).json({message: 'Este usuario no tiene ninguna order'})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const {userid} = req.headers
        const {id} = req.params
        const comprobante = await OrderModel.findById(id).populate('buyer')
        const comprobanteUser = await userModel.findById(userid)
        if(!comprobanteUser) return res.status(400).json({message: 'Ese usuario no existe'})
        if(!comprobante) return res.status(400).json({message: 'Esa orden no existe'})
        if(comprobante.buyer.email !== comprobanteUser.email) return res.status(400).json({message: 'No pueden eliminar una orden que no sea tuya'})
        const order = OrderModel.findByIdAndDelete(id)
        res.status(200).json(order)
    } catch (error) {   
        res.status(500).json({message: error.message})
    }
})

router.delete('/:id', adminMiddleware ,async (req,res)=>{
    try {
        const {id} = req.params
        const order = OrderModel.findByIdAndDelete(id)
        res.status(200).json(order)
    } catch (error) {   
        res.status(500).json({message: error.message})
    }
})


router.post('/', async (req, res) => {
    try {
        const today = new Date()
       const {buyer, beat} = req.body
        const beatBuyed = await beatModel.findById(beat)
        const comprobacion = await userModel.findById(buyer)
        if (comprobacion.bougthBeats.includes(beat)) return res.status(400).json({message: 'No puedes comprar un beat que ya tienes'})
       if (buyer === beatBuyed.userCreator) return res.status(400).json({message: 'No puedes comprar tu propio beat'})
       const order = await OrderModel.create({
            buyer,
            seller: beatBuyed.userCreator,
            beat,
            date: today.toLocaleDateString("es")
        })
        const buyerUser = await userModel.findById(buyer)
        buyerUser.bougthBeats = [...buyerUser.bougthBeats, beat]
        buyerUser.userOrders = [...buyerUser.userOrders, order._id]
        await buyerUser.save()
        const sellerUser = await userModel.findById(beatBuyed.userCreator)
        sellerUser.userOrders = [...sellerUser.userOrders, order._id]
        await sellerUser.save()
        res.status(200).json(order)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})

module.exports = router;
