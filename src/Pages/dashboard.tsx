import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton, } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'
import {  deleteQuestion, getQuestionByQuesionId, getQuestionByTopicId } from "../APIManager/questionsApi";
import { fetchData,  } from "../APIManager/topicsApi";
import { getTestAttempt, getTestRank, } from "../APIManager/testsApi";
import {  getOptionByQuesionId, } from "../APIManager/optionsApi";
import { OptionData, Question, QuestionData, RankData, Topic, TopicsData } from "../Interface/model";
import DataTable, { TableColumn } from "react-data-table-component";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import { style1 } from "../Assets/modalConstant";
import { topicStyle } from "../Assets/modalConstant";
import { RankComponent } from "./rankComponent";
import { TopicComponent } from "./topicComponent";
import { QuestionForm } from "./questionForm";

export function DashBoard() {

  const initialQuestionData:QuestionData={ QuestionDescription: '', DifficultyLevel: 1, CreatedBy: 'admin', CreatedAt: '', UpdatedBy: 'admin', UpdatedAt: '', status: 'Active', TopicId: 0, QuestionId: 0 };
  const initialOptionData:OptionData={ Option1: '', Option2: '', Option3: '', Option4: '', CorrectOption: 0, CreatedAt: '', CreatedBy: 'admin', UpdatedBy: 'admin', UpdatedAt: '', status: 'Active', QuestionId: 0 };
  const initialTopicData:Topic={ TopicName: '', CreatedBy: 'admin', CreatedAt: '', UpdatedAt: '', UpdatedBy: 'admin', status: 'True' };
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [tid, setTid] = useState<number>();
  const role = localStorage.getItem('role');
  const Navigate = useNavigate();
  const [qData, setQData] = useState<QuestionData>(initialQuestionData);
  const [topicArray, setTopicArray] = useState<TopicsData[]>([]);
  const [options, setOptions] = useState<OptionData>(initialOptionData);
  const [isList, setIsList] = useState<string>('addquestions');
  const [input, setInput] = useState<Question | any>();
  const [testdata, setTestData] = useState<RankData | any>();
  const [isDisable, setIsDisable] = useState<boolean>();
  const [isTopic, setIsTopic] = useState<boolean>();
  const [topicData, setTopicData] = useState<Topic>(initialTopicData);
  const [isbtn, setIsBtn] = useState<string>();
  const [rankTopic, setRankTopic] = useState<string>('');
  const [questionTopic, setQuestionTopic] = useState<string>('');
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  let attemptsArray: any[] = [];

  useEffect(() => {
    fetchingTopicsdata();
    if (role !== "admin") {
      setIsDisable(true);
    }
  }, []);

  async function fetchingTopicsdata() {
    const res = await fetchData();
    let array = ((res)?.map((q: { TopicId: any; }) => q.TopicId));
    const AttemptResponse = await fetchAttempts(array);
    if (AttemptResponse === 200 && array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        res[i].Attempts = attemptsArray[i]?.Attempts;
      }
      setTopicArray(res);
    }
  }

  async function handleOnClickList(e: any) {
    setIsBtn("edit");
    setIsList("questions");
    setType(e.target.name);
    setTid(Number(e.target.value));
    setQuestionTopic(e.target.name);
    const data = Number(e.target.value);
    fetchQuestion(data);
  }

  async function fetchQuestion(data: number) {
    setIsList("questions");
    const res = await getQuestionByTopicId(data);
    setInput(res?.data);
    handleOpen();
  }

  async function fetchAttempts(data: any) {
    const res = await getTestAttempt(data);
    if (res?.status === 200) {
      attemptsArray = res.data;
      return res.status
    }
  }

  function handleOnClickStart(e: any) {
    const tid = Number(e.target.value);
    const topic = e.target.name;
    Navigate('/user', { state: { tid, topic } });
  }

  function handleOnClickQ(e: any) {
    setIsBtn("save");
    setIsList("addquestion");
    setQData({ ...qData, TopicId: (Number(e.target.value)) })
    handleOpen();
    setType(e.target.name);
    setTid(e.target.value);
    debugger
  }

  function HandleCancel(): void {
    setIsTopic(false);
    setIsBtn("save");
    setQData(initialQuestionData);
    setOptions(initialOptionData);
    setTopicData(initialTopicData);
    handleClose();
  }

  function handleEditCancel(e: any) {
    if (isbtn === 'edit') {
      fetchQuestion(e.target.value);
    } else {
      setQData(initialQuestionData)
      setOptions(initialOptionData);
      HandleCancel();
    }
  } 

  const columns: TableColumn<QuestionData>[] = useMemo(() =>
    [
      {
        name: 'Id',
        selector: row => row?.QuestionId,
        width: '4rem'
      },
      {
        name: 'Question',
        selector: row => row?.QuestionDescription,
        sortable: true,
        width: 'auto',
        wrap: true,
      },
      {
        name: 'Difficulty',
        selector: row => row?.DifficultyLevel,
        width: '8rem'
      },
      {
        name: 'Created by',
        selector: row => row?.CreatedBy,
        width: '8rem'
      },
      {
        name: 'Status',
        selector: row => row?.status,
        sortable: true,
        width: '8rem'
      },
      {
        name: 'Actions',
        width: 'auto',
        cell: row => {
          return (
          <>
            <button className='btn btn-warning' onClick={() => { handleEdit(row?.QuestionId) }}> Edit</button>&nbsp;
            <button className='btn btn-danger' disabled={(row.status === 'true' || row.status === 'Active') ? false : true} onClick={() => { handleDeleteQuestion(row.QuestionId, row.TopicId) }}>Delete</button>
          </>
          )
        }
      },
    ],
    []
  );

  async function getRank(topicName:string,Id:number) {
    debugger
    console.log(topicName,Id);
    
    setRankTopic(topicName);
    setIsList("rank");
    fetchRank(Id);
  }

  async function fetchRank(id: number) {
    const res = await getTestRank(id);
    setTestData(res?.data);
    handleOpen();
  }

  async function handleDeleteQuestion(qid: number, tid: number) {
    setIsList("questions");
    const res = await deleteQuestion(qid);
    if (res?.status === 200) {
      await fetchQuestion(tid);
      handleOpen();
    }
  }

  async function fetchQuestionById(qid: number) {
    const res = await getQuestionByQuesionId(qid);
    setQData(res?.data[0]);
    const rs = await getOptionByQuesionId(qid);
    setOptions(rs?.data[0]);
  }

  async function handleEdit(qid: number) {
    setIsList("addquestion");
    await fetchQuestionById(qid);
    handleOpen();
  }

  function handleTopic() {
    setIsTopic(true);
    handleOpen();
  }

  function handleEditTopic(e:any){

    console.log("edit topic id:",e); 
  }

