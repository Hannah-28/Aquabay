import User from '../db/models/Users';
import Entry from '../db/models/Entries';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Validator from '../helpers/Validator';

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

            const valid = Validator.singIn(email, password);

            if(!valid.error) {
                User.findOne({ email }, (err, user) => {
                    if(!err) {
                        if(user) {
                            // the email exists
                            const hashedPassword  = user.password;
                            bcrypt.compare(password, hashedPassword, (err, compareRes) => {
                                // if comparision fails
                                if(!compareRes) {
                                    res.render('error', {title:'Invalid details', error: 'Your details are invalid'});
                                    return;
                                }
    
                                // if comparision passes
                                // create a login token
                                const token = jwt.sign({
                                    email,
                                    loggedIn: Date.now()
                                }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES})
    
                                res.header('Authorization', 'Bearer '+ token);
                                res.render('dashboard', {title: 'Dashboard'});
    
                            })
                        } else {
                            //no user
                            res.render('error', {title:'Error', error: 'There is no user with the given email address.'})
                        }
                    } else {
                        return res.render('error', {title:'Error', error: 'Could not find user'})
                    }
                })
            } else {
                // validation failed
                res.render('error', {errors: valid.error.details.map(detail => detail.message), title: 'Invalid login details'});
            }

        } catch (err) {
            res.render('error', {title:'Error', error: 'Invalid details'})
        }
    }

    /**
     * Create entry
     * @param {object} req request object for createEntry function
     * @param {object} res response object for createEntry function
     * @returns 
     */
    static async createEntry(req, res) {
        try {
            const { pH, waterLevel } = req.body;

            const valid = Validator.createEntry(pH, waterLevel);

            if(!valid.error) {
                if(pH || waterLevel) {
                    const entry = new Entry({
                        _id: mongoose.Types.ObjectId(),
                        pH,
                        waterLevel
                    })
                    
                    entry.save()
                        .then(result => {
                            res.render('dashboard', {result, title: 'Welcome to the Dashboard'})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            } else {
                res.render('error', {errors: valid.error.details.map(detail => detail.message), title: 'Invalid entry details'});
            }

        } catch (err) {
            console.log(err)
            res.render('error', {title:'Invalid Entry', error: 'Invalid Entry'})
        }
    }
}

export default UsersController;