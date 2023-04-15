const express = require("express");
const router = express();
const mongoose = require("mongoose");
const Cart= require("../models/nosql/cart")
const Beats= require("../models/nosql/beats")
const {getProductsCart}= require("../controllers/cartController")
const {
    OK,
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    USER_NOT_FOUND,
    SERVER_ERROR,
    ALL_OK,
    ALL_NOT_OK,
} = require("../controllers/status");

router.get("/", async (req, res) => {
    const productCart= await Cart.find()
    if(productCart){
        res.json({productCart})
    }else{
        res.json({message: "no hay productos en el carrito "})
    }
});

router.post("/crear", async (req, res) => {
    const {name, image, priceAmount, genre}= req.body

    const estaEnDb= await Beats.findOne({name})

    const validate = name !== "" && image !== "" && genre !== ""

    const estaEnCarrito = await Cart.findOne({name})

    if(!estaEnDb){
        res.status(400).json({
            message:"Beat not found"
        })
    }else if(validate && !estaEnCarrito){
        const newBeatInCart = new Cart({name, image, genre, priceAmount, amount: 1})

        await Beats.findByIdAndUpdate(
            estaEnDb?._id,
            {inCart: true, name, image, priceAmount, genre},
            {new: true}
        )
    
        .then((product)=>{
            newBeatInCart.save()
            res.json({
                mensaje:"El producto fue agregado al carrito ",
                product
            })
        })
    
        .catch((error)=> console.log(error))
    }else if(estaEnCarrito){
        res.status(400).json({
            mensaje: "El producto ya esta en el carrito"
        })
    }
})

router.put("/:id" ,async (req, res)=>{
    const {id}= req.params
    const {query}= req.query
    const body =req.body

    const productoBuscado= await Cart.findById(id)

    if(!query){
        res.status(404).json({mensaje:"Debes enviar una query"})
    }else if(productoBuscado && query === "add"){
        body.amount =body.amount + 1

        await Cart.findByIdAndUpdate(id, body,{
            new:true,
        }).then((product)=>{
            res.json({
                mensaje:`El producto: ${product.name} fue actualizado`,
                product,
            })
        })
    } else if(productoBuscado && query === "del"){
        body.amount = body.amount -1

        await Cart.findByIdAndUpdate(id, body,{
            new: true,
        }).then((product)=>
        res.json({
            mensaje: `El producto: ${product.name} fue actualizado`
        })
        )
    }else{
        res.status(400).json({mensaje: "Ocurrio un error"})
    }
})

router.delete("/:id" ,async (req, res)=>{
    const {id}= req.params

    const productInCart= await Cart.findById(id)
    const {name, image, priceAmount,genre ,_id} = await Beats.findOne({
        name: productInCart.name
    })

    await Cart.findOneAndDelete(id)

    await Beats.findByIdAndUpdate(
        _id,
        {inCart: false, name, priceAmount, genre,image},
        {new: true}
    )
    .then((product)=>{
        res.json({
            mensaje: `El producto: ${product.name} fue eliminado del carrito`
        })
    })
    .catch((error)=>res.json({mensaje: "Hubo un error"}))

})
//   const userId = req.params.userId;
//   const beatId = req.params.beatId;

//   try {
//     const cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       // Si no existe el carrito, se crea uno nuevo
//       const newCart = new Cart({
//         user: userId,
//         beats: [{ beat: beatId }],
//       });
//       await newCart.save();
//     } else {
//       // Si existe el carrito, se agrega el beat al carrito
//       const beatIndex = cart.beats.findIndex((b) => b.beat == beatId);
//       if (beatIndex > -1) {
//         // Si el beat ya está en el carrito, se incrementa la cantidad
//         cart.beats[beatIndex].quantity += 1;
//       } else {
//         // Si el beat no está en el carrito, se agrega al carrito
//         cart.beats.push({ beat: beatId });
//       }
//       await cart.save();
//     }

//     // Se actualiza el total del carrito
//     const updatedCart = await Cart.findOne({ user: userId })
//       .populate({
//         path: "beats.beat",
//         model: "Beats",
//       })
//       .select("-__v")
//       .lean();

//     const totalAmount = updatedCart.beats.reduce(
//       (total, item) => total + item.beat.priceAmount * item.quantity,
//       0
//     );

//     updatedCart.totalAmount = totalAmount;

//     return res.status(200).json(updatedCart);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.delete("/:userId/remove-beat/:beatId", async (req, res) => {
//     const userId = req.params.userId;
//     const beatId = req.params.beatId;
  
//     try {
//       const cart = await Cart.findOne({ user: userId });
  
//       if (!cart) {
//         return res.status(404).json({ error: "Cart not found" });
//       } else {
//         const beatIndex = cart.beats.findIndex((b) => b.beat == beatId);
//         if (beatIndex > -1) {
//           if (cart.beats[beatIndex].quantity > 1) {
//             // Si el beat está en el carrito varias veces, se reduce la cantidad
//             cart.beats[beatIndex].quantity -= 1;
//             await cart.save();
//           } else {
//             // Si el beat está en el carrito una sola vez, se elimina
//             cart.beats.splice(beatIndex, 1);
//             await cart.save();
//           }
//         } else {
//           return res.status(404).json({ error: "Beat not found in cart" });
//         }
//       }
  
//       // Se actualiza el total del carrito
//       const updatedCart = await Cart.findOne({ user: userId })
//         .populate({
//           path: "beats.beat",
//           model: "Beats",
//         })
//         .select("-__v")
//         .lean();
  
//       const totalAmount = updatedCart.beats.reduce(
//         (total, item) => total + item.beat.priceAmount * item.quantity,
//         0
//       );
  
//       updatedCart.totalAmount = totalAmount;
  
//       return res.status(200).json(updatedCart);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   });
  

module.exports = router;