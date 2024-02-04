const router = require('express').Router();
const userController = require('../controllers/user-controller');

router.route('/register')
  .post(userController.add);

router.route('/login')
  .post(userController.login);

router.route('/current')
  .get(userController.userCurrent);

router.route('/')
  .get(userController.retrieveUser);


module.exports = router;