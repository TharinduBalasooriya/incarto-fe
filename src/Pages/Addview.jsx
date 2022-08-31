import React, { useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import style from './addview.module.css';
import NavBar from '../component/NavBar/NavBar'
import Imageview from '../component/Addview/Imageview';
import BedIcon from '@mui/icons-material/Bed';
import ShowerIcon from '@mui/icons-material/Shower';
import GarageIcon from '@mui/icons-material/Garage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function Addview() {
  const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
  const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [property, setproperty] = useState(false);

  const itemData = [

    {
      cols: 2,
      rows: 2
    },
    {
      rows: 1,
    },


  ];

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  useEffect(() => {
    setLoading(true);

    const getPropertyDetail = async () => {

      try {
        await axios
          .get(
            "http://localhost:9000/api/property/6309d16bab3d4544cb642548",
          )

          .then((res) => {
            console.log(res.data);
            console.log(res.data.images.url   );

            setproperty(res.data);
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getPropertyDetail();


  }, []);


  return (
    <div style={{ paddingBottom: '6vh' }}>
      <NavBar />


      <div style={{ paddingTop: '6vh', paddingLeft: '16vh' }}>
        <h2 className={`${style.text_sts}`}>{property.title}</h2>

        <div style={{ paddingLeft: '10vh' }}>  <p> <b className={`${style.price_txt}`}> LKR {property.price}</b >   {space}  <LocationOnIcon /> {property.district} </p> </div>

      </div>
      <div style={{ paddingLeft: '50vh' }}>
        <ImageList
          sx={{ width: 700, height: 500 }}
          variant="quilted"
          cols={2}
          rowHeight={110}
        >
          {itemData.map((item) => (
            <ImageListItem key={property.images} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(property.images, 121, item.rows, item.cols)}
                alt='error'
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>


      <div style={{ paddingLeft: '22vh' }}>
        <p>Bedrooms{space2} Bathrooms {space2} Parking{space} Land Size {space} House Size{' '}</p>
        <p><BedIcon /> {property.bedrooms} {space} <ShowerIcon /> {property.bathrooms} {space}<GarageIcon /> {property.parkingSpaces}{space}<SelectAllIcon /> {property.landSize} {property.landSizeUnit}{space2}{space2}<FullscreenIcon /> {property.houseSize}sq Ft</p>
      </div>

      <div style={{ paddingLeft: '22vh', paddingTop: '4vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h5 className={`${style.price_txt}`}> Property Description</h5>
            <p>{property.propertyDescription}</p>

          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <div style={{ paddingLeft: '1vh', paddingTop: '3vh' }}>
              <h6>Address : {property.address}</h6><br />
              <h6>Posted Date: {property.postedDate}</h6>
              <h6>Contact Number: {property.contactNumber}</h6>
              <h6>Negotiable: {property.negotiable}</h6>
            </div>

          </Grid>
          <Grid item xs={8} md={8}>
            <h5 className={`${style.price_txt}`}> Property On Map</h5>

            <img src="https://res.cloudinary.com/iplus/image/upload/v1649957404/new/new_ehcarp.png" alt="location" width={'550vh'} />
          </Grid>
        </Grid>



      </div>      </div >

  )
}
