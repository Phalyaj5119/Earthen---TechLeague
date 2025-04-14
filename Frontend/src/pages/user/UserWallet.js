import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserWallet.css';

export default function UserWallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/wallet', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(res.data.balance);
      setTransactions(res.data.transactions);
    } catch (err) {
      alert("Unable to fetch wallet details.");
    }
  };

  return (
    <div className="wallet-container">
      <h2>💰 Wallet</h2>
      <div className="wallet-balance">Balance: ₹{balance.toFixed(2)}</div>

      <h3>Transaction History</h3>
      <table className="wallet-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map(txn => (
            <tr key={txn.id}>
              <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
              <td>{txn.type}</td>
              <td>₹{txn.amount}</td>
              <td>{txn.description}</td>
            </tr>
          )) : <tr><td colSpan="4">No transactions found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
