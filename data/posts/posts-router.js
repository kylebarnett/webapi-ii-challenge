const router = require('express').Router();

const db = require('../db');

//POST METHODS
router.post('/', (req, res) => {
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    db.insert(postInfo)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database." })
      })
  }
})

router.post('/:id/comments', async (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };

  if (!commentInfo.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment."
    })
  }

  try {
    if (!commentInfo.post_id) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(201).json(commentInfo)
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the comment to the database."
    });
  }

});

//GET METHODS
router.get('/', (req, res) => {
  const posts = req.body;
  db.find(posts)
    .then(post => {
      res.status(200).send(post)
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/:id', async (req, res) => {
  try {
    const posts = await db.findById(req.params.id)
    if (posts.length > 0) {
      res.status(200).send(posts)
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  } catch {
    res.status(500).json({ error: "The post information could not be retrieved." })
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await db.findPostComments(req.params.id);
    if (comments.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json(comments)
    }
  } catch {
    res.status(500).json({ error: "The comments information could not be retrieved." })
  }
})

// router.get('/:id/comments', async (req, res) => {
//   try {
//     const comments = await db.findPostComments(req.params.id);
//     if (comments.length > 0) {
//       res.status(200).json(comments)
//     } else {
//       res.status(404).json({ message: "The post with the specified ID does not exist." })
//     }
//   } catch {
//     res.status(500).json({ error: "The comments information could not be retrieved." })
//   }
// })

//PUT METHODS
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({ message: "The post with the specified ID does not exist." })
  }
  db.update(id, post)
    .then(info => {
      if (info) {
        res.status(200).json(info)
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be modified." })
    })
})

//DELETE METHODS
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ error: "The post with the specified ID does not exist." })
      }
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed." })
    })
})

router.get('/:id/comments', (req, res) => {

})

module.exports = router;