import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'


// Signup

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Email ans Password are required" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPass
        });

        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000
        })

        res.json({ message: "User registered successfully", email: user.email });

    } catch (error) {
        console.log("Signup error", error)
        res.status(500).json({ error: "Server error" })
    }
}

// Login

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and Password are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Incorrect email" })

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return res.status(400).json({ message: "Incorrect password" });


        const token = jwt.sign({id:user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000
        })

        res.json({ message: "Logged in successfully" });


    } catch (error) {
        console.log("Login error", error)
        res.status(500).json({ error: "Server error" })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    res.json({ message: "Logged out successfully" })
}

export const getMe = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).select("-password");
   
    if (!user)
        return res.status(401).json({ message: "User not found" });

    res.json(user);
};


