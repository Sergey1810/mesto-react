import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from '../utils/Api'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  useEffect(()=>{
    api.getUserInfo().then((users)=>{
       setCurrentUser(users)
       
    })
    .catch((e) => console.log(e))
   },[])

  const handleCardClick = (card) => {
    setSelectedCard({
      card : card,
      isOpen : true
    })
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard( {isOpen:false} )
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen( !isEditProfilePopupOpen )
}

const handleEditAvatarClick = () => {
  setIsEditAvatarPopupOpen( !isEditAvatarPopupOpen )
}

const handleAddPlaceClick = () => {
  setIsAddPlacePopupOpen( !isAddPlacePopupOpen )
}

function handleCardLike(item) {
 console.log(item.card)
//   const isLiked = card.likes.some(i => i._id === currentUser._id);
//   api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
//     setSelectedCard((state) => state.map((c) => c._id === card._id ? newCard : c));
// });
if(item.card.likes.some(like => like._id === currentUser._id)){
  api.setRemoveLike(item.card._id)
  .then((res) => {
    item = res
  })
  .catch(err => console.log(err))
}else{
  api.setAddLike(item.card._id)
  .then((res)=>{
    item = res
  })
  .catch(err => console.log(err))      
}}

const handleUpdateUser =(user)=>{
  api.setUserInfo(user.name, user.about).then((res) =>{
  setCurrentUser(res)
  closeAllPopups()
  }
  )
  .catch(err => console.log(err)) 
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
  <div className="body">
    <div className="page">
      <Header/>
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onCardClick = {handleCardClick}
        onCardLike = {handleCardLike}
        />
      <Footer/>
    </div>
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
    {/* <PopupWithForm isOpen={isEditProfilePopupOpen}  onClose={closeAllPopups} name = 'profile' title = 'Редактировать профиль'>
      <div className = "popup__field">
        <input type = "text" className = "popup__input popup__input_type_name" name="name" minLength="2" maxLength="40" required/>
        <span className = "popup__error-message name-input-error"></span>
      </div>
      <div className = "popup__field">
        <input type="text" className ="popup__input popup__input_type_job" name="job" minLength="2" maxLength="200" required/>
        <span className ="popup__error-message job-input-error"></span>
      </div>
    </PopupWithForm> */}
    <PopupWithForm isOpen={isAddPlacePopupOpen}  onClose={closeAllPopups} name = 'card' title = 'Новое место'> 
      <div className="popup__field">
        <input type="text" className ="popup__input popup__input_type_name-card" name="title" placeholder="Название" minLength="2" maxLength="30" required/>
        <span className="popup__error-message title-input-error"></span>
      </div>
      <div className="popup__field">
        <input type="url" className="popup__input popup__input_type_url" name="url" placeholder="Ссылка на картинку" required/>
        <span className="popup__error-message url-input-error"></span>
      </div>
    </PopupWithForm> 
    <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name = 'avatar' title = 'Обновить аватар'> 
      <div className="popup__field">
        <input type="url" className="popup__input popup__input_type_urls" name="urls" placeholder="Ссылка на картинку" required/>
        <span className="popup__error-message urls-input-error"></span>
      </div>
    </PopupWithForm> 
 
    <ImagePopup card = {selectedCard} onClose={closeAllPopups}/>
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
