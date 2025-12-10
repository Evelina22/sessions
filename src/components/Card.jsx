import React from 'react'

const Card = ({ img, title, category }) => {
    return (
        <div>
            <img src={img} alt="" />
            <h1>{title}</h1>
            <h2>{category}</h2>
        </div>
    )
}

export default Card
