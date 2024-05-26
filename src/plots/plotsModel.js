const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    z: Number
})

const areaSchema = new mongoose.Schema({
    locationA: locationSchema,
    locationB: locationSchema
})

const hourSchema = new mongoose.Schema({
    ticks: Number
})

const musicTransmitterSchema = new mongoose.Schema({
    musicName: {
        type: String,
        enum: ['Cat', 'Blocks', 'Chirp', 'Far', 'Mall', 'Mellohi', 'Stal', 'Strad', 'Wait', 'Ward', 'Otherside', 'Relic', 'Pigstep'],
        required: true
    },
    location: locationSchema,
    volume: Number,
    pitch: Number
})

const preferencesSchema = new mongoose.Schema({
    fly: {
        type: Boolean,
        default: true
    },
    clearInventory: {
        type: Boolean,
        default: false
    },
    dropItems: {
        type: Boolean,
        default: true
    },
    lootItems: {
        type: Boolean,
        default: true
    },
    spawnTp: {
        type: Boolean,
        default: false
    },
    gamemode: {
        type: String,
        enum: ['survival', 'creative', 'adventure', 'spectator'],
        default: 'creative'
    }
})

const entityGeneratorsSchema = new mongoose.Schema({
    area: areaSchema,
    entityName: {
        type: String,
        enum: [
            'AXOLOTL', 'BAT', 'BEE', 'CAT', 'CHICKEN', 'COD',
            'COW', 'DONKEY', 'FOX', 'GLOW_SQUID', 'GOAT', 'HORSE',
            'MUSHROOM_COW', 'MULE', 'OCELOT', 'PANDA', 'PARROT', 'PIG',
            'PIGLIN', 'PIGLIN_BRUTE', 'PILLAGER', 'POLAR_BEAR', 'PUFFERFISH',
            'RABBIT', 'SALMON', 'SHEEP'
        ],
        required: true
    },

})

const pvpAreaSchema = new mongoose.Schema({
    area: areaSchema,
    meleeWeapon: {
        type: Boolean,
        default: false
    },
    rangeWeapon: {
        type: Boolean,
        default: false
    },
})

const membersUUIDSchema = new mongoose.Schema({
    membersUUID: [String]
})


const plotSchema = new mongoose.Schema({
    plotId: {
        type: Number,
        required: true
    },
    plotName: {
        type: String,
        required: true
    },
    spawn: locationSchema,
    hours: hourSchema,
    weather: {
        type: String,
        enum: ['CLEAR', 'RAINY'],
        default: 'CLEAR'
    },
    musicTransmitter: [musicTransmitterSchema],
    entityGenerators: [entityGeneratorsSchema],
    pvpArea: [pvpAreaSchema],
    preferences: preferencesSchema,
    membersUUID: membersUUIDSchema
})

plotSchema.index({ plotId: 1 }, { unique: true })

const plotModel = mongoose.model('Plot', plotSchema)

module.exports = plotModel

