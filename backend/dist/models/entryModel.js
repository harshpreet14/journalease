"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const aiInsightsSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true,
    },
    insight: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true
    }
});
const entrySchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transcript: {
        type: String,
        required: true,
    },
    ai_insights: [aiInsightsSchema], // Optional field, can be an empty array
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    compiled_at: {
        type: Date,
        default: null,
    },
    is_compiled: {
        type: Boolean,
        default: false,
    }
});
const Entry = mongoose_1.default.model('Entry', entrySchema);
module.exports = Entry;
