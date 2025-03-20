import React from 'react'
import './imageZoom.css'

export default function ImageZoom(props) {
  return (
    <div className='container'>
        <img src={props.image_src} className='imgZoom'></img>
    </div>
  )
}
