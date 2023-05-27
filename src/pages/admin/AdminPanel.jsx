import React, { useState } from "react";
import "./adminPanel.scss";

function AdminPanel() {
  const [createUserData, setCreateUserData] = useState({
    id: "",
    name: "",
    nickname: "",
    email: "",
    password: "",
    role: "",
  }); 

  const [updateUserData, setUpdateUserData] = useState({
    id: "",
    newName: "",
    newEmail: "",
  });
  const [deleteUserId, setDeleteUserId] = useState("");

  const handleCreateUserSubmit = (e) => {
    e.preventDefault();

    // Send create user request
    fetch("http://localhost:8080/user/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Create User Response:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }; 

  const handleUpdateUserSubmit = (e) => {
    e.preventDefault();

    // Send update user request
    fetch(`http://localhost:8080/user/update/${updateUserData.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updateUserData.newName,
        email: updateUserData.newEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update User Response:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDeleteUserSubmit = (e) => {
    e.preventDefault();

    // Send delete user request
    fetch(`http://localhost:8080/user/delete/${deleteUserId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete User Response:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="adminPanel">
      <div className="formContainer">
        <h2>Create User</h2>
        <form onSubmit={handleCreateUserSubmit}>
          <div className="formGroup">
            <label htmlFor="createUserId">ID</label>
            <input
              type="text"
              id="createUserId"
              value={createUserData.id}
              onChange={(e) =>
                setCreateUserData({ ...createUserData, id: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="createUserName">Name</label>
            <input
              type="text"
              id="createUserName"
              value={createUserData.name}
              onChange={(e) =>
                setCreateUserData({ ...createUserData, name: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="createUserNickname">Nickname</label>
            <input
              type="text"
              id="createUserNickname"
              value={createUserData.nickname}
              onChange={(e) =>
                setCreateUserData({ ...createUserData, nickname: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="createUserEmail">Email</label>
            <input
              type="email"
              id="createUserEmail"
              value={createUserData.email}
              onChange={(e) =>
                setCreateUserData({ ...createUserData, email: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="createUserPassword">Password</label>
            <input
              type="password"
              id="createUserPassword"
              value={createUserData.password}
              onChange={(e) =>
                setCreateUserData({ ...createUserData, password: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="createUserRole">Role</label>
            <input
              type="text"
              id="createUserRole"
              value={createUserData.role}
              onChange={(e) =>
                setCreateUserData({ ...createUserData, role: e.target.value })
              }
            />
          </div>

          <button type="submit">Create</button>
        </form>
      </div>

      <div className="formContainer">
        <h2>Update User</h2>
        <form onSubmit={handleUpdateUserSubmit}>
          <div className="formGroup">
            <label htmlFor="updateUserId">ID</label>
            <input
              type="text"
              id="updateUserId"
              value={updateUserData.id}
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, id: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="updateUserName">Name</label>
            <input
              type="text"
              id="updateUserName"
              value={updateUserData.name}
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, name: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="updateUserNickname">Nickname</label>
            <input
              type="text"
              id="updateUserNickname"
              value={updateUserData.nickname}
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, nickname: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="updateUserEmail">Email</label>
            <input
              type="email"
              id="updateUserEmail"
              value={updateUserData.email}
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, email: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label htmlFor="updateUserRole">Role</label>
            <input
              type="text"
              id="updateUserRole"
              value={updateUserData.role}
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, role: e.target.value })
              }
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>

      <div className="formContainer">
        <h2>Delete User</h2>
        <form onSubmit={handleDeleteUserSubmit}>
          <div className="formGroup">
            <label htmlFor="deleteUserId">ID</label>
            <input
              type="text"
              id="deleteUserId"
              value={deleteUserId}
              onChange={(e) => setDeleteUserId(e.target.value)}
            />
          </div>

          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
  
};

export default AdminPanel;