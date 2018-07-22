'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuidv1 = require('uuid/v1');

var TimetableSchema = new Schema({
    name: {
        type: String,
        default: uuidv1()
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    readonly: {
        type: Boolean,
        default: false
    },
    courses: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Timetable', TimetableSchema);