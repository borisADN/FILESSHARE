import React, { useEffect, useState } from "react";
import "./FilesShare.css";
import { FaPaperclip, FaSearch, FaUsers } from "react-icons/fa";
import { IoChatbox, IoSettingsSharp } from "react-icons/io5";
import { IoIosPaperPlane } from "react-icons/io";
import axios from "axios";
import Modal from "../../Modal/Modal";
import defaultAvatar from "../../../assets/default.jpg";

export default function filesShare() {
  const[users,setUsers]=useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler le modal
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    const fetchUsers = async () => {
        //apres cette fonction doit se charger toute les 10s pour recuperer les utilisateurs
        try {
            const response = await axios.get('http://localhost:8000/api/filesshare/all_users'); // Remplace par l'URL de ton API
            console.log(response.data);
            
            setUsers(response.data); // Met à jour l'état avec les utilisateurs récupérés
        } catch (err) {
            console.log(err);
             // Met à jour l'état d'erreur en cas de problème
        }
    };

    fetchUsers(); // Appel de la fonction pour récupérer les utilisateurs
}, []); // Le tableau vide signifie que l'effet s'exécute une seule fois après le premier rendu

useEffect(() => {
    // Fonction pour récupérer l'utilisateur à partir de l'API
    const fetchUser = async () => {
      try {
        // Appel à l'API en passant l'ID de l'utilisateur
        const response = await axios.get(`http://localhost:8000/api/filesshare/one_user/${UserId}`);
        console.log(response.data); // Afficher les données de l'utilisateur dans la console
        setUser(response.data); // Mettre à jour l'état avec les données de l'utilisateur
  // Arrêter l'affichage de l'état de chargement
      } catch (error) {
        console.log(error);
        
        // setError(error.response ? error.response.data.message : 'An error occurred');
      }
    };

    fetchUser();
  }, [UserId]); 

 // Fonction pour ouvrir le modal
 const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="filesShare">
      <div className="main-container">
        <div className="left-container">
          <div className="header" id="header">
          <div className="user-img" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              {user ? (
                <img
                  className="img-cover" id="profile-image"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)"
                  }}
                  src={user.avatar}
                  alt="User"
                />
              ) : (
                <img
                  className="img-cover"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)"
                  }}
                  src={defaultAvatar}
                  alt="User"
                />
              )}
            </div>
            <div className="nav-icons">
              <li>
                <i class="fa-solid fa-magnifying-glass" />
              </li>
              <li>
                <i class="fa-solid fa-ellipsis-vertical" />
              </li>
              {/* <IoChatbox /> */}
            </div>
            <a href="/filesshare/group" title="Aller à Discussions de groupe">

              <FaUsers  size={40} color="white"/>
            </a>
          </div>

          <div className="search-container">
            {/* <FaSearch /> */}
            <div className="input">
                <input type="text" placeholder="Rechercher" />
            </div>
          </div>

          <div className="chat-list">
            {users.map((user) => (
              <div className="chat-box" key={user.id}
              >
                <div className="">
                  <img
                    className="img-cover" 
                    style={{ width: "50px", height: "50px", borderRadius: "50%",boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" }}
                    src={user.avatar}
                    alt="User"
                  />
                </div>
                <div className="chat-details">
                  <div className="text-head">
                  <h4>{user.id === parseInt(UserId) ? "Vous" : user.name}</h4>
                  </div>
                </div>
              </div>
            ))}
            

            

            {/* <div className="chat-box active">
              <div className="img-box">
                <img
                  className="img-cover"
                  src="https://images.pexels.com/photos/2474307/pexels-photo-2474307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="User"
                />
              </div>
              <div className="chat-details">
                <div className="text-head">
                  <h4>Leo</h4>
                </div>
              </div>
            </div> */}

            

           

          

    
          </div>
          <hr />
          {/* Mettre un truc ici */}
          <p style={{ color: "blue" , textAlign: "center",fontSize: "20px", fontWeight: "bold"}}>Discussions</p>
        </div>

        <div className="right-container">
          <div className="header">
            <div className="img-text">
              <div className="user-img">
                <img
                  className="dp"
                  src="https://images.pexels.com/photos/2474307/pexels-photo-2474307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="User"
                />
              </div>
              <h4>Leo<br /><span style={{ color: "#adb5bd" }}>Leo@gmail.com</span></h4>
          
            </div>
            <div className="nav-icons">
              <FaSearch />
              <i class="fa-solid fa-ellipsis-vertical" />
              <i class="fa-solid fa-ellipsis-vertical" />
              <IoSettingsSharp />
            </div>
          </div>

          <div className="chat-container">
            <div className="message-box my-message">
              <p>Bonjour!<br/><span>07:45</span></p>
            </div>

            <div className="message-box friend-message">
              <p>Bonjour!<br/><span>07:45</span></p>
            </div>
          </div>
          
<div className="chatbox-input">
<FaPaperclip size={30} style={{marginLeft:"10px"}} color="blue"/>
<input type="text" placeholder="Type a message" />
<IoIosPaperPlane size={30}  style={{marginRight:"10px"}} color="blue" />
</div>

        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} user={user} />
    </div>
  );
}
