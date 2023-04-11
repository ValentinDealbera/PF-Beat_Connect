const mongoose = require('mongoose')

const UserSuperSchema = new mongoose.Schema(
   {
      id : {
        type : mongoose.Types.ObjectId,
        },
      first_name : {
        type : String
      },
      last_name: {
        type: String
      },
      email: {
        type: String,
      },
      password: {
        type: String
      },
      softDelete: {
        type: Boolean,
        default: false
      },
      admin: {
         type: Boolean,
         default: true
      },
      superAdmin: {
         type: Boolean,
         default: false
      }
   }
)

module.exports = mongoose.model("UserSuper", UserSuperSchema);