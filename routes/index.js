const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized. Please login." });
};

router.use('/', require('./swagger'));
router.use('/courses', isAuthenticated, require('./courses'));
router.use('/instructors', isAuthenticated, require('./instructors'));

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/', (req, res) => { res.send(req.user ? `Logged in as ${req.user.displayName || req.user.username}` : "Logged Out"); });

module.exports = router;
