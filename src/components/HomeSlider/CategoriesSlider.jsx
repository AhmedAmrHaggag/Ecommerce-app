import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Categorieslider() {
  function getCategoriesSlider() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, isLoading } = useQuery('Categories', getCategoriesSlider);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 1,
    arrows: false,
  };



  return (
   
      <Slider {...settings}>
        {data?.data.data.map((product, idx) => (
          <div key={idx} className="col-md-2">

            <div className=' '>
            <img className="w-100" style={{ width: '100%', height: '300px' }} src={product.image} alt=""  />
              <div className=' '>
                <h4>{product.name}</h4>
              </div>
            </div>
            {console.log(product.image)}
          </div>
        ))}
      </Slider>
   
  );
}