console.log("tesetdata",testdata);

  return (
    <main role="main">
      <div>
        <button className="btn btn-primary my-1 mx-1 position-absolute top-1 end-0" hidden={isDisable} disabled={isDisable} onClick={handleTopic}><AddIcon fontSize="medium"/> New Topic</button>
      </div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {topicArray?.length > 0 ? topicArray?.map(topicinfo => {
              return (
              <div className="col-md-4">
                <div className="card mb-4 shadow p-2 mb-4 bg-white rounded bg-info-subtle bg-gradient">
                  <div className="d-flex bd-highlight mb-3 my-1">
                      <h6 className="me-auto p-2 bd-highlight">{topicinfo?.TopicName}</h6>
                      <p className="card-text p-2 bd-highlight mx-1">Attempts: {topicinfo?.Attempts}</p>
                  </div>
                  <div className="card-body">
                  {/* <p className="dcard-text">{topic}</p> */}
                    <div className="d-flex justify-content-between">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-primary" name={topicinfo?.TopicName} value={ topicinfo?.TopicId} onClick={()=>getRank(topicinfo?.TopicName, topicinfo?.TopicId)}><BarChartIcon/></button>
                      </div>
                      <div className="btn-group">
                        {role === "admin" ? <><button type="button" className="btn btn-sm btn-outline-secondary" name={topicinfo?.TopicName} value={topicinfo?.TopicId} onClick={handleOnClickList}>List</button>&nbsp;
                          <button type="button" className="btn btn-sm btn-outline-primary" name={topicinfo?.TopicName} value={topicinfo?.TopicId} onClick={handleOnClickQ}><AddIcon fontSize="small"/> Question</button></>
                          : <button type="button" className="btn btn-sm btn-outline-success" name={topicinfo?.TopicName} value={topicinfo?.TopicId} onClick={handleOnClickStart}>Start</button>}
                      </div>
                      <div className="btn-group" hidden={isDisable}>
                        <button className="btn btn-lg btn-outline p-2 bd-highlight" name={topicinfo?.TopicName} value={topicinfo?.TopicId} hidden={isDisable} disabled={isDisable} onClick={()=>handleEditTopic(topicinfo?.TopicId)}><EditIcon fontSize="medium" color="info"/></button>
                        <button className="btn btn-lg btn-outline p-2 bd-highlight" hidden={isDisable} disabled={isDisable}><DeleteIcon fontSize="medium" color="inherit"/></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
            }) : "No Data Available"}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isTopic ? <Box sx={topicStyle} className="topicStyle">{<TopicComponent parentFunction={fetchingTopicsdata} cancelFunction={HandleCancel} closeFunction={handleClose}/>}
      </Box> :
        <Box sx={style1}>
          <Box className="d-flex bd-highlight mb-3">
            <h4 id="modal-title" className="me-auto p-2 bd-highlight">My Title</h4>
              <IconButton className="ms-auto p-2 bd-highlight" onClick={HandleCancel}>X</IconButton>
          </Box>
            {isList === "questions" ? 
            <>
              <DataTable
                subHeader={true}
                subHeaderComponent={''}
                columns={columns}
                data={input}
                pagination
                highlightOnHover={true}
                responsive={true}
              />
              <Grid container className="d-flex justify-content-end" >
                <Grid item>
                  <Button variant="contained" color="error" onClick={HandleCancel}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
              </>
           : isList === "rank" ? 
              <>
               
                <RankComponent topic={rankTopic} data={testdata} /> 
              
              </> 
          : isList === "addquestion" ? 
                <>
                  {<QuestionForm isbtn={isbtn} topic={type} topicId={tid} qData={qData} options={options} handleEditCancel={handleEditCancel} handleClose={handleClose} />}
                </> :
                "No data Available"}
        </Box>
        }
      </Modal>
    </main>
  )
}