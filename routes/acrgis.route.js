const express = require('express');
const arcGisCtrl = require('../controller/arcgis.controller');
const router = express.Router();

router.post('/create', arcGisCtrl.create);
router.get('/', arcGisCtrl.get)

module.exports = router;
