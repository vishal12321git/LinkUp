const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session expired or invalid",
            logout: true,
        }
    }

    try {
        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECREAT_KEY)
        
        // Fetch user details using the decoded ID
        const user = await UserModel.findById(decoded.id).select('-password')

        if (!user) {
            return {
                message: "User not found",
                logout: true,
            }
        }

        return user
    } catch (err) {
        console.error("Error verifying token:", err)

        // Handle JWT verification errors (e.g., token expired, malformed token, etc.)
        return {
            message: "Invalid token or session expired",
            logout: true,
        }
    }
}

module.exports = getUserDetailsFromToken
