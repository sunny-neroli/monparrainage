const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userType } = req.body;
        
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const user = new User(firstName, lastName, email, password, userType);
        await user.save();

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isValidPassword = await User.verifyPassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        
        let user = await User.findByEmail(email);
        
        if (!user) {
            // Créer un nouveau compte avec un mot de passe aléatoire
            const randomPassword = Math.random().toString(36).slice(-8);
            user = new User(firstName, lastName, email, randomPassword, 'filleul');
            await user.save();
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'authentification Google' });
    }
}; 