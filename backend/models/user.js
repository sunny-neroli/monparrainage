const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(firstName, lastName, email, password, userType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        const sql = `
            INSERT INTO users (firstName, lastName, email, password, userType)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [
            this.firstName,
            this.lastName,
            this.email,
            hashedPassword,
            this.userType
        ]);
        return result;
    }

    static async findByEmail(email) {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return users[0];
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User; 