const router = require("express").Router()
const Person = require("../Models/Person");
const Post = require("../Models/Post");



router.get("/:id" , async (req,res) => {
    const id=req.params.id
    
    try {
       
             
       const review=await Post.find()
     res.status(200).send(review)
   

   }

   catch (err) {
       res.status(500).json(err)
   }
} )

router.post('/:postId', async (req, res) => {
  console.log(req.params.postId);
  console.log(req.body.rate);
  console.log(req.body.username);
  console.log(req.body.comments);



  try {
    const post = await Post.findOne({_id: req.params.postId});

    if (!post) {
      console.error('Post not found!');
      res.status(404).send('Post not found!');
    } 

      post.REVIEWS.push({
        personId: req.body.personId,
        username: req.body.username,
        rate: req.body.rate,
        comments: req.body.comments,
      });

      const updatedPost = await post.save();
      res.send(updatedPost);
      console.log(updatedPost)
      console.log('Review saved successfully!');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


//INSERT MANY 




//Update Review
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ 'REVIEWS._id': req.params.id });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const reviewIndex = post.REVIEWS.findIndex(review => review._id == req.params.id);
    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }

    post.REVIEWS[reviewIndex].comments = req.body.comments;
    post.REVIEWS[reviewIndex].rate = req.body.rate;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost.REVIEWS);
  } catch (err) {
    console.error(`Error updating review: ${err}`);
    res.status(500).json({ error: 'Error updating review' });
  }
});

  

//Delete Review
router.delete('/:id', async (req, res ) => {
  console.log(req.params.id)
  try {
    const post = await Post.findOne({ 'REVIEWS._id': req.params.id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const reviewIndex = post.REVIEWS.findIndex(review => review._id == req.params.id);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    post.REVIEWS.splice(reviewIndex, 1);
    const updatedPost = await post.save();
    res.status(200).json(updatedPost.REVIEWS);
    
  } catch (err) {
    console.error(`Error deleting review with ID ${req.params.id}: ${err}`);
    next(err);
  }
});



//GET ALL Reviews
router.get('/', async (req, res) => {
    const username = req.query.user
    const catName = req.query.cat
    /*try {
        let reviews;
        if (username) {
            reviews = await Review.find({data : { username }});
        }
        else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],

                }
            })
        }
        else {
            posts = await Post.find()
        }*/
        try{
        let reviews = await Review.find()
        res.status(200).json(reviews)
        }

    
    catch (err) {
        res.status(500).json(err)
    }
})

// Fetch reviews created in the last 24 hours






module.exports = router;
