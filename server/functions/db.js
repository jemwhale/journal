const { User } = require('../../db');

const getUserByEmail = async (email) => {
    try {
        const foundUser = await User.findOne({where: {email}});
        return foundUser;  
    } catch(error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const foundUser = await User.findByPk(id);
        return foundUser;
    } catch(error) {
        throw error;
    }
}

const createUser = async (username, email, password) => {
    try {
        const user = await User.create({username, email, password})
        return user;
    } catch(error) {
        throw error;
    }
}

const destroyUser = async (id, next) => {
    try {
        const user = await getUserById(id);
        await user.destroy();
        return;
    } catch(error) {
        throw error;
    }
}

const updateUser = async (user, updatedUserObject) => {
    try {
        user.set(updatedUserObject);
        const updatedUser = await user.save();
        return updatedUser;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    destroyUser,
    updateUser
};