import Restaurant from "../models/Restaurant.js"


export const handleAdd = async(req, res) => {
    try {
        const restaurantData = req.body;
        const newRestaurant = await Restaurant.create(restaurantData);
        res.status(200).send(newRestaurant)
    } catch (error) {
        console.log(error.message)
        res.status(401).send('Error in handleAdd:', error.message)
    }
}

export const handleRestaurant = async (req, res) =>{
    try {
        const response = await Restaurant.find();
        res.status(200).send(response)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Error in handleList:', error.message)
    }
}

export const handleRestaurantId = async (req, res) =>{
    const {_id} = req.params
    try{
        const response = await Restaurant.findOne({_id});
        res.status(200).send(response);
    } catch (error){
        res.status(401).send('Error in handleRestaurantId:', error.message)
    }
}

export const handleRestaurantTags = async (req, res) => {
    try {
        
        const tags = await Restaurant.aggregate([
            { $unwind: "$tags" }, 
            { $group: { _id: "$tags.name" } }, 
            { $project: { _id: 0, name: "$_id" } }
        ]);

        res.status(200).json(tags);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error in handleRestaurantTags:', error.message);
    }
}

export const handleRestaurantTagsName = async (req, res) => {
    // Extract the tag name from the request parameters
    const { tagName } = req.params;

    try {
  
        const restaurants = await Restaurant.find({
            "tags.name": { $regex: new RegExp(tagName, 'i') }
        });

    
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error in handleRestaurantTagsName:', error.message);
    }
};



export const handleCity = async (req, res) => {

    try{
        const { city } = req.params
        console.log('this is request.params', req.params)
        const response = await Restaurant.find({city_name: new RegExp(city, 'i')});
        console.log('this is the response:', response)
        res.status(200).json(response);
    } catch (error){
        res.status(401).json({error: 'Error in handleCity', message: error.message});
        console.log('error in handleCity:', error.message)
    }
}