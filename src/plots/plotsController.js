const PlotModel = require('./plotsModel');

const getPlots = async (req, res) => {
    res.json({
        message: 'GET plots'
    })
    // try {
    //     const plots = await PlotModel.find()
    //     res.json(plots)
    // } catch (error) {
    //     res.status(500).json({ message: error.message })
    // }
}

const createPlot = async (req, res) => {
    const plot = new PlotModel({
        ...req.body
    })

    try {
        const newPlot = await plot.save()
        res.status(201).json(newPlot)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// TODO: à revoir
const updatePlot = async (req, res) => {
    try {
        const plot = await PlotModel.findById(req.params.id)
        if (plot == null) {
            return res.status(404).json({ message: 'Plot not found' })
        }

        if (req.body.name != null) {
            plot.name = req.body.name
        }

        if (req.body.description != null) {
            plot.description = req.body.description
        }

        const updatedPlot = await plot.save()
        res.json(updatedPlot)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deletePlot = async (req, res) => {
    try {
        const plot = await PlotModel.findById(req.params.id)
        if (plot == null) {
            return res.status(404).json({ message: 'Plot not found' })
        }

        await plot.remove()
        res.json({ message: 'Plot deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getPlots,
    createPlot,
    updatePlot,
    deletePlot
}