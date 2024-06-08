import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
// import { engine } from 'express-handlebars';
import hbs from 'hbs'
import { geocode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';

// Convert the file URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')
//console.log(__dirname);
//console.log(__filename);d
//console.log(path.join(__dirname, '../public'));

const app = express();


//app.engine('handlebars', engine());
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname,'../public')))


app.get('/', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Chandrakanth Talakkokkula'
    })
})



app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Chandrakanth Talakkokkula'
    })
});

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'Help By CT',
        name: 'Chandrakanth Talakkokkula'
    })
});

app.get('/weather', (req, res)=>{
    console.log('req.query.address', req.query.address)
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Gajwel',
    //     address: req.query.address,
    // })

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
            // console.log('latitude '+latitude)
            // console.log('longitude '+longitude)
            // console.log('location '+location)
        forecast({latitude, longitude}, (error, forecastData)=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
    //console.log(req.query.address)
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send({
            error:'You must provide a search term '
        })
    }

    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        errorMessage: 'Help ar page not found',
        name: 'Chandrakanth Talakkokkula'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found',
        name: 'Chandrakanth Talakkokkula'
    })
});



app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
