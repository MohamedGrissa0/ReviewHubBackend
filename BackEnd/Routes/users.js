const router = require("express").Router()
const User = require("../Models/Person");

const { json } = require("express");



//UPDATE 

router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            req.body.password = await md5 (req.body.password);
        }
        try {

            const UpdateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body   //EVERYTHING       
            }, { new: true })  //5tr  yrja3lk  ken l9dim ki tjibed fih

            res.status(200).json(UpdateUser)

        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(401).json("You can only update your account !") // 401 === "Not allowed"
    }

})

//Delete User
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json("User not found");
        return;
      }
  
      // Delete all reviews made by the user
      await Post.updateMany(
        { "REVIEWS.personId": user._id },
        { $pull: { REVIEWS: { personId: user._id } } }
      );
  
      // Delete the user
      await user.remove();
  
      res.status(200).json("User and reviews deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  });
  




//GET USER 


router.get('/:id' , async(req,res)=>
{
    try
    {
        const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc;
      
        res.status(200).send(others)
   }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
