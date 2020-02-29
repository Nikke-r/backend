const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const passport = require('../utils/passport');

router.post('/', gameController.addUser);
router.get('/', passport.authenticate('jwt', {session: false}), gameController.getGameStatus);
router.put('/', passport.authenticate('jwt', {session: false}), gameController.updateGame);
router.delete('/', passport.authenticate('jwt', {session: false}), gameController.deleteUser);

module.exports = router;