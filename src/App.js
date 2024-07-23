import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3002/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async () => {
        try {
            await axios.post('http://localhost:3002/users', { name, age });
            fetchUsers();
            setName('');
            setAge('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3002/users/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUser = async (id) => {
        try {
            await axios.put(`http://localhost:3002/users/${id}`, { name: editName, age: editAge });
            setEditUserId(null);
            setEditName('');
            setEditAge('');
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setEditName(user.name);
        setEditAge(user.age);
    };

    return (
        <div>
            <h2>Add User</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={addUser}>Add</button>
            <h2>Get User by ID</h2>
            <input
                type="number"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => fetchUser(userId)}>Fetch User</button>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {editUserId === user.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editAge}
                                    onChange={(e) => setEditAge(e.target.value)}
                                />
                                <button onClick={() => updateUser(user.id)}>Update</button>
                                <button onClick={() => setEditUserId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {user.name} - {user.age}
                                <button onClick={() => handleEditClick(user)}>Edit</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {user && (
                <div>
                    <h3>User Details</h3>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Age: {user.age}</p>
                </div>
            )}
            <h2>Delete User by ID</h2>
            <input
                type="number"
                placeholder="User ID"
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => deleteUser(userId)}>Delete</button>
        </div>
    );
}

export default App;
