import express from 'express';
import {handleAdd, handleRestaurant, handleRestaurantId, handleRestaurantTags, handleCity} from '../controllers/restaurantController.js'

const router = express.Router();

router.post("/add", handleAdd)
router.get('/restaurant',handleRestaurant)
router.get('/restaurant/:id', handleRestaurantId)
router.get('/tags', handleRestaurantTags)
router.get('/city/:city', handleCity)

export default router