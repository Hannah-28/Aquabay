import User from '../db/models/Users';
import mongoose from 'mongoose'

/**
 * Class Users Controller
 */
class UsersController {

    /**
     * Gets the homepage
     * @param {object} req request object for getHome function
     * @param {object} res response object for getHome function
     * @returns none
     * @renders index.handlebars
     * 
     */
    static async getHome(req, res) {
        res.render('index', {title: 'Aquabay'})
    }


    
    /**
     * Sign in route
     * @param {object} req request object for signIn function
     * @param {object} res response object for signIn function
     * @returns 
     */
    static async singIn(req, res, next) {
        // get the user details
        try {
            // find the user by email
            const { email, password } = req.body;

            User.findOne({ email }, (err, user) => {
                if(!err) {
                    if(user) {
                        // the email exists
                        const hashedPassword  = user.password;
                        /**
                         * @Todo decrypt password and compare
                         */

                        res.render('dashboard', {title: 'Dashboard'});
                    } else {
                        //no user
                        res.render('error', {error: 'There is no user with the given email address.'})
                    }
                } else {
                    return res.render('error', {error: 'Could not find user'})
                }
            })

        } catch (err) {
            res.render('error', {error: 'Invalid details'})
        }
    }
}

export default UsersController;