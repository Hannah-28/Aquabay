import User from '../db/models/Users';
import mongoose from 'mongoose'

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
                    res.render('error', {error: 'Could not find user'})
                    return;
                }
                if(!user) {
                    //register the user
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email,
                        password
                    });

                    user.save()
                    .then(result => {
                        res.status(200).json({
                            docs:[user]
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                } else {

                    //send an error, the user already exists
                    res.render('error', {error: 'User already exist'})
                }
            })


        } catch (err) {
            res.render('/error', {error: 'Invalid details'})
        }
    }
}

export default AdminController;