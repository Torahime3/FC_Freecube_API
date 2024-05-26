const express = require('express')
const router = express.Router()
const plotsController = require('./plotsController')

router.get('/', plotsController.getPlots)
router.post('/', plotsController.createPlot)
router.put('/:id', plotsController.updatePlot)
router.delete('/:id', plotsController.deletePlot)

module.exports = router