import React from 'react'
import PopupWithForm from './PopupWithForm'
import {useRef} from 'react'

export default function EditAvatarPopup(props) {
    
  const avatarRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value = ''
  } 

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name = 'avatar' title = 'Обновить аватар' onSubmit={handleSubmit}> 
      <div className="popup__field">
        <input ref = {avatarRef} type="url" className="popup__input popup__input_type_urls" name="urls" placeholder="Ссылка на картинку" required/>
        <span className="popup__error-message urls-input-error"></span>
      </div>
    </PopupWithForm> 
  )
}
