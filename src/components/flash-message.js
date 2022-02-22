import React, { useState, forwardRef, useImperativeHandle } from "react";
import {Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'


function MUIAlert(props) {
    return <Alert elevation={6} variant='filled' {... props} />
  }

const FlashMessage = forwardRef((props, ref) => {

  const [type, setType] = useState();
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [timer, setTimer] = useState(3000);


  const restartHideDuration = () => {

  }

  useImperativeHandle(ref, () => ({
    show(incomeMessage, incomeType) {
      //console.log(props.style)
      setType(incomeType)
      setShowSnackbar(true);
      setMessage(incomeMessage)
      setTimer(3000);
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  }

  return (
      <>
        <Snackbar 
        open={showSnackbar} 
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        autoHideDuration={timer} 
        onClose={handleClose}>
          <MUIAlert onClose={handleClose} severity={type}>
              {message}
          </MUIAlert>
        </Snackbar>
    </>
  );
});

export default FlashMessage;