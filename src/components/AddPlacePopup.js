import React from 'react'
import PopupWithForm from './PopupWithForm'
import {useState} from 'react'

export default function AddPlacePopup(props) {
const [title, setTitle] = useState(null)
const [url, setUrl] = useState(null)

const onChangeTitle = (e) => {
    setTitle(e.target.value)
}

const onChangeUrl = (e) => {
    setUrl(e.target.value)
}

const handleSubmit = (e) =>{
  e.preventDefault();
  props.onAddCard({
    name:title,
    link:url
  });
}

  return (
    <PopupWithForm isOpen={props.isOpen}  onClose={props.onClose} name = 'card' title = 'Новое место' onSubmit={handleSubmit}> 
    <div className="popup__field">
      <input type="text" className ="popup__input popup__input_type_name-card" name="title" placeholder="Название" minLength="2" maxLength="30" required onChange={onChangeTitle}/>
      <span className="popup__error-message title-input-error"></span>
    </div>
    <div className="popup__field">
      <input type="url" className="popup__input popup__input_type_url" name="url" placeholder="Ссылка на картинку" required onChange={onChangeUrl}/>
      <span className="popup__error-message url-input-error"></span>
    </div>
  </PopupWithForm> 
  )
}
