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
        // Use aggregation to unwind the tags array and then group to get unique tags
        const tags = await Restaurant.aggregate([
            { $unwind: "$tags" }, // Separate the tags array into individual documents
            { $group: { _id: "$tags.name" } }, // Group by tag name to get unique tags
            { $project: { _id: 0, name: "$_id" } } // Project the result to have a 'name' field
        ]);

        res.status(200).json(tags);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error in handleRestaurantTags:', error.message);
    }
}


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