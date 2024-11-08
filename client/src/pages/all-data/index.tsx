import ReactDOM from 'react-dom/client';
import './all-data.css';
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from "@clerk/clerk-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
  const apiurl = import.meta.env.VITE_API_URL;
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const [financialRecords, setFinancialRecords] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  console.log(apiurl);
  useEffect(() => {
    if (user) { 
      const fetchFinancialRecords = async () => {
        try {
          const response = await fetch(`${apiurl}financial-records/getAllByUserID`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error('Error fetching financial records');
          }
          const data = await response.json();
          const filteredData = data.filter((record: any) => record.campus === user.username);
          setFinancialRecords(filteredData); // Salva os dados filtrados no estado
  
        } catch (error) {
          console.error('Error fetching financial records:', error);
        }
      };
      fetchFinancialRecords(); 
    }
  }, [user]);

  // Filter the records based on the search query
  const filteredRecords = financialRecords.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const generatePDF = () => {
    const input = pdfRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const margin = 15; // Custom margin in mm
        const imgWidth = pdf.internal.pageSize.width - 4 * margin;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = margin; // Start at the top margin

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + margin; // Add margin at the top of each new page
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('financial_records.pdf');
      });
    }
  };

  return (
    <div className="data-page">
      <h1>All Givers</h1>
      <div className='d-btn'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar" // Added the search-bar class here
        />
        <button className='btn' onClick={generatePDF}>PDF</button>
      </div>
      
      {/* Search Bar */}
      
      {filteredRecords.length === 0 ? (
        <><h1>No Data Returned</h1></>
      ) : (
        <div ref={pdfRef}>

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
        </div>
      )}
    </div>
  );
};
