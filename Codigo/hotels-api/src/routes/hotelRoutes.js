const express = require('express');
const HotelController = require('../controllers/HotelController');

const router = express.Router();
const controller = HotelController;

// Middleware para validar ID de MongoDB
const validateMongoId = (req, res, next) => {
    const { id } = req.params;
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de hotel inválido'
        });
    }
    next();
};

// Rutas principales
router.get('/', controller.getAllHotels.bind(controller));
router.get('/most-searched', controller.getMostSearchedHotels.bind(controller));
router.get('/search', controller.searchHotels.bind(controller));
router.get('/neighborhoods', controller.getNeighborhoods.bind(controller));
router.get('/stats/statistics', controller.getStatistics.bind(controller));

// Rutas con ID
router.get('/:id', validateMongoId, controller.getHotelById.bind(controller));
<<<<<<< HEAD
=======
router.post('/:id/reviews', validateMongoId, controller.addReview.bind(controller));
>>>>>>> 80d62c4 (Commit 4)
router.put('/:id', validateMongoId, controller.updateHotel.bind(controller));
router.delete('/:id', validateMongoId, controller.deleteHotel.bind(controller));

// Ruta para crear hotel
router.post('/', controller.createHotel.bind(controller));

module.exports = router;

