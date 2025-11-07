// import React from 'react';
// import '../assets/css/CoinActivityPopup.css';
// import Supercoin from '../assets/img/super_coin_icon.png';

// function TransactionHistory() {
//   return (
//     <div>
//         <div className="transaction-section">
//             <h5 className="transaction-header">Transaction History</h5>

//             <div className="transaction-note">
//               Regular coins issued from Aug 1, 2023 will have 6 months validity from the date of credit. The validity of extra coins may vary from 1 to 6 months depending on the product & seller.
//             </div>

//             <div className="transaction-item">
//               <div className="transaction-details">
//                 <h6>thegameium</h6>
//                 <small>Credited on 05 Dec 2024 | Valid till 31 Dec 2025</small>
//               </div>
//               <div className="transaction-amount positive">+ 249</div>
//             </div>

//             <div className="transaction-item">
//               <div className="transaction-details">
//                 <h6>thegameium</h6>
//                 <small>Debited on 05 Dec 2024</small>
//               </div>
//               <div className="transaction-amount negative">- 249</div>
//             </div>

//             <div className="transaction-item">
//               <div className="transaction-details">
//                 <h6>Redeem for Myntra store OrderId: 12851894...</h6>
//                 <small>Debited on 04 Dec 2024</small>
//               </div>
//               <div className="transaction-amount negative">- 28</div>
//             </div>
//           </div>
//     </div>
//   )
// }

// export default TransactionHistory

import React, { useState, useEffect } from 'react';
import Supercoin from '../assets/img/super_coin_icon.png';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/supercoins/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div style={{ padding: '10px' }}>Loading transactions...</div>;
  }

  if (error) {
    return <div style={{ padding: '10px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '15px' }}>
      <h5 style={{ marginBottom: '8px', fontWeight: '600' }}>Transaction History</h5>
      <div
        style={{
          fontSize: '13px',
          color: '#001b47',
          marginBottom: '10px',
          backgroundColor:'#e3f2fd',
          padding:'15px',
          borderRadius:'5px'
        }}
      >
        Regular coins issued from Aug 1, 2023 will have 6 months validity from the date of credit. The validity of extra coins may vary from 1 to 6 months depending on the product & seller.
      </div>

      <div
        style={{
          maxHeight: '350px',
          overflowY: 'auto',
          paddingRight: '8px',
          scrollbarWidth: 'thin',
        }}
      >
        {transactions.length === 0 ? (
          <div
            style={{
              backgroundColor: '#f9f9f9',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p>No transactions found.</p>
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h6 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                  {transaction.orderId
                    ? `Order ID: ${transaction.userId}`
                    : transaction.transactionType === 'earned'
                    ? 'Credited from Purchase'
                    : 'Redeemed'}
                </h6>
                <small style={{ fontSize: '12px', color: '#666' }}>
                  {transaction.transactionType === 'earned' ? 'Credited' : 'Debited'} on{' '}
                  {new Date(transaction.date).toLocaleDateString()} |
                  {transaction.transactionType === 'earned' && (
                    <span>
                      {' '}
                      Valid till{' '}
                      {new Date(
                        new Date(transaction.date).setMonth(
                          new Date(transaction.date).getMonth() + 6
                        )
                      ).toLocaleDateString()}
                    </span>
                  )}
                </small>
              </div>

              <div
                style={{
                  fontWeight: 'bold',
                  color:
                    transaction.transactionType === 'earned' ? 'green' : 'red',
                  fontSize: '15px',
                }}
              >
                {transaction.transactionType === 'earned' ? '+' : '-'}
                {transaction.coins}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
