import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageRoles() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const handleDelete = async (userId) => {
    await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  return (
    <div className="admin-section">
      <h2>Manage Roles / Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email}) - Role: {user.role}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
