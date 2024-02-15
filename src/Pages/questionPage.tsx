import { useEffect, useState } from 'react';
import '../Assets/CSS/test.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { getQuestion, } from '../APIManager/questionsApi';
import { getCorrectOption, getOptionsByQuestionId, } from '../APIManager/optionsApi';
import { saveTest} from '../APIManager/testsApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionData, TestData } from '../Interface/model';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
//import { Done } from '@mui/icons-material';
import { Box, Button, Hidden, IconButton, Modal, } from '@mui/material';
import  '../Assets/modalStyle';
import { result, style1, style2, } from '../Assets/modalConstant';

export function QuestionPage() {

    const [quesArray, setQuesArray] = useState<QuestionData[] | any[]>([]);
    const { state } = useLocation();
    const [onlyQuestion, setOnlyQuestion] = useState<string[]>([]);
    const reqBody = { topicsId: state?.Topicid, topic: state?.topic, name: state?.name, userEmail: state?.userEmail };
    const [isplay, setIsPlay] = useState<boolean>(true);
    const [num, setNum] = useState<number>(0);
    const [options, setOptions] = useState<any[]>([]);
    const [testResponse, setTestResponse] = useState<TestData>({ QuestionId: 0, OptionId: 0, CorrectOption: 0, SelectedOption: 0, DifficultyLevel: 1, CreatedBy: state?.name, CreatedAt: '', UpdatedBy: '', UpdatedAt: '', status: 'True', TopicId: state?.Topicid, UserEmail: state?.userEmaill });
    const [optionClicked] = useState(false);
    const [optionResponse] = useState<any[]>([]);
    const [test] = useState<any[]>([]);
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const [ischecked] = useState<boolean[]>([]);
    const [CorrectCount, setCorrectCount] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(true);
    const [isNextDisable,setIsNextDisable] = useState<boolean>(true);
    const [buttonName,setButtonName]=useState<string>('Next');
    const [key,setKey] = useState<number>(0);
    const [CorrectAnswer]= useState<number[]>([]);
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    const Navigate = useNavigate();
    let questionIdArray: any[];
    
    useEffect(() => {
        start();
        setOptions([]);
    }, []);
    
    function start(){
        debugger
        if(state?.userEmail===''|| state?.userEmail=== undefined){
            Navigate('/user');
        }
    }
    async function fetchingRandomQuestions() {
        debugger
        const topicsId = state?.Topicid;
        const res = await getQuestion(topicsId);
        setQuesArray(res?.data);
        if (res?.status === 200) {
            questionIdArray = ((res?.data)?.map((q: { QuestionId: any; }) => q.QuestionId));
            setTestResponse({ ...testResponse, QuestionId: questionIdArray[0] });
            fetchOption();
            let array = ((res.data)?.map((q: { QuestionDescription: any; }) => q.QuestionDescription));
            setOnlyQuestion(array);
        }
        else{
            alert("No questions Available for this test");
        }
    }

    async function fetchOption() {
        debugger
            const opRes = await getOptionsByQuestionId(questionIdArray);
            if (opRes?.status === 200) {
                setOptions(opRes?.data);
                setTestResponse({ ...testResponse, OptionId: options[num]?.OptionId });
            }
    }

    async function nextQuestion() {
        setKey(key+0.5);
        if (optionClicked) {
            //setIsDisable(true);
        }
        if ((optionResponse[num]) === undefined || (optionResponse[num]) === "") {
            optionResponse.push(0);
            ischecked.push(false);
            CorrectAnswer.push(0);    
        }
        if (num < onlyQuestion?.length) {
            if (num === (onlyQuestion.length - 1)) {
                test.push(testResponse);
                console.log("CorrectAnswer",CorrectAnswer); 
                alert("Times up...");
                setIsOpen(true);
                const res = await saveTest(test); 
                if(res?.status===400){
                    alert(`Something went wrong ${res}`);
                }
                handleOpen();
                setOptions([]);
                setIsPlay(false);
            }
            else {
                setNum(num + 1);
                if (num + 1 === onlyQuestion.length - 1) {
                    setButtonName('Finish');
                }
                else {
                    setIsPlay(true);
                    setButtonName('Next');
                }
            }
        }
    }
   
    function loadComponent() {
        return (
            <div className="row g-4">
                <div className="col-6">
                    <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption1" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 1 ? "bg-success" : Number(optionResponse[num]) !== 1 && CorrectAnswer[num] === 1 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 1 ? true : Number(optionResponse[num]) !== 1 && Number(CorrectAnswer[num]) === 1 && ischecked[num] === true ? true : false} disabled={ischecked[num]} value={1} onClick={handleradio} /> <span>{options[num]?.Option1}</span>
                    </label>
                </div>
                <div className="col-6">
                    <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption2" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 2 ? "bg-success" : Number(optionResponse[num]) !== 2 && CorrectAnswer[num] === 2 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 2 ? true : Number(optionResponse[num]) !== 2 && Number(CorrectAnswer[num]) === 2 && ischecked[num] === true ? true : false} value={2} disabled={ischecked[num]} onClick={handleradio} /> <span>{options[num]?.Option2}</span>
                    </label>
                </div><div className="col-6">
                    <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption3" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 3 ? "bg-success" : Number(optionResponse[num]) !== 3 && CorrectAnswer[num] === 3 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 3 ? true : Number(optionResponse[num]) !== 3 && Number(CorrectAnswer[num]) === 3 && ischecked[num] === true ? true : false} value={3} disabled={ischecked[num]} onClick={handleradio} /> <span>{options[num]?.Option3}</span>
                    </label>
                </div>
                <div className="col-6">
                    <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption4" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 4 ? "bg-success" : Number(optionResponse[num]) !== 4 && CorrectAnswer[num] === 4 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 4 ? true : Number(optionResponse[num]) !== 4 && Number(CorrectAnswer[num]) === 4 && ischecked[num] === true ? true : false} value={4} disabled={ischecked[num]} onClick={handleradio} /> <span>{options[num]?.Option4}</span>
                    </label>
                </div>
            </div>
        )
    }

    function handleModalClose() {
        handleClose();
        Navigate('/');
    }

   async function handleradio(e: any) {
        const correctOptionResponse=await getCorrectOption(e.target.id,e.target.value);
        console.log("correctOptionResponse",correctOptionResponse);
        setIsNextDisable(false);
        let val = Number(e.target.value)
        if (optionResponse[num] === 0 || optionResponse[num] <= options?.length) {
            optionResponse[num] = (val);
            ischecked[num] = (true);
            CorrectAnswer[num]=Number(correctOptionResponse?.data.CorrectOption);
            if (val === CorrectAnswer[num]) {
                setCorrectCount(CorrectCount + 1);
            }
        }
        else {
            optionResponse.push(val);
            ischecked.push(true);
            CorrectAnswer.push(Number(correctOptionResponse?.data.CorrectOption))
            if (val === CorrectAnswer[num]) {
                setCorrectCount(CorrectCount + 1);
            }
        }
        setTestResponse({ ...testResponse, SelectedOption: Number(e.target.value), OptionId: options[num]?.OptionId, CorrectOption: CorrectAnswer[num], QuestionId: quesArray[num].QuestionId, DifficultyLevel: quesArray[num].DifficultyLevel, UpdatedBy: quesArray[num].QuestionDescription, UserEmail: reqBody.userEmail });
        if (testResponse?.QuestionId !== 0)
            saveTestData();
    }

    function saveTestData() {
        test.push(testResponse);
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center row ">
                {onlyQuestion.length > 0 ? <div className="col-md-15 col-lg-15">
                    <div className="border">
                        <div className="question bg-white p-3 border-bottom">
                            <div className="d-flex flex-row justify-content-between align-items-center mcq">
                                <h4>{state?.topic} Quiz</h4><span><CountdownCircleTimer
                                    isPlaying={isplay}
                                    key={key}
                                    strokeWidth={5}
                                    duration={15}
                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                    colorsTime={[30, 15, 5, 0]}
                                    size={55}
                                    onComplete={() => {
                                        nextQuestion();
                                        return { shouldRepeat: true, delay: 0.5 }
                                    }}
                                >{({ remainingTime }) => remainingTime}</CountdownCircleTimer></span></div>
                        </div>
                        <div className="h-75 question bg-white p-3 border-bottom">
                            <div className="d-flex flex-row align-items-center question-title">
                                <h5 className="text-danger">Q{num + 1}.</h5>
                                <h5 className="">{onlyQuestion !== undefined || onlyQuestion !== "" ? onlyQuestion[num] : "No question Available"}</h5>
                            </div>{num === 0 ?
                                <div className="row g-4 my-1">
                                    <div className="col-6">
                                        <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption1" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 1 ? "bg-success" : Number(optionResponse[num]) !== 1 && CorrectAnswer[num] === 1 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 1 ? true : Number(optionResponse[num]) !== 1 && Number(CorrectAnswer[num]) === 1 && ischecked[num] === true ? true : false} disabled={ischecked[num]} value={1} onClick={handleradio} /> <span>{options[num]?.Option1}</span>
                                        {/* {Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 1 ? <CheckSharpIcon  aria-hidden={ischecked[num] && Number(optionResponse[num])===1}/> : Number(optionResponse[num]) !== 1 && CorrectAnswer[num] === 1 && ischecked[num] === true ? <CheckSharpIcon  aria-hidden={ischecked[num] && Number(optionResponse[num])===1}/> : <ClearSharpIcon aria-hidden={ischecked[num] && Number(optionResponse[num])===1}/>} */}
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption2" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 2 ? "bg-success" : Number(optionResponse[num]) !== 2 && CorrectAnswer[num] === 2 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 2 ? true : Number(optionResponse[num]) !== 2 && Number(CorrectAnswer[num]) === 2 && ischecked[num] === true ? true : false} value={2} disabled={ischecked[num]} onClick={handleradio} /> <span>{options[num]?.Option2}</span>
                                        {/* {Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 2 ? <CheckSharpIcon  aria-hidden={ischecked[num] && Number(optionResponse[num])===2}/> : Number(optionResponse[num]) !== 2 && CorrectAnswer[num] === 2 && ischecked[num] === true ? <CheckSharpIcon aria-hidden={ischecked[num] && Number(optionResponse[num])===2}/> : <ClearSharpIcon aria-hidden={ischecked[num] && Number(optionResponse[num])===2}/>} */}
                                        </label>
                                    </div><div className="col-6">
                                        <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption3" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 3 ? "bg-success" : Number(optionResponse[num]) !== 3 && CorrectAnswer[num] === 3 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 3 ? true : Number(optionResponse[num]) !== 3 && Number(CorrectAnswer[num]) === 3 && ischecked[num] === true ? true : false} value={3} disabled={ischecked[num]} onClick={handleradio} /> <span>{options[num]?.Option3}</span>
                                        {/* {Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 3 ? <CheckSharpIcon  aria-hidden={ischecked[num] && Number(optionResponse[num])===3}/> : Number(optionResponse[num]) !== 3 && CorrectAnswer[num] === 3 && ischecked[num] === true ? <CheckSharpIcon aria-hidden={ischecked[num] && Number(optionResponse[num])===3}/> : <ClearSharpIcon  aria-hidden={ischecked[num] && Number(optionResponse[num])===3}/>} */}
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <label className="radio"> <input type="radio" id={quesArray[num].QuestionId} name="SelectedOption4" className={`form-control ${Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 4 ? "bg-success" : Number(optionResponse[num]) !== 4 && CorrectAnswer[num] === 4 && ischecked[num] === true ? "bg-success" : "bg-danger"}`} checked={Number(optionResponse[num]) === 4 ? true : Number(optionResponse[num]) !== 4 && Number(CorrectAnswer[num]) === 4 && ischecked[num] === true ? true : false} value={4} disabled={ischecked[num]} onClick={handleradio} /> <span>{options[num]?.Option4}</span>
                                        {/* {Number(optionResponse[num]) === CorrectAnswer[num] && CorrectAnswer[num] === 4 ? <CheckSharpIcon  aria-hidden={ischecked[num] && Number(optionResponse[num])===4}/> : Number(optionResponse[num]) !== 4 && CorrectAnswer[num] === 4 && ischecked[num] === true ? <CheckSharpIcon aria-hidden={ischecked[num] && Number(optionResponse[num])===4}/> : <ClearSharpIcon aria-hidden={ischecked[num] && Number(optionResponse[num])===4}/>} */}
                                        </label>
                                    </div>
                                </div> : <>{loadComponent()}</>}
                        </div>
                        <div className="d-flex justify-content-end p-3 bg-white">
                            {/* <button className="btn btn-primary d-flex align-items-center btn-danger" type="button" disabled={isDisable} value={quesArray[num]?.QuestionId} onClick={PrevQuestion}><i className="fa fa-angle-left mt-1 mr-1"></i>&nbsp;Prev</button>*/}
                             <button className="btn btn-primary border-success align-items-center btn-success" type="button" value={quesArray[num]?.QuestionId} onClick={nextQuestion}><i className="fa fa-angle-right ml-2">{buttonName}</i></button>  
                        </div>
                    </div>
                </div> : <> <h6><p>Every Question carry equal marks</p><p>There are 4 multiple choice option you can select only one option</p></h6>
                    <button className="btn btn-primary border-success align-items-center btn-success w-25" color='primary' onClick={fetchingRandomQuestions}><PlayArrowIcon fontSize='large'/></button>
                    <p>Click on button to start the test</p></>}
                {isOpen?<Modal
                    open={open}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={result}><><IconButton className="bd-highlight position-absolute top-0 end-0" size='small' onClick={handleModalClose}>X</IconButton></>
                        <div className="justify-content-center">
                            <div className="row justify-content-center">
                                <div className="col-sm-6"></div> <div className="col-sm-6"><h4>{reqBody?.topic}</h4></div>  <div className="col-sm-6"></div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-6"><h6>Name:{reqBody.name}</h6></div> <div className="col-sm-6"></div>  <div className="col-sm-6"></div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-3">
                                    <h6>Total Questions</h6>
                                </div>
                                <div className="col-sm-3">
                                    <h6>Attempted</h6>
                                </div>
                                <div className="col-sm-3">
                                <h6>Correct</h6>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-3">
                                    {quesArray?.length}
                                </div>
                                <div className="col-sm-3">
                                    {optionResponse?.length}
                                </div>
                                <div className="col-sm-3">
                                    {CorrectCount}
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>:''}
            </div>
        </div>
    )
}


