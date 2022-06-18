import React from 'react'
import '../css/card.css'
import {faCodeFork, faStar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Card = ({repository_name,url,language,stars_count,forks_count}) => {
  return (
    <div className='card' >
        <a className='card-repo' target='_blank' href={url}>{repository_name}</a>
        <p id='break'></p>
        <p className='card-lang'>{language ? language : 'Dart'}</p>
        <span className='card-fork'><FontAwesomeIcon icon={faCodeFork}/>{forks_count}</span>
        <span className='card-star'><FontAwesomeIcon icon={faStar}/>{stars_count}</span>
    </div>
  )
}

export default Card