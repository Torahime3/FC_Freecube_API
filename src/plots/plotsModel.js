const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    z: Number
}, { _id: false })

const areaSchema = new mongoose.Schema({
    locationA: locationSchema,
    locationB: locationSchema
}, { _id: false })

const hourSchema = new mongoose.Schema({
    ticks: Number
}, { _id: false })

const musicTransmitterSchema = new mongoose.Schema({
    musicName: {
        type: String,
        enum: ['Cat', 'Blocks', 'Chirp', 'Far', 'Mall', 'Mellohi', 'Stal', 'Strad', 'Wait', 'Ward', 'Otherside', 'Relic', 'Pigstep'],
        required: true
    },
    location: locationSchema,
    volume: Number,
    pitch: Number
}, { _id: false })

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
        enum: ['survival', 'creative', 'adventure'],
        default: 'creative'
    }
}, { _id: false })

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

}, { _id: false })

const membersSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['CHIEF', 'DEPUTY', 'MEMBER', 'ASSOCIATE'],
    }
}, { _id: false })

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
}, { _id: false })

const plotSchema = new mongoose.Schema({
    plotId: {
        type: Number,
        required: true
    },
    plotName: {
        type: String,
    },
    spawn: locationSchema,
    hour: hourSchema,
    weather: {
        type: String,
        enum: ['CLEAR', 'DOWNFALL'],
        default: 'CLEAR'
    },
    musicTransmitter: [musicTransmitterSchema],
    entityGenerators: [entityGeneratorsSchema],
    pvpArea: [pvpAreaSchema],
    preferences: preferencesSchema,
    interactions: {
        disabledInteractions: {
            type: [String],
            default: ['REDSTONE_COMPARATOR', 'REDSTONE_REPEATER', 'TNT']
        },
    },
    members: [membersSchema]
})

plotSchema.index({ plotId: 1 }, { unique: true })

const plotModel = mongoose.model('Plot', plotSchema)

module.exports = plotModel

