import dotenv from 'dotenv'
const app = require('./app');
import mongoose from 'mongoose'

dotenv.config({path : './config.env'});

const DB = process.env.DATABASE
//console.log(DB);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})