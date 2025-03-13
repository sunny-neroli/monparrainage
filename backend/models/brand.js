const db = require('../config/database');

class Brand {
    constructor(name, description, logo, rewardAmount, conditions) {
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.rewardAmount = rewardAmount;
        this.conditions = conditions;
    }

    async save() {
        const sql = `
            INSERT INTO brands (name, description, logo, rewardAmount, conditions)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [
            this.name,
            this.description,
            this.logo,
            this.rewardAmount,
            this.conditions
        ]);
        return result;
    }

    static async findAll() {
        const [brands] = await db.execute('SELECT * FROM brands');
        return brands;
    }

    static async findById(id) {
        const [brands] = await db.execute('SELECT * FROM brands WHERE id = ?', [id]);
        return brands[0];
    }

    static async search(query) {
        const [brands] = await db.execute('SELECT * FROM brands WHERE name LIKE ?', [`%${query}%`]);
        return brands;
    }
}

module.exports = Brand; 