const express  = require('express');
const router   = express.Router();
const Thread   = require('../../models/thread.model');
const Reply    = require('../../models/reply.model');
const loggedIn = require('../../utils/isAuthenticated');

router.get('/', (req, res, next) => {
  Thread
    .find({})
    .populate('_author replies._author')
    .exec( (err, threads) => {
      if (err) { return res.status(500).json(err); }

      return res.status(200).json(threads);
    });
});

router.get('/:id', (req, res, next) => {
  Thread
    .findById(req.params.id)
    .populate('_author replies._author')
    .exec( (err, thread) => {
      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }

      return res.status(200).json(thread);
    });
});

router.post('/', loggedIn, (req, res, next) => {
  const newThread = new Thread({
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content
  });

  newThread.save((err) => {
    if (err)              { return res.status(500).json(err); }
    if (newThread.errors) { return res.status(400).json(newThread); }

    return res.status(200).json(newThread);
  });
});

router.post('/:id/replies', loggedIn, (req, res, next) => {
  console.log(req.body.content);
  const newReply = new Reply({
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content
  });

  Thread
    .findByIdAndUpdate({_id: req.params.id}, {$push: {replies: newReply}}, { new: true })
    .exec((err, thread) => {
      if (!thread) { return res.status(404).json(err); }
      thread.populate('_author replies._author', (err, threadPop) => {
        if (err)     { return res.status(500).json(err); }
        return res.status(200).json(thread);
      });
  });
});

module.exports = router;
