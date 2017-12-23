const express = require('express');
const router = new express.Router();
const battles = require('../services/wars');

const TEMP_USER_ID = 1;

function handleResult(res, promise) {
  promise.then((result) => {
    res.send({ result });
  }).catch(e => {
    console.log(e.stack || e);
    res.json({ error: e });
  });
}

router.get('/:warId/battles/new', (req, res) => {
  const { warId } = req.params;
  handleResult(res, battles.getNewBattle(TEMP_USER_ID, warId));
});

router.post('/:warId/battles/declare', (req, res) => {
  const { warId } = req.params;
  const { winnerId, loserId } = req.body;
  handleResult(res, battles.declareBattle(TEMP_USER_ID, warId, winnerId, loserId));
});

router.get('/:warId/battles/mylist', (req, res) => {
  const { warId } = req.params;
  handleResult(res, battles.getUserList(TEMP_USER_ID, warId));
});

module.exports = router;
