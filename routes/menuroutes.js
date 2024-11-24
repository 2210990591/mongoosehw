const express=require('express');

const router=express.Router();
// import the menumodel here..
const MenuItem=require('./../models/menu');

// now for menu..
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Create a new menu item using the MenuItem model
        const newMenuItem = new MenuItem(data);

        // Save the new menu item to the database
        const response = await newMenuItem.save();

        console.log('Menu item data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get for menu item..
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find(); // Fetch all menu items from the database
        console.log('Menu items fetched');
        res.status(200).json(data); // Send the data as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/:tastype', async (req, res) => {
    try {
        const tastype = req.params.tastype; // Get the tastype parameter from the URL

        // Check if the taste type is valid (either spicy, sour, or sweet)
        if (['spicy', 'sour', 'sweet'].includes(tastype)) {
            // Query the database for menu items with the matching tastype
            const response = await MenuItem.find({ taste: tastype });

            if (response.length > 0) {
                console.log('Response fetched');
                res.status(200).json(response); // Send the found items as JSON
            } else {
                // If no items are found for the given taste type
                res.status(404).json({ error: 'No menu items found for this taste type' });
            }
        } else {
            // If the taste type is invalid
            res.status(400).json({ error: 'Invalid taste type. Please use "spicy", "sour", or "sweet".' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports=router;