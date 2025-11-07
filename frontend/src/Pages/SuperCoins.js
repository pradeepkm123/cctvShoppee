// // SuperCoins.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Supercoin.css';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import Supercoin from '../assets/img/super_coin_icon.png';
// import SupercoinPopup from '../Components/Supercoinpopup';
// import CoinActivityPopup from '../Components/CoinActivityPopup';
// import Scworkingstep from '../assets/img/Scworkingstep.png';

// function SuperCoins() {
//   const [balance, setBalance] = useState(0);
//   const [message, setMessage] = useState('');
//   const [showSupercoinPopup, setShowSupercoinPopup] = useState(false);
//   const [showCoinActivityPopup, setShowCoinActivityPopup] = useState(false);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/supercoins/balance', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setBalance(response.data.balance);
//       } catch (err) {
//         setMessage('Failed to fetch balance');
//       }
//     };

//     fetchBalance();
//   }, []);

//   const handleInfoClick = () => {
//     setShowSupercoinPopup(true);
//   };

//   const handleActivityClick = () => {
//     setShowCoinActivityPopup(true);
//   };

//   const closeSupercoinPopup = () => {
//     setShowSupercoinPopup(false);
//   };

//   const closeCoinActivityPopup = () => {
//     setShowCoinActivityPopup(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="container-fluid px-5 py-5">
//         <div className="balance-header d-flex align-items-center">
//           <span style={{ whiteSpace: 'break-spaces' }}>SuperCoin Balance</span>
//           <img src={Supercoin} alt="SuperCoins" width={25} />
//           <span className="fw-bold ms-2">{balance}</span>
//         </div>
//         <div
//           className="activity-card d-flex align-items-center justify-content-between"
//           onClick={handleActivityClick}
//           style={{ cursor: 'pointer' }}
//         >
//           <div className="d-flex align-items-center">
//             <div className="activity-icon">
//               <i className="las la-lightbulb" style={{ fontSize: '1.5rem' }}></i>
//             </div>
//             <span className="fw-semibold">View Coin Activity</span>
//           </div>
//           <i className="las la-angle-right text-muted" style={{ fontSize: '20px' }}></i>
//         </div>
//         <div
//           className="info-card d-flex align-items-center justify-content-between"
//           onClick={handleInfoClick}
//           style={{ cursor: 'pointer' }}
//         >
//           <div className="d-flex align-items-center">
//             <i className="las la-coins me-3" style={{ fontSize: '1.7rem', color: '#ffd400' }}></i>
//             <h5 className="mb-0">What are SuperCoins?</h5>
//           </div>
//           <i className="las la-angle-right"></i>
//         </div>
//         <div className="working">
//           <h5 style={{ color: '#002357' }}>SuperCoins Made Simple: Earn, Spend & Save!</h5>
//           <div className="process py-3" style={{ justifySelf: 'center' }}>
//             <img src={Scworkingstep} style={{ height: '500px', objectFit: 'contain', borderRadius: '20px',width:'100%' }} alt="SuperCoins Working Steps" />
//           </div>
//         </div>
//       </div>

//       <SupercoinPopup show={showSupercoinPopup} onClose={closeSupercoinPopup} />
//       <CoinActivityPopup show={showCoinActivityPopup} onClose={closeCoinActivityPopup} />

//       <Footer />
//     </div>
//   );
// }

// export default SuperCoins;























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Supercoin.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Supercoin from '../assets/img/super_coin_icon.png';
import SupercoinPopup from '../Components/Supercoinpopup';
import CoinActivityPopup from '../Components/CoinActivityPopup';
import Scworkingstep from '../assets/img/Scworkingstep.png';

function SuperCoins() {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');
  const [showSupercoinPopup, setShowSupercoinPopup] = useState(false);
  const [showCoinActivityPopup, setShowCoinActivityPopup] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/supercoins/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (err) {
        setMessage('Failed to fetch balance');
      }
    };
    fetchBalance();
  }, []);

  const handleInfoClick = () => {
    setShowSupercoinPopup(true);
  };

  const handleActivityClick = () => {
    setShowCoinActivityPopup(true);
  };

  const closeSupercoinPopup = () => {
    setShowSupercoinPopup(false);
  };

  const closeCoinActivityPopup = () => {
    setShowCoinActivityPopup(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid px-5 py-5">
        <div className="balance-header d-flex align-items-center">
          <span style={{ whiteSpace: 'break-spaces' }}>SuperCoin Balance</span>
          <img src={Supercoin} alt="SuperCoins" width={25} />
          <span className="fw-bold ms-2">{balance}</span>
        </div>
        <div
          className="activity-card d-flex align-items-center justify-content-between"
          onClick={handleActivityClick}
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex align-items-center">
            <div className="activity-icon">
              <i className="las la-lightbulb" style={{ fontSize: '1.5rem' }}></i>
            </div>
            <span className="fw-semibold">View Coin Activity</span>
          </div>
          <i className="las la-angle-right text-muted" style={{ fontSize: '20px' }}></i>
        </div>
        <div
          className="info-card d-flex align-items-center justify-content-between"
          onClick={handleInfoClick}
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex align-items-center">
            <i className="las la-coins me-3" style={{ fontSize: '1.7rem', color: '#ffd400' }}></i>
            <h5 className="mb-0">What are SuperCoins?</h5>
          </div>
          <i className="las la-angle-right"></i>
        </div>
        <div className="working">
          <h5 style={{ color: '#002357' }}>SuperCoins Made Simple: Earn, Spend & Save!</h5>
          <div className="process py-3" style={{ justifySelf: 'center' }}>
            <img src={Scworkingstep} style={{ height: '500px', objectFit: 'contain', borderRadius: '20px', width: '100%' }} alt="SuperCoins Working Steps" />
          </div>
        </div>
      </div>
      <SupercoinPopup show={showSupercoinPopup} onClose={closeSupercoinPopup} />
      <CoinActivityPopup show={showCoinActivityPopup} onClose={closeCoinActivityPopup} />
      <Footer />
    </div>
  );
}

export default SuperCoins;
