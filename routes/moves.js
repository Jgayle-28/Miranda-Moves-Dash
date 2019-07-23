const express = require('express');
const router = express.Router();

//@route  GET  api/moves
//@desc   Get all moves
//@access Private
router.get('/', (req, res) => {
  res.send('Get all moves');
});

//@route  PUT  api/moves/:id
//@desc   Update move
//@access Private
router.put('/:id', (req, res) => {
  res.send('Update move');
});

//@route  DELETE  api/moves/:id
//@desc   Delete move
//@access Private
router.delete('/:id', (req, res) => {
  res.send('Delete move');
});

module.exports = router;
