// middleware/authMiddleware.ts
import {supabaseAdmin} from "../config/supabaseClient.js";




// validates user
// check user is authenticated based on access token
export const validateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);


        if (error || !user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Authentication failed' });
    }
};




//validate admin
//check user is authenticated based on access token
//used boolean flag isAdmin
export const validateAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "Missing access token" });
        }

        // Step 1: Validate and get user from token
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        // Step 2: Check isAdmin from user_metadata
        const isAdmin = user.user_metadata?.isAdmin;

        if (!isAdmin) {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        // Attach user to request for further use
        req.user = user;

        next();
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
