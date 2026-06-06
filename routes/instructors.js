const express = require('express');
const router = express.Router();

const instructorsController = require('../controllers/instructors');

router.get('/', instructorsController.getAll);

router.get('/:id', instructorsController.getSingle);

router.post('/', instructorsController.createInstructor);

router.put('/:id', instructorsController.updateInstructor);

router.delete('/:id', instructorsController.deleteInstructor);

module.exports = router;