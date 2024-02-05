const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Author = require('./author');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AuthorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Author,
            key: Author.id
        }
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableCopies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shelfLocation: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'books',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }
});

Author.hasMany(Book);

Book.prototype.isBookAvailable = function () {
    return this.availableCopies >= 1;
}


// // Create books table using model synchronization
// Book.sync()
//     .then()
//     .catch((error) => {
//         console.log(`Cannot create books table: ${error}`)
//     });

module.exports = Book;