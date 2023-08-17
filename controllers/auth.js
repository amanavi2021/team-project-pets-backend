const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const {nanoid} = require("nanoid");

const { HttpError, ctrlWrapper, transporter } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY, BASE_URL } = process.env;
const { schemas }  = require("../models/user");
const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
const {email, password} = req.body;
const {error} = schemas.registrationSchema.validate(req.body);
if (error) {
    throw HttpError(400, error.message)
}
const user = await User.findOne({email});
if (user) {
    throw HttpError(409, "Email in use")
}

const hashPassword = await bcrypt.hash(password, 10);
const avatarURL = gravatar.url(email);
const verificationToken = nanoid();
const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

const verifyEmail = {
    from: "amanavi2021@meta.ua",
    to:email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`
};
 await transporter.sendMail(verifyEmail);

res.status(201).json({
    user: {
        email: newUser.email,
        subscription: newUser.subscription,
    }
})
};

const verifyEmail = async(req, res) =>{
    console.log("here");
    const {verificationToken} = req.params;
    console.log('verificationToken', verificationToken);
    const user = await User.findOne({verificationToken});
    if (!user) {
        throw HttpError(404, "User not found")
    };

    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

    res.status(200).json({
        message: "Verification successful",
    })
}

const resendVerifyMail = async(req, res) => {
    const {email} = req.body;
    const {error} = schemas.emailSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing required field email")
    }
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(400, "Email not found");
    };
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    };

    const verifyEmail = {
        from: "amanavi2021@meta.ua",
        to:email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
    };

    await transporter.sendMail(verifyEmail);
    res.status(200).json({
        message: "Verification email sent"
    })    
}


const login = async(req, res) => {
    const {email, password} = req.body;
     const {error} = schemas.loginSchema.validate(req.body);
if (error) {
    throw HttpError(400, error.message)
}
const user = await User.findOne({email});
if (!user) {
    throw HttpError(401, "Email or password is wrong");
}
const passwordCompare = await bcrypt.compare(password, user.password);
if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
}
const payload = {
    id: user._id,
}
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
await User.findByIdAndUpdate(user._id, {token});
res.json({
    token,
    user:{
        email: user.email,
        subscription: user.subscription,
    }
})
};

const logout = async (req, res) => {
 const {_id} = req.user;
 await User.findByIdAndUpdate(_id, {token: ""});
 res.status(204).json();
}

const getCurrent = async (req,res) => {
    const  {email, subscription} = req.user;
    res.json ({
        email,
        subscription
    })
};

const updateSubscription = async (req, res) => {

const {error} = schemas.updateSubscriptionSchema.validate(req.body);
if (error) {
  throw HttpError(400, error.message)
}
const {_id} = req.user;
const result = await User.findByIdAndUpdate(_id, req.body, {new:true});
if (!result) {
    throw HttpError(404)
}
res.json(result);
}

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const  {path: tempUpload, originalname} = req.file;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);
    
const image = await Jimp.read(tempUpload);
image.resize(250, 250);
image.write(tempUpload);
await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })

}


module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyMail: ctrlWrapper(resendVerifyMail),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}