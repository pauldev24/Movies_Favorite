import User from '../models/user_model.js';
import Movie from '../models/movie_model.js';
import bycript from 'bcryptjs';
import { createAccesssToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        //Validar si existe el usuario por email o username

        const userFoundName = await User.findOne({ username });

        if (userFoundName) return res.status(400).json({ message: "Ya se registro un usuario con el nombre de usuario actual" });

        const userFoundEmail = await User.findOne({ email });

        if (userFoundEmail) return res.status(400).json({ message: "Ya se registro un usuario con el correo actual" });

        //Validar que las contraseñas sean iguales
        if (password !== confirm_password) return res.status(400).json({ message: "Las contraseñas deben coinciden" });

        //Generar password encryptada
        const passwordHash = await bycript.hash(password, 10);

        //Sino crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        //Crear token 
        /*const token = await createAccesssToken({ id: userSaved._id });
        res.cookie("token", token)*/

        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username && !email) return res.status(400).json({ message: "El nombre de usuario o el correo son requeridos" });

        //Validar que exista el usuario con el email o el username
        const userFound = await User.findOne({ $or: [{ username }, { email }] });

        if (!userFound) return res.status(400).json({ message: "El usuario con el correo actual no existe" });

        //Validar la contraseña

        const comprobePassword = await bycript.compare(password, userFound.password);

        if (!comprobePassword) return res.status(400).json({ message: "La contraseña es incorrecta" });

        //Generar token de autenticacion 

        const token = await createAccesssToken({ id: userFound._id, username: userFound.username });
        res.cookie("token", token)
        res.status(200).json({ id: userFound._id, username: userFound.username, email: userFound.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Se ha cerrado la sesion" });
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;

        if (req.body.password !== undefined) {
            if (req.body.password !== req.body.confirm_password) return res.status(400).json({ message: "Las contraseñas deben coincidir" });
            const passwordHash = await bycript.hash(req.body.password, 10);
            req.body.password = passwordHash;
        }

        const userFound = await User.findById(id);

        if (!userFound) return res.status(400).json({ message: "El usuario no existe" });

        //Validar si las nuevas credenciales son las mismas que las anteriores
        if (userFound.username === req.body.username) {
            delete req.body.username;
        }
        if (userFound.email === req.body.email) {
            delete req.body.email;
        }

        if (req.body.username !== undefined) {
            //Verificar si el nombre de usuario ya existe
            const usernameFound = await User.findOne({ username: req.body.username });
            if (usernameFound) return res.status(400).json({ message: "El nombre de usuario ya existe" });
        }

        if (req.body.email !== undefined) {
            //Verificar si el correo ya existe
            const emailFound = await User.findOne({ email: req.body.email });
            if (emailFound) return res.status(400).json({ message: "El correo ya existe" });
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ message: "Usuario actualizado", user: { username: updateUser.username, email: updateUser.email } });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await User.deleteMany();
        await Movie.deleteMany();
        res.status(200).json({ message: "Se han eliminado todos los usuarios" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies

        if (!token) return res.status(401).json({ message: "No Autorizado" })

        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ message: "No Autorizado" })

            const userFound = await User.findById(user.id)

            if (!userFound) return res.status(401).json({ message: "No Autorizado" })

            res.status(200).json({ id: userFound._id, username: userFound.username, email: userFound.email })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}