import React, { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'
import Card from './Card'

export default function Main(props) {
    const [cards, setCards] = useState([])
    const users = useContext(CurrentUserContext)

   useEffect(()=>{
    api.getInitialCards().then((cards)=>{
       setCards(cards)
    })
    .catch((e) => console.log(e))
   },[])

  return (
    <main>
      <section className="profile" >
        <div className="profile__row">
          <div className="profile__image" onClick={props.onEditAvatar}>
            <img src = {users.avatar} alt = 'Жак-Ив Кусто' className="profile__avatar" />
            <div className="profile__image-hover">
              <div className = "profile__icon"></div>
            </div>  
          </div>
          <div className="profile__info">
            <div className="profile__row-title">
              <h1 className="profile__title">{users.name}</h1>
              <button className="profile__create-btn" type="button" onClick={props.onEditProfile}/>
          </div>
          <p className="profile__subtitle">{users.about}</p>
          </div> 
        </div>
        <button className="profile__add-btn" type="button" onClick = {props.onAddPlace}/>
      </section>
      <section className="elements" >
        {cards.map((card, id)=><div key={id}><Card card={card} onCardClick={props.onCardClick} onCardLike = {props.onCardLike}/></div> )}
      </section>
    </main>
  )
}
