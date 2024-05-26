const PlotModel = require('./plotsModel');

const getPlots = async (req, res) => {
    try {
        const plots = await PlotModel.find()
        res.json(plots)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createPlot = async (req, res) => {
    const plot = new PlotModel({
        ...req.body
    })

    try {
        await plot.save()
        res.status(201).json(plot)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updatePlot = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {

        const updatedPlot = await PlotModel.findOneAndUpdate({ plotId: id }, req.body , {
            new: true,
            runValidators: true
        });


        if (!updatedPlot) {
            return res.status(404).json({ message: 'Plot not found with id ' + id });
        }

        res.status(200).json(updatedPlot);
    } catch (error) {
        res.status(500).json({ message: 'Error updating plot', error: error.message });
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