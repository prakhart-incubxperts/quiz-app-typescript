import { useState } from "react";
import { FormControl, Typography, TextField, Grid, Button } from "@mui/material";
import { Topic } from "../Interface/model";
import { editTopic, isTopicExists, isTopicNameExists, saveTopic } from "../APIManager/topicsApi";

export function TopicComponent(props:any){

    const initialTopicData:Topic={ TopicName: '', CreatedBy: 'admin', CreatedAt: '', UpdatedAt: '', UpdatedBy: 'admin', status: 'True' };
    const [topicData, setTopicData] = useState<Topic>(initialTopicData);


    function handleTopicChange(e: any) {
        setTopicData({ ...topicData, [e.target.name]: (e.target.value).toLowerCase() })
      }

      async function HandleTopicSave(e: any) {
        if (topicData.TopicName !== null && topicData.TopicName !== "") {
          const res = await isTopicExists((topicData?.TopicName).toLowerCase());
          if (res[0]?.TopicId <= 1 || res[0]?.TopicId === undefined) {
            const res = await saveTopic(topicData);
            if (res?.status === 200) {
              alert("Topic Added Successfully");
              //handleClose();
              props?.closeFunction();
              localStorage.setItem("role", 'admin');
              setTopicData(initialTopicData);
              props?.parentFunction();
              //fetchingTopicsdata();
            }
          }
          else {
            alert("Topic already exists");
          }
        }
        else {
          alert("Fields can't be empty")
          e.preventDefault();
        }
      }

      async function HandleTopicEdit(e: any) {
        debugger
        if (topicData.TopicName !== null && topicData.TopicName !== "") {
          const res = await isTopicNameExists(topicData.TopicName,props?.topicId);
          console.log("response:",res);
          
          if (res.length === 0) {
            const res = await editTopic(topicData.TopicName,props?.topicId);
            console.log("edittopic res:",res);
            
            if (res[0] === 1) {
              alert("Topic changed Successfully");
              //handleClose();
              props?.closeFunction();
              localStorage.setItem("role", 'admin');
              setTopicData(initialTopicData);
              props?.parentFunction();
              //fetchingTopicsdata();
            }
          }
          else {
            alert("Topic already exists");
          }
        }
        else {
          alert("Fields can't be empty")
          e.preventDefault();
        }
      }
      

      

    return(
        <FormControl fullWidth >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props?.topicButton==='edit'?'Edit topic':'New Topic'}
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
              defaultValue={props?.topic}
              onChange={handleTopicChange}
              className="form-label-group"
            />
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Button variant="contained" color="error" fullWidth onClick={props?.cancelFunction}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth type='submit' onClick={props?.topicButton==='edit'?HandleTopicEdit:HandleTopicSave}>
                {props?.topicButton==='edit'?'Save Changes':'Save'}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
    )
}