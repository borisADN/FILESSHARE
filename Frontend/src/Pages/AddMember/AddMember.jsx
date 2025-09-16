import React, { useState } from 'react';
import './AddMember.css';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'; // Import axios

export default function AddMember() {
    const [email, setEmail] = useState(""); // État pour stocker l'email de l'utilisateur
    const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement
    const { id } = useParams(); // Utilisation de useParams pour récupérer l'ID du groupe depuis le composant parent

    const handleSubmit = async e => {
    
        e.preventDefault();
        if (!email) {
            toast.error("Veuillez entrer un email.");
            // console.log(groupId);
            
            return;
        }
        
        setIsLoading(true); // Désactiver le bouton pendant l'appel
        try {
            const response = await axios.post(`http://localhost:8000/api/filesshare/AddMember/${id}`, {
                email: email
            });

            console.log(response);
            if (response.status === 200 || response.status === 201) {
                toast.success(response.data.message);
                setEmail(""); 
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("L'utilisateur est déjà membre de ce groupe.");
            } else if (error.response && error.response.status === 404) {
                toast.error("Utilisateur non trouvé, invitation envoyée.");
            } else if (error.response && error.response.status === 422) {
                toast.error("Erreur de validation. Vérifiez l'email.");
            } else {
                toast.error("Erreur interne du serveur. Veuillez réessayer.");
            }
        } finally {
            setIsLoading(false); // Réactiver le bouton
        }
    };

    return (
        <div className='add-member'>
            {/* {console.log(id)}; */}
            
            <h1>Ajouter Un Membre</h1>
            <p>Voulez-vous ajouter un nouveau membre ? Tapez son email dans le champ ci-dessous !</p>
            <p>S'il est déjà inscrit sur l'application, il recevra un email de confirmation.</p>
            <p>Dans le cas contraire, il sera ajouté au groupe lors de sa connexion sur FilesShare.</p>
            <div>
                <input
                    type="email" // Ajout d'un type email pour validation HTML5
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isLoading} // Désactiver le champ pendant le chargement
                />
                <button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Ajout..." : "Ajouter"} {/* Afficher l'état du chargement */}
                </button>
            </div>
        </div>
    );
}
