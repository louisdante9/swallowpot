import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// define the schema for our user model
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
const SALT_WORK_FACTOR = 10;

adminSchema.pre('save', function (next) {
    const admin = this;

    // only hash the password if it has been modified (or is new)
    if (!admin.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            admin.password = hash;
            next();
        });
    });
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;