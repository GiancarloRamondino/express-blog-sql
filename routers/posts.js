const express = require('express');
const router = express.Router();
const menuControllers = require('../controllers/menuControllers.js'); // Importa i controller

// index
router.get('/', menuControllers.index);

// show
router.get('/:id', menuControllers.show);

// store
router.post('/', menuControllers.store);

// update (PUT)
router.put('/:id', menuControllers.update);

// patch (PATCH)
router.patch('/:id', menuControllers.patch);

// delete
router.delete('/:id', menuControllers.destroy);

module.exports = router;