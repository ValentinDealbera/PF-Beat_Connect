const UserModel = require("../../models/nosql/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { newPassword, email } = req.body;

  console.log(req.body);

  try {
    const user = await UserModel.findOne({ email });

    const passwordIsEqual = await bcrypt.compare(
      newPassword.trim(),
      user.password.trim()
    );

    if (passwordIsEqual) {
      return res.status(400).json({
        message: "Debes colocar una contraseña que no hayas usado antes",
      });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
    user.password = hashedPassword;
    user.save();
    res
      .status(200)
      .json({ message: "La contraseña fue actualizada correctamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
