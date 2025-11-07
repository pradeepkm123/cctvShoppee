// Components/SupercoinPopup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import SupercoinInfoImage from '../assets/pdf/Supercoin.png';

const SupercoinPopup = ({ show, onClose }) => {
  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>SuperCoins Information</DialogTitle>
      <DialogContent>
        <img src={SupercoinInfoImage} alt="SuperCoins Info" style={{ width: '100%' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupercoinPopup;
