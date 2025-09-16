import React, { useState } from "react";

import "./Creating.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Creating() {
  const [name, setName] = useState("");
  const Admin_id = localStorage.getItem("UserId");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/filesshare/CreateGroup",
      {
        admin_id: Admin_id,
        name: name,
        description: description
      }
    );

    if (response.status === 201) {
toast.success(response.data.message);
navigate("/filesshare/group");

    }else{
        toast.error(response.data.message);    
    }
  };
  return (
    <div className="creating">
      <form action="" onSubmit={handleSubmit}>
        <h1>Nouveau Groupe</h1>
        <label htmlFor="">Nom Du Groupe</label> <br />
        <input
          type="text"
          name=""
          id=""
          onChange={e => setName(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="">Description</label> <br />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={e => setDescription(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Creer</button>
      </form>
    </div>
  );
}
