const express=require('express');
const router=express.Router();

const person=require('./../models/person')

router.post('/',async(req,res)=>{
    try{
        const data=req.body

        const newperson=new person(data);
        // save the new person to database..
        const response=await newperson.save();

        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'server error '});
    }

})

router.put('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;// extract id from user.
        const updatepersondata=req.body; // updates data for person..

        const response=await person.findByIdAndUpdate(personId,updatepersondata,{
            new:true,
            runValidators:true,
        })

        if(!response)
        {
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});

    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        // Use findByIdAndDelete instead of findByIdAndRemove (for clarity and avoiding deprecation warnings)
        const response = await person.findByIdAndDelete(personId);

        // If no person is found, return a 404 error
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Log the deleted person's ID for clarity
        console.log(`Person with ID ${personId} deleted successfully`);

        // Send a success message
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        // Log error details for debugging
        console.error(err.stack);  // Logs the full error stack
        res.status(500).json({ error: 'Internal server Error' });
    }
});


router.get('/:workType',async(req,res)=>{
    try
    {
        const workType=req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter')
        {
            const response=await person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);

        }
        else{
            res.status(404).json({error:'invalid work type:'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'server error '});

    }
})


module.exports=router;