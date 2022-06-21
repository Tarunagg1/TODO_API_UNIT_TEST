const registermodal = require('../modal/auth.modal');

// const _= require('loadash')
const jwt = require('jsonwebtoken');
// cuustom error handler
const bcryptjs = require('bcryptjs');

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!email || !password || !name) {
        return res.status(400).json({ error: "All field required" })
    }

    const newPassword = bcryptjs.hashSync(password, 10);

    const newUser = new registermodal({ ...req.body, password: newPassword });

    registermodal.findOne({ email }).then((data) => {
        if (data) {
            return res.status(400).json({ message: "Email allredy register" });
        } else {
            newUser.save((err, udata) => {
                if (err) return res.status(400).json({ message: err.message });
                return res.status(200).json({ message: "Registration successfully", udata });
            })
        }
    }).catch((err) => {
        return res.status(400).json({ message: err.message });
    })
}

exports.loginController = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All field required" })
    }

    registermodal.findOne({ email })
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400)
                    .json({
                        message: "User not exist"
                    })
            }

            if (!user.isactive) {
                return res.status(400)
                    .json({
                        message: "Account not active"
                    })
            }
            if (bcryptjs.compareSync(password, user.password)) {
                const token = jwt.sign({
                    _id: user._id
                }, process.env.JWT_LOGIN_SECRET, { expiresIn: '7d' })

                const { name, email } = user;

                return res.status(200).json({
                    token,
                    user: { name, email },
                    message:"login success"
                })
            } else {
                return res.status(400)
                    .json({
                        message: "Invalid password"
                    })
            }

        })
}

