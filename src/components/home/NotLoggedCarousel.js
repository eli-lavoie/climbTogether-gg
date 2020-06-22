import React from 'react'
import {UncontrolledCarousel} from 'reactstrap'
import './Carousel.css'


const items = [
  {
    src: 'https://i.ibb.co/6whNKwR/CTGG-MAIN-PAGE-IMAGE.png',
      header: "Welcome to ClimbTogether.gg"
  }
]

const NotLoggedCarousel = () => <UncontrolledCarousel items={items} />;

export default NotLoggedCarousel