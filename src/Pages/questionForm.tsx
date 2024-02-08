import { FormControl, Typography, Slider, Box, TextField, Select, MenuItem, Checkbox, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { OptionData, QuestionData } from "../Interface/model";
import { editOption, saveOptions } from "../APIManager/optionsApi";
import { EditQuestion, getQuestionByDescription, saveQuestion } from "../APIManager/questionsApi";

export function QuestionForm(props:any){
    const initialQuestionData:QuestionData={ QuestionDescription: '', DifficultyLevel: 1, CreatedBy: 'admin', CreatedAt: '', UpdatedBy: 'admin', UpdatedAt: '', status: 'Active', TopicId: 0, QuestionId: 0 };
    const initialOptionData:OptionData={ Option1: '', Option2: '', Option3: '', Option4: '', CorrectOption: 0, CreatedAt: '', CreatedBy: 'admin', UpdatedBy: 'admin', UpdatedAt: '', status: 'Active', QuestionId: 0 };
    const [questionData, setQuestionData] = useState<QuestionData>(props?.qData);
    const [optionsData, setOptionsData] = useState<OptionData>(props?.options);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [val, setVal] = useState(0);
    console.log("props in qf:",props);
    
    useEffect(() => {
        setQuestionData(props?.qData);
        setOptionsData(props?.options);
      }, [props]);

    const marks = [
        {
          value: 1,
          label: 'Easy',
        },
        {
          value: 2,
          label: 'Medium',
        },
        {
          value: 3,
          label: 'Hard',
        },
      ];
      function valuetext(value: number) {
        return `${value}`;
      }
    
      function valueLabelFormat(value: number) {
        return marks.findIndex((mark) => mark.value === value) + 1;
      }

    function handleCheckBox(e: any) {
        if (val === Number(e.target.value)) {
          setOptionsData({ ...optionsData, [e.target.name]: 0 })
          setIsClicked(false);
          setVal(0);
        }
        else {
          setIsClicked(true);
          setVal(Number(e.target.value));
          setOptionsData({ ...optionsData, [e.target.name]: Number(e.target.value), QuestionId: questionData?.QuestionId });
        }
      }
    
      function handleChange(e: any) {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
      }
    
      function handleOptionChange(e: any) {
        setOptionsData({ ...optionsData, [e.target.name]: e.target.value })
      }

      async function HandleEditChanges() {
        if (questionData?.QuestionDescription !== "" && questionData?.QuestionDescription !== undefined && (optionsData?.Option1 !== "" && optionsData?.Option2 !== "" && optionsData?.Option3 !== "" && optionsData?.Option4 !== "") && optionsData?.CorrectOption !== "") {
          setOptionsData({ ...optionsData, QuestionId: questionData.QuestionId });
          const res = await EditQuestion(questionData);
          const optionRes = await editOption(optionsData);
          if (res?.status === 200 && optionRes?.status === 200) {
            alert("Question changed Successfully");
            setQuestionData(initialQuestionData)
            setOptionsData(initialOptionData);
            props?.handleClose();
          }
          else {
            alert("something went wrong");
          }
        }
        else {
          alert("All Fields are Mandatory");
        }
      }

      async function HandleSave(e: any) {
        let isQuestion;
        let detail = { tid: questionData.TopicId, question: questionData.QuestionDescription }
        const res = await getQuestionByDescription(detail);
        if (res?.data !== 0) {
          isQuestion = true;
        }
        if (questionData.QuestionDescription !== "" && questionData.QuestionDescription !== undefined && (optionsData.Option1 !== "" && optionsData.Option2 !== "" && optionsData.Option3 !== "" && optionsData.Option4 !== "") && Number(optionsData.CorrectOption) > 0) {
          if (isQuestion && ((optionsData?.Option1).toLowerCase() !== (optionsData?.Option2).toLowerCase() || (optionsData?.Option3).toLowerCase() || (optionsData?.Option4).toLowerCase()) && 
          ((optionsData?.Option2).toLowerCase() !== (optionsData?.Option3).toLowerCase() || (optionsData?.Option4).toLowerCase()) && ((optionsData?.Option3).toLowerCase() !== (optionsData?.Option4).toLowerCase())) {
            const res = await saveQuestion(questionData);
            if (res?.status === 200) {
              let body = { tid: questionData.TopicId, question: questionData.QuestionDescription }
              const idResponse = await getQuestionByDescription(body);
              if (idResponse?.status === 200) {
                const resSave = await saveOptions({ ...optionsData, QuestionId: idResponse?.data[0]?.QuestionId });
                if (resSave?.status === 200) {
                  alert("Question Added Successfully");
                  setIsClicked(false);
                  setVal(0);
                  props?.handleClose();
                }
              }
            }
          }
          else {
            if (isQuestion === false) {
              alert("Question already exists");
              e?.preventDefault();
            }
            alert("Options can not be same");
            e?.preventDefault();
          }
        }
        else {
          alert("All fields are mandatory");
          e?.preventDefault();
        }
      }

    return(
        <FormControl className="form-group col-md-6" fullWidth >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Question
              </Typography>
              <Typography sx={{ mt: 2 }} className="d-flex justify-content-around">
                <Typography>Selected Topic:{props?.topic}</Typography>  <Typography>TopicID:{props?.topicId}</Typography>
              </Typography>
              <Typography sx={{ mt: 2, px: 20 }} className="px-auto">
                <Slider
                  name="DifficultyLevel"
                  size="medium"
                  aria-label=""
                  value={questionData.DifficultyLevel}
                  valueLabelFormat={valueLabelFormat}
                  getAriaValueText={valuetext}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={marks}
                  min={1}
                  max={3}
                  onChange={handleChange}
                />
              </Typography>
              <Box className="row">
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  Enter Question:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  <TextField
                    name="QuestionDescription"
                    size="small"
                    type="text"
                    required
                    fullWidth
                    id="outlined-required"
                    label="Required"
                    value={questionData?.QuestionDescription}
                    onChange={handleChange}
                  />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Select Status:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  <Select
                    labelId="modal-modal-description"
                    id="demo-simple-select-filled-label"
                    value={questionData?.status}
                    onChange={handleChange}
                    name="status"
                    size="small">
                    <MenuItem value={'Active'}>Active</MenuItem>
                    <MenuItem value={'Deactivated'}>Deactive</MenuItem>
                  </Select>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} className="col">
                  Enter Options: (Check the box for right option)
                </Typography>
                <Typography className="row">
                  <Typography sx={{ mt: 1 }} className="col">
                    <Checkbox value={1} name="CorrectOption" checked={Number(optionsData?.CorrectOption) === 1} disabled={isClicked === false && val === 0 ? false : isClicked === true && val === 1 ? false : true} onChange={handleCheckBox} />
                    <TextField
                      className="col-md-6"
                      name="Option1"
                      size="small"
                      type="text"
                      required
                      id="outlined-required"
                      label="Required"
                      value={optionsData?.Option1}
                      onChange={handleOptionChange}
                    /></Typography>
                  <Typography sx={{ mt: 1 }} className="col">
                    <Checkbox value={2} name="CorrectOption" checked={Number(optionsData?.CorrectOption) === 2} disabled={isClicked === false && val === 0 ? false : isClicked === true && val === 2 ? false : true} onChange={handleCheckBox} />
                    <TextField
                      className="col-md-6"
                      name="Option2"
                      size="small"
                      type="text"
                      required
                      id="outlined-required"
                      label="Required"
                      value={optionsData?.Option2}
                      onChange={handleOptionChange}
                    /></Typography>
                </Typography>
                <Typography className="row">
                  <Typography sx={{ mt: 1 }} className="col">
                    <Checkbox value={3} name="CorrectOption" checked={Number(optionsData?.CorrectOption) === 3} disabled={isClicked === false && val === 0 ? false : isClicked === true && val === 3 ? false : true} onChange={handleCheckBox} />
                    <TextField
                      className="col-md-6"
                      name="Option3"
                      size="small"
                      type="text"
                      required
                      id="outlined-required"
                      label="Required"
                      value={optionsData?.Option3}
                      onChange={handleOptionChange}
                    /></Typography>
                  <Typography sx={{ mt: 1 }} className="col-md-6">
                    <Checkbox value={4} name="CorrectOption" checked={Number(optionsData?.CorrectOption) === 4} disabled={isClicked === false && val === 0 ? false : isClicked === true && val === 4 ? false : true} onChange={handleCheckBox} /><TextField
                      className="col-md-6"
                      name="Option4"
                      size="small"
                      required
                      id="outlined-required"
                      label="Required"
                      value={optionsData?.Option4}
                      onChange={handleOptionChange} />
                  </Typography>
                </Typography>
              </Box>
              <Grid spacing={1} sx={{ mt: 1 }} className="col align-self-end">
                <Button variant="contained" value={questionData.TopicId} color="error" className="mx-2" onClick={props?.handleEditCancel}>Cancel</Button>
                <Button variant="contained" type="submit" className="px-2" onClick={props?.isbtn === 'save' ? HandleSave : HandleEditChanges}>{props?.isbtn === 'save' ? 'Save' : 'Save Changes'}</Button>
              </Grid>
            </FormControl>
    )
}