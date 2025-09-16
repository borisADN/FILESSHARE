import React, { useEffect, useState } from "react";
import "./FilesShare.css";
import { FaPaperclip, FaSearch, FaUsers } from "react-icons/fa";
import { IoChatbox, IoSettingsSharp } from "react-icons/io5";
import { IoIosPaperPlane } from "react-icons/io";
import axios from "axios";
import defaultAvatar from "../../../assets/default.jpg";
import Modal from "../../Modal/Modal";
import { motion } from "framer-motion"; // Importation de Framer Motion

export default function Group() {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler le modal
  const [selectedGroupAvatar, setSelectedGroupAvatar] = useState(defaultAvatar); // Pour stocker l'avatar du groupe sélectionné
  const [file, setFile] = useState(null); // État pour gérer le fichier sélectionné
  const [files, setFiles] = useState([]); 
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour le dropdown
  const [messages, setMessages] = useState([]); // Stocker les messages du groupe sélectionné
  const UserId = localStorage.getItem("UserId");

  useEffect(
    () => {
      // Fonction pour récupérer l'utilisateur à partir de l'API
      const fetchUser = async () => {
        try {
          // Appel à l'API en passant l'ID de l'utilisateur
          const response = await axios.get(
            `http://localhost:8000/api/filesshare/one_user/${UserId}`
          );
        //  console.log(response.data); // Afficher les données de l'utilisateur dans la console
          setUser(response.data); // Mettre à jour l'état avec les données de l'utilisateur
          // Arrêter l'affichage de l'état de chargement
        } catch (error) {
          console.log(error);

          // setError(error.response ? error.response.data.message : 'An error occurred');
        }
      };

      fetchUser();
    },
    [UserId]
  );

useEffect(() => {
  const fetchGroups = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/filesshare/SelectGroups/${UserId}`);
    //   console.log(response.data); // Afficher les données des groupes dans la console
      setGroups(response.data.groups);
    } catch (error) {
      console.log(error);
    }
  };
  fetchGroups();
}, []);

useEffect(() => {
    if (selectedGroupId) {
      const fetchFiles = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/filesshare/getFiles/${selectedGroupId}`);
          // console.log(response.data.files); // Afficher les données des fichiers dans la console
          setFiles(response.data.files);
        } catch (error) {
          console.log(error);
        }
      };
      fetchFiles();
    }
  }, [selectedGroupId]); // Recharger les messages chaque fois que selectedGroupId change

   // Charger les discussions du groupe sélectionné
  //  useEffect(() => {
  //   if (selectedGroupId) {
  //     const fetchMessages = async () => {
  //       try {
  //         const response = await axios.get(`http://localhost:8000/api/filesshare/getMessages/${selectedGroupId}`);
  //         setMessages(response.data.messages); // Met à jour les messages du groupe sélectionné
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchMessages();
  //   }
  // }, [selectedGroupId]); // Recharger les messages chaque fois que selectedGroupId change

  const handleSendFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/filesshare/sendFile/${UserId}/${selectedGroupId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.originalName);
      setUploadedFileName(response.data.originalName);
    } catch (error) {
      console.log(error);
    }
  }

  // Fonction pour ouvrir le modal
  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };
  // Fonction pour basculer l'affichage du dropdown
     const toggleDropdown = () => {
       setIsDropdownOpen(!isDropdownOpen);
     };
     // Configuration de l'animation du dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20, // Fait remonter le dropdown au départ
      scale: 0.8 // Réduit la taille du dropdown pour un effet d'apparition fluide
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6, // Durée de l'animation
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const handleGroupClick = (groupId, groupAvatar, groupName) => {
    setSelectedGroupId(groupId); // Met à jour l'état avec l'ID du groupe sélectionné
    setSelectedGroupAvatar(groupAvatar ? groupAvatar : defaultAvatar); // Met à jour l'avatar du groupe sélectionné
    setSelectedGroupName(groupName); // Met à jour le nom du groupe sélectionné
};

