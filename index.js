const express = require("express");
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.get('/api', async(req, res) => {
    res.status(200).send({
        status: "200"
    });
});

app.post('/api/nearbyparks', async(req, res) => {
    const { radius, lat, lng } = req.body;
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=park&key=AIzaSyDk7asL0S0nS_24YkDiavHeyyjhSyVSyjA`,
        headers: {}
    };      
    const parkData =  await axios(config);

    let data = [];
    if (parkData.data) {
        for(const result of parkData.data['results']) {
            let dataArray = [];
            console.log(result);
            const location = result['geometry']['location'];
            dataArray.push([location['lat'], location['lng']], `<h2>${result['name']}</h2><p>${result['vicinity']}</p> `);
            data.push(dataArray)
        }
    }

    res.status(200).send({
        status: "200",
        data: data
    });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});