import React, { useEffect, useState } from 'react'
// import Avatar from '../images/Avatar.png'
import { api } from '../utils/Api'
import Card from './Card'

export default function Main(props) {

    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])

   useEffect(()=>{
    api.getUserInfo().then((users)=>{
        setUserAvatar(users.avatar)
        setUserName(users.name)
        setUserDescription(users.about)
    })
   },[])

   useEffect(()=>{
    api.getInitialCards().then((cards)=>{
       setCards(cards)
    })
   },[])

  return (
    <main>
      <section className="profile" >
        <div className="profile__row">
          <div className="profile__image" onClick={props.onEditAvatar}>
            <img src = {userAvatar} alt = 'Жак-Ив Кусто' className="profile__avatar" />
            <div className="profile__image-hover">
              <div className = "profile__icon"></div>
            </div>  
          </div>
          <div className="profile__info">
            <div className="profile__row-title">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__create-btn" type="button" onClick={props.onEditProfile}/>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
          </div> 
        </div>
        <button className="profile__add-btn" type="button" onClick = {props.onAddPlace}/>
      </section>
      <section className="elements" >
        {cards.map((card, id)=><div key={id}><Card card={card} onCardClick={props.onCardClick}/></div> )}
      </section>
    </main>
  )
}
