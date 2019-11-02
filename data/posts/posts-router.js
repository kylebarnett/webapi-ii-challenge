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
  const comments = { ...req.body, comment_id: req.params.id }
  try {
    const comment = await db.insertComment(comments)
    res.status(201).json(comment)
  } catch {
    res.status(500).json({ error: "There was an error while saving the comment to the database." })
  }
})

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

module.exports = router;