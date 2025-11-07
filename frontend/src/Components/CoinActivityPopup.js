// // Components/CoinActivityPopup.js
// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import '../assets/css/CoinActivityPopup.css';
// import Supercoin from '../assets/img/super_coin_icon.png';
// import TransactionHistory from './TransactionHistory';

// const CoinActivityPopup = ({ show, onClose }) => {
//   return (
//     <Dialog open={show} onClose={onClose}>
//       <DialogTitle><h5>Coin Activity</h5></DialogTitle>
//       <DialogContent>
//         <div className="container-fluid p-0">

//           <div className="balance-section">
//             <div className="d-flex justify-content-center align-items-center mb-2">
//               <div className="coin-icon">
//                 <img src={Supercoin} alt="SuperCoins" width={25} />
//               </div>
//               <h1 className="balance-amount">4260</h1>
//             </div>
//             <p className="balance-label mb-0">Available Balance</p>
//           </div>

//           <div className="info-cards">
//             <div className="info-icon">
//                 <i class="las la-hourglass-start"></i>
//             </div>
//             <div>
//               <p className="info-text">
//                 <span className="info-title"><img src={Supercoin} alt="SuperCoins" width={15} /> 84 SuperCoins on the way</span><br />
//                 SuperCoins are credited after the return period is over for all items in the order
//               </p>
//             </div>
//           </div>

//           <div className="warning-card">
//             <div className="warning-icon">
//                 <img src={Supercoin} alt="SuperCoins" width={20} />
//             </div>
//             <p className="warning-text">1020 SuperCoins due to expire in 16 days</p>
//           </div>

//           <button className="use-coins-btn">Use SuperCoins</button>
//           <TransactionHistory/>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CoinActivityPopup;







import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import '../assets/css/CoinActivityPopup.css';
import Supercoin from '../assets/img/super_coin_icon.png';
import TransactionHistory from './TransactionHistory';
import axios from 'axios';

const CoinActivityPopup = ({ show, onClose }) => {
  const [balance, setBalance] = useState(0);
  const [pendingCoins, setPendingCoins] = useState(0);
  const [expiringCoins, setExpiringCoins] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const balanceResponse = await axios.get('http://localhost:5000/api/supercoins/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(balanceResponse.data.balance);
        // Mock data for pending and expiring coins
        setPendingCoins(84);
        setExpiringCoins(1020);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle><h5>Coin Activity</h5></DialogTitle>
      <DialogContent>
        <div className="container-fluid p-0">
          <div className="balance-section">
            <div className="d-flex justify-content-center align-items-center mb-2">
              <div className="coin-icon">
                <img src={Supercoin} alt="SuperCoins" width={25} />
              </div>
              <h1 className="balance-amount">{balance}</h1>
            </div>
            <p className="balance-label mb-0">Available Balance</p>
          </div>
          <div className="info-cards">
            <div className="info-icon">
              <i className="las la-hourglass-start"></i>
            </div>
            <div>
              <p className="info-text">
                <span className="info-title"><img src={Supercoin} alt="SuperCoins" width={15} /> {pendingCoins} SuperCoins on the way</span><br />
                SuperCoins are credited after the return period is over for all items in the order
              </p>
            </div>
          </div>
          <div className="warning-card">
            <div className="warning-icon">
              <img src={Supercoin} alt="SuperCoins" width={20} />
            </div>
            <p className="warning-text">{expiringCoins} SuperCoins due to expire in 16 days</p>
          </div>
          <button className="use-coins-btn">Use SuperCoins</button>
          <TransactionHistory />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoinActivityPopup;
