import React from 'react'
import {UncontrolledCarousel} from 'reactstrap'
import './Carousel.css'


const items = [
  {
    src: 'https://am-a.akamaihd.net/image?quality=preserve&f=https://lolstatic-a.akamaihd.net/frontpage/apps/prod/playnow-global/en_US/328566a634ec929c4fc0ec5507c3b42a3bd4fb36/assets/img/cover-1.jpg',
      header: "Welcome to ClimbTogether.gg"
  }
]

const NotLoggedCarousel = () => <UncontrolledCarousel items={items} />;

export default NotLoggedCarousel