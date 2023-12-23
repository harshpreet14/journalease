var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Entry = require('./../models/entryModel');
//a specific entry for a logged-in user
exports.getEntry = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { entryId } = req.params;
    const { userId } = req.params;
    try {
        const entry = yield Entry.findOne({ _id: entryId, user_id: userId });
        if (!entry) {
            return res.status(404).json({
                status: 'fail',
                message: 'Entry not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                entry,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
exports.getAllEntries = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const entries = yield Entry.find({ user_id: userId });
        res.status(200).json({
            status: 'success',
            results: entries.length,
            data: {
                entries,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});
//updating entry 
exports.updateEntry = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { entryId } = req.params;
    const { userId } = req.params;
    const { transcript, ai_insights } = req.body;
    try {
        const entry = yield Entry.findOneAndUpdate({ _id: entryId, user_id: userId }, { transcript, ai_insights }, { new: true });
        if (!entry) {
            return res.status(404).json({
                status: 'fail',
                message: 'Entry not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                entry,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
// deleting entry 
exports.deleteEntry = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { entryId } = req.params;
    const { userId } = req.params;
    try {
        const deletedEntry = yield Entry.findOneAndDelete({
            _id: entryId,
            user_id: userId,
        });
        if (!deletedEntry) {
            return res.status(404).json({
                status: 'fail',
                message: 'Entry not found',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});
exports.getAllEntries = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = req.params; // Get the user_id from the headers
    try {
        const entries = yield Entry.find({ user_id: userId });
        res.status(200).json({
            status: 'success',
            results: entries.length,
            data: {
                entries,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});
exports.createEntry = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const newEntry = yield Entry.create(Object.assign({ user_id: userId }, req.body));
        res.status(201).json({
            status: 'success',
            data: {
                entry: newEntry,
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
exports.getEntriesByDate = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { userId, date } = req.params;
    try {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1); // Get entries for the entire day
        const entries = yield Entry.find({
            user_id: userId,
            created_at: { $gte: startDate, $lt: endDate },
        });
        res.status(200).json({
            status: 'success',
            data: {
                entries,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
