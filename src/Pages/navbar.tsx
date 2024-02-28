import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FormControl, Grid, Modal, TextField, ToggleButtonGroup } from '@mui/material';
import {  useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import { topicStyle } from '../Assets/modalConstant';




export function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const [alignment, setAlignment] = useState('web');
  const [role, setRole] = useState('');

  function handleClickHome() {

  }

  const handleChange = (event: any, newAlignment: string,) => {
    setAlignment(newAlignment);
    if (newAlignment === 'user') {
      localStorage.setItem('role', (event.target.value));
    }
    else {
      handleOpen();
      event.preventDefault()
    }
  };

  function handleChangeAdminDetail(e: any) {
    setRole(e.target.value);
  }

  function HandleSave(e: any) {
    if (role === "admin") {
      localStorage.setItem('role', (role));
      handleClose();
    } else {
      alert("Wrong Credentials");
      e.preventDefault()
      //handleClose();
    }
  }

  function handleToggle(e: any) {
    console.log("event:", e.target.name);
    let name = e.target.name;
    handleChange(e, name);
  }


  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={'py-1'}>
        <AppBar position="absolute">
          <Toolbar>
            <ToggleButtonGroup
              value={alignment}
              aria-label=""
              onChange={handleChange}>
                <Button color="primary" className='mx-1' variant="contained" onClick={handleClickHome} href='/'><HomeIcon fontSize='large'/></Button>
            </ToggleButtonGroup>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quiz Mania
            </Typography>
            <Button color='primary' variant="contained" type='button' name='admin' value="admin" onClick={handleToggle} href='/'><AdminPanelSettingsIcon name='admin' fontSize='small'/>Admin</Button>
            <Button color='secondary' className='mx-2' variant="contained" type='button' name='user' value="user" onClick={handleToggle} href='/user'><PersonIcon name='user' fontSize='small'/>User</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={topicStyle}>
          <FormControl fullWidth>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Enter Admin User Name:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Required"
                defaultValue=""
                onChange={handleChangeAdminDetail}
              />
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Button variant="contained" color="error" fullWidth onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" fullWidth type='submit' href='/' onClick={HandleSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}