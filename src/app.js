const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const { send } = require("process");
const port = process.env.PORT || 3000
const app = express();

//Defininig path for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialPath);
//set up static directory path
app.use(express.static(publicPath));

//set up handlebar engine and views location
app.set('view engine', 'hbs');
app.set("views", viewsPath);

app.get('', (req, res) => {
    res.render("index", {
        title: "Dark Sky ",
        country: "US",
        name: "Abhinav Jha"
    });
})

app.get('/help', (req, res) => {
        res.render("help", {
            title: "Dark Sky",
            help: "Hover Here",
            name: "Abhinav Jha"
        });
    })
    /*
    app.get('', (req, res) => {
        res.send("<h1>  Weather!</h1>");
    }); 

    app.get('/help', (req, res) => {
        res.send("Help page!!");
    });
    */
app.get('/help/*', (req, res) => {
    res.render("Error", {
        data: "Help Page not found"
    })
});
app.get('/about', (req, res) => {

    if (!req.query.search) { //Query String
        return res.send({
            error: "You Must Provide Search ",
        });
    }
    console.log(req.query);
    res.send([{
            "name": "Abhinav",
            "course": "B-Tech"
        },
        {
            "name": "Sarah"
        }
    ]);
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You Must Provide Address ",
        });
    }
    forecast(req.query.address, (error, data) => {
        const forecast_Data = data;
        if (!error) {
            geocode(req.query.address, (error, data) => {
                const geocode_Data = data;
                if (error) {
                    res.send(error);
                } else {
                    res.send({
                        address: geocode_Data,
                        weather_details: forecast_Data,
                    });
                }
            });
        } else {
            return res.send({ error });
        }
    });
    // geocode(req.query.address, (error, data) => {
    //     if (!error) {
    //         res.send(data);
    //     } else {
    //         return res.send({ error });
    //     }

    // });
});
app.get('*', (req, res) => {
    res.render("Error", {
        data: "Error-404 Page Can't Be Found"
    })
});
app.listen(port, () => {
    console.log("Server is up on port-" + port)
});