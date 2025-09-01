import TempUser from "../models/tempuser.schema.js";
import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail } from "../email/email.js";

const createTokenEmail = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "120s" });
};
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUserMail = await User.findOne({ email });
    const existingUserPseudo = await User.findOne({ username });
    const existingTempUserMail = await TempUser.findOne({ email });
    const existingTempUserPseudo = await TempUser.findOne({ username });

    if (existingUserMail || existingUserPseudo) {
      return res.status(400).json({ message: "Déjà inscrit" });
    } else if (existingTempUserMail || existingTempUserPseudo) {
      return res.status(400).json({ message: "Vérifiez vos email" });
    }

    const token = createTokenEmail(email);
    await sendConfirmationEmail(email, token);

    const hashedPassword = await bcrypt.hash(password, 10);

    const tempUser = new TempUser({
      username,
      email,
      password: hashedPassword,
      token,
    });

    await tempUser.save();
    res.status(200).json({
      message:
        "Veuillez confirmer votre inscription en consultant votre boîte mail",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { data, password } = req.body;
  console.log(req.body);

  let user;

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (emailRegex.test(data)) {
    user = await User.findOne({ email: data });
  } else {
    user = await User.findOne({ username: data });
  }

  if (!user) {
    return res
      .status(400)
      .json({ message: "Email ou nom d'utilisateur incorrect" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Mot de passe incorrect" });
  }

  // Si tout est bon
  res.status(200).json({ user, message: "Connexion réussie" });
};

export const verifyMail = async (req, res) => {
  console.log("TEST EMAIL");
};
