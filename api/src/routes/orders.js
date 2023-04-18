const express = require("express");
const userModel = require('../models/nosql/user')
const OrderModel = require('../models/nosql/orders')
const beatModel = require('../models/nosql/beats')
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
       const {buyer, seller, beat} = req.body
        const comprobacion = await userModel.findById(buyer)
        if (comprobacion.bougthBeats.includes(beat)) return res.status(400).json({message: 'No puedes comprar un beat que ya tienes'})
       if (buyer === seller) return res.status(400).json({message: 'No puedes comprar tu propio beat'})
       const order = await OrderModel.create({
            buyer,
            seller,
            beat,
            date: today.toLocaleDateString("es")
        })
        const buyerUser = await userModel.findById(buyer)
        buyerUser.bougthBeats = [...buyerUser.bougthBeats, beat]
        await buyerUser.save()

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

module.exports = router;
