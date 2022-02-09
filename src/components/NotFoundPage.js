import React from 'react'

import '../css/notFoundPage.css';

import Image from '../assets/not_found_page_2.svg'

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <h1 className='not-found-text'>  Ooops </h1>
            <img className="not-found-img" src={Image} alt='not found page'/>

    <h1 className='not-found-text'>  parece que no podemos acceder a lo que solicitaste </h1>
            
        </div>
    )
}

export default NotFoundPage
