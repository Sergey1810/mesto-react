import React from 'react'
import clear from '../images/clear.svg'

export default function Card(props) {

    function handleClick() {
        props.onCardClick({
            link:props.card.link,
            name:props.card.name});
      }  

  return (  
  <div className="element">
    <img className="element__image" alt = {props.card.name} src = {props.card.link} onClick = {handleClick}/>
    <img src={clear} alt="" className="element__clear"/>
    <div className="element__block">
      <h2 className="element__title">{props.card.name}</h2>
      <div className='element__likes'>
        <button type="button" className="element__like"></button>
        <p className="element__like-info">{props.card.likes.length}</p>
      </div>
    </div>
  </div>
  )
}
