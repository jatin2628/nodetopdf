const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User;
const sendMail = require('../utils/sendmail');
const bcrypt = require('bcrypt');



exports.register = async (req,res) => {
    try {
        const { first_name, last_name, email, password, address } = req.body;
        const checkUser = await User.findOne({where:{email:email}});
        if(checkUser){
            res.status(500).json({message:"Email already exist"});
            return;
        }
        const hashPass = await bcrypt.hash(password,12);
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashPass,
            address: address,
        });

        const payload = {
            email: user.email,
            id: user.id
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });

        const url = `http://localhost:3000/verify/${token}`
        console.log(url);
        sendMail(email, "Verify Email", url)

        res.status(200).json({ status: "ok", msg: "Email to verify your account sent succesfully" });

    } catch (e) {
        console.log(e)

    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        const { id } = verifyUser;

        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            res.status(200).json({ msg: "User does not exist" });
        }
        const update = await User.update({
            verified: 1
        },
            {
                where: { id: id }
            })

        res.status(200).json({ msg: "Email verified Succesfully" });

    } catch (e) {
        console.log(e)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email:email}});
        if(!user){
            res.status(400).json({message:"Invalid email Credential"});
            return;
        }

        const payload = {
            email: user.email,
            id: user.id
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });

        if (user.verified == 0) {
            const url = `http://localhost:3000/verify/${token}`
            console.log(url);
            sendMail(email, "Verify Email", url)

            return res.status(200).json({ status: "ok", msg: "Email to verify your account sent succesfully" });

        }

        const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(400).json({message:'Invalid Credential'});
                return;
            }
            res.status(200).json({success:"ok",msg:"login Successful",data:user,token:token});

    } catch (e) {
        console.log(e)

    }
}