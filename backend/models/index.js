// backend/models/index.js
const { sequelize } = require('../config/database');

// Import model definitions
const UserModel = require('./User');
const ConferenceModel = require('./Conference');
const RegistrationModel = require('./Registration');
const PaymentModel = require('./Payment');

// Initialize models
const User = UserModel(sequelize);
const Conference = ConferenceModel(sequelize);
const Registration = RegistrationModel(sequelize);
const Payment = PaymentModel(sequelize);

// Define associations
User.hasMany(Registration, {
    foreignKey: 'userId',
    as: 'registrations',
});

Registration.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

Conference.hasMany(Registration, {
    foreignKey: 'conferenceId',
    as: 'registrations',
});

Registration.belongsTo(Conference, {
    foreignKey: 'conferenceId',
    as: 'conference',
});

Registration.hasMany(Payment, {
    foreignKey: 'registrationId',
    as: 'payments',
});

Payment.belongsTo(Registration, {
    foreignKey: 'registrationId',
    as: 'registration',
});

// Sync database (only in development)
const syncDatabase = async (force = false) => {
    try {
        await sequelize.sync({ force, alter: !force && process.env.NODE_ENV === 'development' });
        console.log('âœ“ Database synchronized successfully');
    } catch (error) {
        console.error('âœ— Error synchronizing database:', error.message);
        throw error;
    }
};

module.exports = {
    sequelize,
    User,
    Conference,
    Registration,
    Payment,
    syncDatabase,
};




