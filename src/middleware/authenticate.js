import jwt from 'jsonwebtoken';

class Auth {

    /**
     * This method authenticates the user
     * @param req req request object for checkAuth function
     * @param {object} res response object for checkAuth function
     * @returns userData
     */
    static async checkAuth(req, res, next) {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          req.userData = decoded;
          next();
        } catch (err) {
          return res.status(401).json({
            message: 'Authentication Failed',
          });
        }
      };
}


export default Auth;