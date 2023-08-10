const Cart = require("../../models/nosql/cart");
const Beats = require("../../models/nosql/beats");

module.exports = async (req, res) => {
  try {
    const { cartId, beatId } = req.params;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ mensaje: "El carrito no existe" });
    }

    // Eliminar el beat en específico del carrito
    const beatToDelete = cart.beats.find(
      (beat) => beat._id.toString() === beatId,
    );
    if (!beatToDelete) {
      return res
        .status(404)
        .json({ mensaje: "El beat no existe en este carrito" });
    }
    const updatedBeats = cart.beats.filter(
      (beat) => beat._id.toString() !== beatId,
    );
    cart.beats = updatedBeats;
    await cart.save();

    // Actualizar el estado del beat eliminado
    await Beats.findByIdAndUpdate(beatId, { inCart: false });

    // Eliminar el carrito si ya no tiene beats
    if (cart.beats.length === 0) {
      await Cart.findByIdAndDelete(cartId);
      return res.json({
        mensaje: "El carrito y el beat fueron eliminados exitosamente",
      });
    }

    res.json({
      mensaje: `El beat ${beatToDelete.beat.name} fue eliminado del carrito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};
