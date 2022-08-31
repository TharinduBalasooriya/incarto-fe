import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';





function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
export default function Imageview() {
    
  const itemData = [
    
    {
      img: 'https://res.cloudinary.com/iplus/image/upload/v1649945492/new/1_yvdd0a.jpg',
      cols: 2,
      rows:2
    },
    {
      img: 'https://res.cloudinary.com/iplus/image/upload/v1649945492/new/3_r8slim.jpg',
      rows:1,
    },
    {
      img: 'https://res.cloudinary.com/iplus/image/upload/v1649945492/new/5_sro8as.jpg',
    },
    {
      img: 'https://res.cloudinary.com/iplus/image/upload/v1649945492/new/4_rkrkkn.jpg',
      
    },
    {
      img: 'https://res.cloudinary.com/iplus/image/upload/v1649945492/new/2_uodjwk.jpg',
      
    },
    
  ];
  return (
   <div style={{  paddingLeft: '50vh' }}>
        <ImageList
      sx={{ width: 700, height: 500 }}
      variant="quilted"
      cols={2}
      rowHeight={110}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt='error'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}
