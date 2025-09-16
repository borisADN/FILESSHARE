import React, { useState } from "react";
import "./Authentication.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/filesshare.png";
import toast from "react-hot-toast";
import axios from "axios";

export default function Authentication() {
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const navigate = useNavigate();

  const handle_register = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne sont pas identiques.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/filesshare/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Inscription reussie!");
      // Nettoyer les champs du formulaire
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAvatar(null);
      setRightPanelActive(false);
    } catch (error) {
      // Gestion des erreurs de validation retournées par l'API
      if (error.response && error.response.data && error.response.data.data) {
        const errors = error.response.data.data;

        // Gestion des erreurs spécifiques par champ
        if (errors.name) {
          errors.name.forEach(err => {
            toast.error(err); // Affiche chaque erreur pour le nom
          });
        }

        if (errors.email) {
          errors.email.forEach(err => {
            toast.error(err); // Affiche chaque erreur pour l'email
          });
        }

        if (errors.password) {
          errors.password.forEach(err => {
            toast.error(err); // Affiche chaque erreur pour le mot de passe
          });
        }

        if (errors.password_confirmation) {
          errors.password_confirmation.forEach(err => {
            toast.error(err); // Affiche chaque erreur pour la confirmation du mot de passe
          });
        }

        if (errors.avatar) {
          errors.avatar.forEach(err => {
            toast.error(err); // Affiche chaque erreur pour l'avatar
          });
        }
      } else {
        // Si aucune erreur spécifique n'est renvoyée, on affiche un message générique
        toast.error("Erreur lors de l'inscription: Veuillez réessayer.");
      }
    }
  };

  const handle_login = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/filesshare/login",
        {
          email: email1,
          password: password1
        }
      );
      toast.success("Connexion reussie!");
      navigate('/filesshare/chat')
      //nettoyer
      // setName("");
      setEmail1("");
      setPassword1("");
      // console.log(response.data.user.id);
      
      localStorage.setItem('UserId', response.data.user.id);
      // setRightPanelActive(false);
    } catch (error) {
      // Gestion des erreurs de validation retournées par l'API
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        
        // Si aucune erreur spécifique n'est renvoyée, on affiche un message générique
        toast.error("Erreur lors de la connexion: Veuillez réessayer.");
      }
      // toast.error("Erreur lors de la connexion: Veuillez réessayer.");
    }
  };
  return (
    <div className="authentication">
      <div
        className={`container ${isRightPanelActive
          ? "right-panel-active"
          : ""}`}
        id="main"
      >
        <div className="sign-up">
          <form
            onSubmit={handle_register}
            method="post"
            encType="multipart/form-data"
          >
            <h1>Inscription</h1>
            <input
              type="text"
              placeholder="Nom"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmez votre mot de passe"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="">
              Photo de profil{" "}
              <span style={{ display: "inline" }}>(Obligatoire)</span>
            </label>
            <input
              type="file"
              name=""
              id=""
              onChange={e => setAvatar(e.target.files[0])}
            />
            <button type="submit">S'inscrire</button>
          </form>
        </div>

        <div className="sign-in">
          <form onSubmit={handle_login}>
            <h1>Connexion</h1>
            <input type="email" placeholder="Email" required  value={email1} onChange={e => setEmail1(e.target.value)} />
            <input type="password" placeholder="Mot de passe" required  value={password1} onChange={e => setPassword1(e.target.value)}/>
            <button type="submit">Se connecter</button>
            <a href="#">Mot de passe oublié?</a>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-left">
              <img src={logo} alt="logo" />
              <h1>Bienvenue</h1>
              <p>
                Pour vous inscrire et commencer, renseignez vos informations
                personnelles.
              </p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(false)}
                id="signIn"
              >
                Se Connecter
              </button>
            </div>
            <div className="overlay-right">
              <img src={logo} alt="logo" />
              <h1>Salut, l'ami!</h1>
              <p>Connectez-vous à votre compte ou créez-en un!</p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(true)}
                id="signUp"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
