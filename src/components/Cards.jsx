import React from 'react'
import Card from './Card'
import '../css/cards.css'

const Cards = ({data}) => {
  return (
    <div className='cards'>
     { 
      Array.isArray(data) ? data.map((dat,index)=>{
        console.log(dat.html_url)
            return <Card repository_name={dat.name} url={dat.html_url} key={dat.id} language={dat.language} forks_count={dat.forks} stars_count={dat.stargazers_count} />
      }) : ''
    }
    </div>
  )
}

export default Cards