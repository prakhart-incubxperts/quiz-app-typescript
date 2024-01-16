import { Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export function UpperSection(){
    const [open, setOpen] = useState(false);
     const handleOpen = () => { setOpen(true); };
     const handleClose = () => { setOpen(false); };
     const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height:300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };
     function handleTopic(){
        setOpen(true);
     }

     function HandleCancel(){
        handleClose();
     }

     function HandleSave(){

     }
    
    
    return(
        <div>
        <section className="jumbotron text-center">
        <div className="container">
          <h2 className="jumbotron-heading"></h2>
          <p className="lead text-muted">Challenge yourself...</p>
          
            <button  className="btn btn-primary my-2" onClick={handleTopic}>Add New Topic</button>&nbsp;
            <button  className="btn btn-primary my-2">Add New Questions</button>
         
        </div>
      </section>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Button variant="contained" color="error"  onClick={HandleCancel}>Cancel</Button>
          <Button variant="contained" onClick={HandleSave}>Save</Button>
          </Grid>
      </Modal>
    </div>
    )
}