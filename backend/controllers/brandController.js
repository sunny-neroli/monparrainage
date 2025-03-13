const Brand = require('../models/brand');

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des marques' });
    }
};

exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Marque non trouvée' });
        }
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la marque' });
    }
};

exports.searchBrands = async (req, res) => {
    try {
        const brands = await Brand.search(req.query.q);
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recherche des marques' });
    }
};

exports.createBrand = async (req, res) => {
    try {
        const { name, description, logo, rewardAmount, conditions } = req.body;
        const brand = new Brand(name, description, logo, rewardAmount, conditions);
        await brand.save();
        res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la marque' });
    }
}; 