import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw new Error('Error hashing the password');
    }
};

export const comparePassword = async (password, hashedPassword) => {  // Changed hashPassword to hashedPassword
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log(error);
        throw new Error('Error comparing the passwords');
    }
};