const handleFileChange = (e) => {
  setFile(e.target.files[0]); // Stocke le fichier sélectionné
};



  return (
    <div className="filesShare">
      <div className="main-container">
        <div className="left-container">
          <div className="header" id="header">
            <div
              className="user-img"
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            >
              {user
                ? <img
                    className="img-cover"
                    id="profile-image"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)"
                    }}
                    src={user.avatar}
                    alt="User"
                  />
                : <img
                    className="img-cover"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)"
                    }}
                    src={defaultAvatar}
                    alt="User"
                  />}
            </div>
            <div className="nav-icons">
              <li>
                <i className="fa-solid fa-magnifying-glass" />
              </li>
              <li>
                <i className="fa-solid fa-ellipsis-vertical" />
              </li>
            </div>
            <a href="/filesshare/chat" title="Discussions privées">
              <IoChatbox size={25} color="white" />
              {/* <FaUsers  size={40} color="white"/> */}
            </a>
          </div>

          <div className="search-container">
            {/* <FaSearch /> */}
            <div className="input">
              <input type="text" placeholder="Rechercher" />
            </div>
          </div>

          <div className="chat-list">
            {
          
           
              groups.map((group) => (
                <div className={`chat-box ${selectedGroupId === group.id ? "active" : ""}`} key={group.id} onClick={() => handleGroupClick(group.id, group.avatar,group.name)}>
                  <div className="">
                    <img
                      className="img-cover"
                      style={{ width: "50px", height: "50px", borderRadius: "50%",boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" }}
                       src={group.avatar } 
                      alt=""
                    />
                  </div>

                  <div className="chat-details">
                    <div className="text-head">
                      <h4>{group.name}</h4>
                    </div>
                  </div>
                </div>
              ))
            }
  
          </div>
          <hr />
          {/* Mettre un truc ici */}
          <p
            style={{
              color: "blue",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          >
            Discussions De Groupe
          </p>
        </div>

        <div className="right-container">
        <div className="header">
            <div className="img-text">
              <div className="user-img">
                <img
                     style={{ width: "50px", height: "50px", borderRadius: "50%",boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" }}
                  className={selectedGroupId ? "" : "hidden"}
                  src={selectedGroupAvatar} // Affiche l'avatar du groupe sélectionné
                  alt="Group Avatar"
                />
              </div>
              <h4 className={selectedGroupId ? "" : "hidden"}>{selectedGroupName || "Sélectionnez un groupe"}</h4> {/* Affiche le nom du groupe sélectionné */}
            </div>
            <div className="nav-icons">
              <FaSearch className={selectedGroupId ? "" : "hidden"} style={{ cursor: "pointer" }} size={25} />
              <i className={`fa-solid fa-ellipsis-vertical ${selectedGroupId ? "" : "hidden"}`} />
              <IoSettingsSharp onClick={toggleDropdown} className={selectedGroupId ? "" : "hidden"} style={{ cursor: "pointer" }} size={25} />
              {isDropdownOpen && (
                <motion.ul 
                  className="dropdown-menu"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                    <a href="/create" style={{ zIndex: 1 }}>Nouveau Groupe</a><br /><br />
                    <a href= {`add/${selectedGroupId}`} style={{ zIndex: 1 }}>Ajouter un membre</a><br /><br />
                    {/* <a href="chdhdhdh" style={{ zIndex: 1 }}>Nouveau Groupe</a> */}
                  
                </motion.ul>
              )}
            </div>
            </div>


          <div className="chat-container">
            <h1>FIchiers de ce groupe</h1>
            {files.length > 0 ? (
              files.map((fileData, index) => (
                <a target="_blank" href={`http://localhost:8000/uploads/${fileData}`} key={index} className={`message-box`}>
                  <p style={{color:"blue",fontWeight:"bold"}}>{fileData}</p>
                </a>
              ))
            ) : (
              <p>Aucun fichier pour ce groupe.</p>
            )}
            
            {/* {selectedGroupId ? (
              messages.length > 0 ? (
                messages.map((message, index) => (
                  <div key={index} className={`message-box ${message.isMyMessage ? "my-message" : "friend-message"}`}>
                    <p>
                      {message.content}
                      <br />
                      <span>{message.timestamp}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p>Aucun message pour ce groupe.</p>
              )
            ) : (
              <p>Sélectionnez un groupe pour voir les discussions.</p>
            )} */}
          </div>

          <div className="chatbox-input">
            <FaPaperclip
              size={30}
              style={{ marginLeft: "10px" }}
              color="blue"
              onClick={() => document.getElementById('fileInput').click()} // Ouvre le sélecteur de fichier
            />
             <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <input type="text" placeholder="Type a message" />
            <IoIosPaperPlane
              size={30}
              style={{ marginRight: "10px" }}
              color="blue"
              onClick={handleSendFile}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} user={user} />
    </div>
  );
}
