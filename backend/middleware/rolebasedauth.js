// const authMiddleware = require('./path/to/authMiddleware'); // Adjust the path as necessary

// const roleMiddleware = (requiredRole) => (req, res, next) => {
//   // Ensure the user is authenticated
//   authMiddleware(req, res, () => {
//     if (req.userRole !== requiredRole) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   });
// };

// module.exports = roleMiddleware;
