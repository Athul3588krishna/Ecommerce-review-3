import Usermodel from "../models/Usermodel.js"; // Ensure case matches your export in Usermodel.js
import { hashPassword, comparePassword } from "./../helpers/authHelper.js"; // Ensure these functions are correctly implemented
import JWT from "jsonwebtoken";

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validations
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({ 
                error: `${!name ? "Name" : !email ? "Email" : !password ? "Password" : !phone ? "Phone" : "Address"} is required`
            });
        }

        // Check for existing user
        const existingUser = await Usermodel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered, please login",
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save user
        const user = await new Usermodel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error.message || "Unknown error" // Improved error handling
        });
    }
};

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check if user exists
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Generate JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address, // fixed typo
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error: error.message || "Unknown error",
        });
    }
};


//test controller
export const testController = (req, res) => {
      res.send("Protected Routes");

  };
  