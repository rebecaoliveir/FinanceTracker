import ReactDOM from 'react-dom/client';
import './all-data.css';
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";

function formatDate(dateString: any) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-indexed
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

interface User {
    _id: string; // Unique transaction ID
    userId?: string; // User ID associated with the transaction
    date: string; // Transaction date in ISO 8601 format
    description: string; // Transaction description
    amount: number; 
    category: string; 
    paymentMethod: string;
    campus: string; // New campus field
    __v?: number; 
}

// Component with main data
export const Alldata = () => {
  const { user } = useUser();
  const [financialRecords, setFinancialRecords] = useState<User[]>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    
    if (user) { 
      const fetchFinancialRecords = async () => {
        console.log(user)
        try {
          const response = await fetch("http://localhost:3100/financial-records/getAllByUserID", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error('Error fetching financial records');
          }
    
          const data = await response.json();
          
    
          console.log(data, user);
          
          const filteredData = data.filter((record: any) => record.campus === user.username);
          setFinancialRecords(filteredData); // Salva os dados filtrados no estado
  
        } catch (error) {
          console.error('Error fetching financial records:', error);
        }
      };
      fetchFinancialRecords(); 
    }

      console.log(user, "Chamada")
      
       
  }, [user]);


  

  // Filter the records based on the search query
  const filteredRecords = financialRecords.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="data-page">
      <h1>All Givers</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar" // Added the search-bar class here
      />
      
      {filteredRecords.length === 0 ? (
        <><h1>No Data Returned</h1></>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Campus</th> {/* New Campus Column */}
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(user => (
              <tr key={user._id}>
                <td>{user.description}</td>
                <td>{formatDate(user.date)}</td>
                <td>{user.amount}</td>
                <td>{user.category}</td>
                <td>{user.paymentMethod}</td>
                <td>{user.campus}</td> {/* Display campus */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
