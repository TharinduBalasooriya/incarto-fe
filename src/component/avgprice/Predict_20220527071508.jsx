import axios from 'axios';
//Predict price 
import { useState, useEffect } from 'react';
function POST(path, data) {
  return fetch(`http://127.0.0.1:7001/predict`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
}

export default function Predict(props) {
  const [cities, setCities] = useState(null);
  const [location, setlocation] = useState('');
  const [beds, setbed] = useState('');
  const [baths, setbath] = useState('');
  const [total_sqfts, settotal_sqft] = useState('');
  const [prediction, setPrediction] = useState('')



  const onClick = e => {
    e.preventDefault();
    POST('/post', { bed: beds, bath: baths, total_sqft: total_sqfts, location: location }).then(
      response => response.json()
    ).then(data => setPrediction(data.result))
  }

  //Get city names
  useEffect(() => {
    axios.get('http://127.0.0.1:7001/city').then(response => {
      setCities(response.data)
    });
  }, []);

  const handleLocationChange = (event) => {
    event.preventDefault();
    setlocation(event.target.value)
  }



  return (
    <div style={{paddingTop:"5vh",paddingBottom:"5vh"}}>
      <h2>Predict House price</h2>
      <div className="container">
        <div className="row">
          <div class="card border-secondary mb-3" style={{ width: '100%', height: '100%' }}>
            <div className="card-header" >
              <h2>Welcome to House Price Predecter</h2>
            </div>

            {
              cities
                ? (<div className="card-body">
                  <form acceptCharset="utf-8">
                    <div className="row">
                  
                      <div className="col-md-6 form-group">
                        <label>Select the Location</label>
                        <select className="select-picker form-control" id="location" name="location" required="1" onChange={handleLocationChange} value={location}>
                          <option value="" >Please Slect</option>
                          {
                            cities.map((city, idx) => (<option value={city} key={idx}>{city}</option>))
                          }
                        </select>
                      </div>

                      <div className="col-md-6 form-group">
                        <label>Beds</label>
                        <input type='text' className="form-control" id="bed" name="bed" value={beds} placeholder="Enter Number of Beds" onChange={(e) => { setbed(e.target.value) }} />
                      </div>

                      <div className="col-md-6 form-group">
                        <label>Bathrooms</label>
                        <input type='text' className="form-control" id="bath" name="bath" value={baths} placeholder="Enter Number of Bathrooms" onChange={(e) => { setbath(e.target.value) }} />
                      </div>

                      <div className="col-md-6 form-group">
                        <label>Square Feet</label>
                        <input type='text' className="form-control" id="total_sqft" value={total_sqfts} name="total_sqft" placeholder="Enter Number of Square feet" onChange={(e) => { settotal_sqft(e.target.value) }} />
                      </div>

                      <div style={{paddingTop:"2vh"}}>
                      <div className="col-md-12 form-group">
                        <input type="submit" value=" - ~ Predict Price ~ - " class="btn btn-outline-dark" onClick={onClick} />
                      </div>
                      </div>
                    </div>

                  </form>

                  <div style={{paddingTop:"3vh"}}>
                  <div className="col-md-12">
                    <h3>LKR {prediction}</h3>
                  </div>
                  </div>

                </div>)
                : "Loading..."
            }

          </div>
        </div>
      </div>


    </div>
  );
}
