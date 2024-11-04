import React from 'react';
import ReactDOM from 'react-dom/client';
import './all-data.css'

function formatDate(dateString: any) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() é zero-indexado
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

// Definindo um tipo para o usuário
interface User {
    _id: string; // ID único da transação
    userId?: string; // ID do usuário associado à transação
    date: string; // Data da transação em formato ISO 8601
    description: string; // Descrição da transação
    amount: number; // Valor da transação
    category: string; // Categoria da transação (ex: "Rent")
    paymentMethod: string; // Método de pagamento (ex: "Credit Card")
    __v?: number; // Versão do documento (geralmente usado pelo MongoDB)
  }

// Array de usuários
const users: User[] = [
    {
      _id: "671f684f92e8853ac59e8c97",
      date: "2024-10-28T10:32:47.858Z",
      description: "Rebeca",
      amount: 234,
      category: "Rent",
      paymentMethod: "Credit Card",
      
    },
    {
      _id: "6720e75292e8853ac59e8ce6",
      date: "2024-10-29T13:46:58.717Z",
      description: "Rebeca Cuba de Oliveira",
      amount: 100,
      category: "Offering",
      paymentMethod: "Credit Card",
    },
    {
      _id: "6722274eaade6571406f14b6",
      userId: "user_2o40tiLO65Gj9VIrnegJuLLmfvM",
      date: "2024-10-30T12:32:14.684Z",
      description: "hush",
      amount: 2872,
      category: "Offering",
      paymentMethod: "Credit Card",
     
    }
  ]

// Componente principal
export const Alldata = () => {
    return (
      <div className="data-page">
        <h1>Lista de Usuários</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.description}</td>
                <td>{formatDate(user.date)}</td>
                <td>{user.amount}</td>
                <td>{user.category}</td>
                <td>{user.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
