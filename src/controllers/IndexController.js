
/**
 * Class Index Controller
 */
class IndexController {
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
}

export default IndexController;