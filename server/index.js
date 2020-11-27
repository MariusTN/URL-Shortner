const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const yup = require('yup');
const {
    nanoid
} = require('nanoid');
const monk = require('monk');

require('dotenv').config();


const db = monk(process.env.MONGO_URI)
const urls = db.get('urls');
urls.createIndex('name');


const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.json({
        message: 'larallyn.link - short urls for your code'
    });
});

// app.get('/url/:id', (req,res) =>{
//     //TODO: get a short url by id
// });

// app.get('/:id', (req,res) =>{
//     //TODO: redirect to URL
// });

const schema = yup.object().shape({
    alias: yup.string().trim().matches(/^[\w\-\d]+$/),
    url: yup.string().trim().url().required(),

})

app.post('/url', async (req, res, next) => {
    let {
        alias,
        url
    } = req.body;

    try {
        await schema.validate({
            alias,
            url
        });
        if (!alias) {
            alias = nanoid(10);
        }
        else {
            const existing = await urls.findOne({
                alias
            });
            if (existing) {
                throw new Error('Already existing! Choose a new one!')
            }
        }

        alias = alias.toLowerCase();

        const newUrl ={
            url,
            alias,
        };

        const created = await urls.insert(newUrl);
        res.json(created);

    } catch (error) {
        if (error.message.startsWith('E11000')){
            error.message = "alias in use";
        }
        next(error);
    }
});

app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.Node_ENV === 'production' ? 'Hey' : error.stack
    })
})



const port = process.send.PORT || 3000;

app.listen(port, () => console.log(`Listening at https://localhost:${port}`));