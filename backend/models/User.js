// backend/models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        affiliation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('faculty', 'admin', 'user'),
            defaultValue: 'faculty',
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        emailVerificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passwordResetExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        loginAttempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        lockUntil: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.changed('passwordHash')) {
                    user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('passwordHash')) {
                    user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
                }
            },
        },
    });

    // Instance methods
    User.prototype.comparePassword = async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.passwordHash);
    };

    User.prototype.isLocked = function () {
        return !!(this.lockUntil && this.lockUntil > Date.now());
    };

    User.prototype.incrementLoginAttempts = async function () {
        // Reset attempts if lock has expired
        if (this.lockUntil && this.lockUntil < Date.now()) {
            await this.update({
                loginAttempts: 1,
                lockUntil: null,
            });
            return;
        }

        const updates = { loginAttempts: this.loginAttempts + 1 };

        // Lock account after 5 failed attempts for 2 hours
        if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
            updates.lockUntil = new Date(Date.now() + 2 * 60 * 60 * 1000);
        }

        await this.update(updates);
    };

    User.prototype.resetLoginAttempts = async function () {
        await this.update({
            loginAttempts: 0,
            lockUntil: null,
        });
    };

    return User;
};




