import { FormControl, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { isTopicExists, saveTopic } from '../APIManager/topicsApi';
import { Topic } from '../Interface/model';
import { topicStyle } from '../Assets/modalStyle';

export function UpperSection() {
  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  const [data,setData]=useState<Topic>({TopicName:'',CreatedBy:'admin',CreatedAt:'',UpdatedAt:'',UpdatedBy:'admin',status:'True'}); 

  useEffect(() => {
  }, []);
  
  function HandleCancel() {
    handleClose();
  }

  function handleChange(e:any){
    console.log("topic name:",e.target.value);
    setData({ ...data, [e.target.name]: e.target.value })
    
  }

  async function HandleSave(e:any) {
    if(data.TopicName!==null && data.TopicName!==""){
      const res=await isTopicExists(data?.TopicName);
      if(res.data!==0){
        const res= await saveTopic(data);
       if(res?.status===200){
        alert("Topic Added Successfully");
        handleClose();
        localStorage.setItem("role",'admin');
       }
      }
      else{
        alert("Topic already exists");
      }
    }
    else{
        e.preventDefault();
    }
  }

  return (
    <div className='m-4'>
      <section className="jumbotron text-center">
        <div className="container">
          <h5 className="jumbotron-heading">...</h5>
          <p className="lead text-muted"></p>
        </div>
      </section>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={topicStyle} className="topicStyle">
          <FormControl fullWidth>
        <Typography id="modal-modal-title" variant="h6" component="h2">
                New Topic
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter Topic Name:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  type='text'
                  name='TopicName'
                  fullWidth
                  id="outlined-required"
                  label="Required"
                  defaultValue=""
                  onChange={handleChange}
                />
              </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button variant="contained" color="error" fullWidth onClick={HandleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth type='submit' onClick={HandleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
          </FormControl>
        </Box>
      </Modal>
    </div>
  )
}
 