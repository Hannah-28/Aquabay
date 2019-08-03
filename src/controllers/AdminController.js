import User from '../db/models/Users';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Class Admin Controller
 */
class AdminController {

    /**
     * Add user in route
     * @param {object} req request object for add user function
     * @param {object} res response object for add user function
     * @param {next}
     * @returns 
     */
    static async addUser(req, res, next) {
        // get the user details
        try {
            const { email, password } = req.body;
            
            // make sure user does not already exist
            User.findOne({ email }, (err, user) => {
                if(err) {
                    res.render('error', {title:'Error', error: 'Could not find user'})
                    return;
                }
                if(!user) {
                    //register the user
                    // hash the password
                    bcrypt
                        .hash(password, 10, (err, hash) => {
                            const user = new User({
                                _id: mongoose.Types.ObjectId(),
                                email,
                                password: hash
                            });
                            user.save()
                            .then(result => {
                                res.render('dashboard', {title: 'Welcome to the Dashboard'})
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        })
                } else {

                    //send an error, the user already exists
                    res.render('error', {title:'Error', error: 'User already exist'})
                }
            })


        } catch (err) {
            res.render('/error', {error: 'Invalid details'})
        }
    }
}

export default AdminController;