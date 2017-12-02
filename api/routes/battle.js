const express = require('express');
const router = new express.Router();
const battles = require('../services/battles');

function handleResult(res, promise) {
    promise.then(result => {
        res.send(result);
    })
    .catch(e => {
        console.log(e.stack || e);
        res.json({ success: false, error: e });
    });
}

router.get('/new/:warId', (req, res) => {
    const { warId } = req.params;
    handleResult(res, battles.getNewBattle(warId));
});

module.exports = router;
