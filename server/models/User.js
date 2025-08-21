// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema(
//     {
//         firstName: {
//             type: String,
//             required: true,
//         },
//         lastName: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//         profileImagePath: {
//             type: String,
//             default: "",
//         },
//         tripList: {
//             type: Array,
//             default: [],
//         },
//         wishList: {
//             type: Array,
//             default: [],
//         },
//         propertyList: {
//             type: Array,
//             default: [],
//         },
//         reservationList: {
//             type: Array,
//             default: [],
//         },
//         role: {
//             type: String,
//             enum: ['user', 'admin'], // Define the roles
//             default: 'user', // Default role is 'user'
//         }
//     },
//     { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema);
// module.exports = User;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
