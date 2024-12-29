const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../modals/Admin');

mongoose.connect("mongodb+srv://amitkumaryadavwork:c8MEKddOVEponh0L@cluster0.xg6b7.mongodb.net", {})

const adminData = {
    name: 'admin',
    email: 'admin@gg.cc',
    password: 'Admin@123',
};

const seedsData = async () => {
    try {
        const existingAdmin = await Admin.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists. Skipping admin creation.');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminData.password, salt);

            adminData.password = hashedPassword;

            await Admin.create(adminData);
            console.log('Admin created successfully.');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(1)
    }
};

seedsData();
