import { Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export function UpperSection() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>('');
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
  function handleTopic() {
    setType('newTopic')
    setOpen(true);
  }

  function HandleCancel() {
    handleClose();
  }

  function HandleSave() {
    alert("Topic Added Successfully")
  }

  function handleNewQuestion() {
    setType('newQuestion')
    setOpen(true);
  }


  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <h2 className="jumbotron-heading"></h2>
          <p className="lead text-muted">Challenge yourself...</p>
          <button className="btn btn-primary my-2" onClick={handleTopic}>Add New Topic</button>&nbsp;
          <button className="btn btn-primary my-2" onClick={handleNewQuestion}>Add New Questions</button>
        </div>
      </section>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {type === 'newQuestion' ?
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                New Question
              </Typography>
              <InputLabel id="demo-simple-select-label">Topic</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-multiple-name"
                value={""}
                label="Age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter Question:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Required"
                  defaultValue=""
                />
              </Typography>
            </Box> :
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                New Topic
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter Topic Name:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Required"
                  defaultValue=""
                />
              </Typography>
            </Box>}

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button variant="contained" color="error" fullWidth onClick={HandleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth onClick={HandleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>

  )
}