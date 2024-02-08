export interface QuestionData {
    QuestionDescription: string | any,
    DifficultyLevel:string | any,
    CreatedBy:string | any,
    CreatedAt:string | any,
    UpdatedBy:string | any,
    UpdatedAt:string | any,
    status:string,
    TopicId:number,
    QuestionId:number
  }

  export interface Question {
    QuestionId:number,
    QuestionDescription: string | any,
    DifficultyLevel:string | any,
    CreatedBy:string | any,
    CreatedAt:string | any,
    UpdatedBy:string | any,
    UpdatedAt:string | any,
    status:string,
    TopicId:number
  }

  export interface UserData {
    UserName: string,
    UserEmail:string,
    CreatedBy:string,
    CreatedAt:string,
    UpdatedBy:string,
    UpdatedAt:string,
    status:string,
  }

 export interface OptionData{
    Option1:string | any,
    Option2:string | any,
    Option3:string | any,
    Option4:string | any,
    CorrectOption:number|any,
    CreatedBy:string | any,
    CreatedAt:string | any,
    UpdatedBy:string | any,
    UpdatedAt:string | any,
    status:string|any,
    QuestionId:number|any
  }

  export interface TopicsData {
    TopicId: number | any,
    TopicName:string | any,
    CreatedBy:string | any,
    CreatedAt:string | any,
    UpdatedBy:string | any,
    UpdatedAt:string | any,
    status:string|any,
    Attempts:number
  }

  export interface Topic{
    TopicName:string | any,
    CreatedBy:string | any,
    CreatedAt:string | any,
    UpdatedBy:string | any,
    UpdatedAt:string | any,
    status:string|any
  }

  export interface TestData{
    OptionId:number | any,
    SelectedOption:number|any,
    CorrectOption:number|any,
    DifficultyLevel:number|any,
    CreatedBy:string | any,
    CreatedAt:string | any,
    UpdatedBy:string | any,
    UpdatedAt:string | any,
    status:string|any,
    QuestionId:number|any,
    TopicId:number|any,
    UserMail:string|any
  }
  
  export interface RankData{
    CreatedBy:string | any,
    TopicId:number|any,
    NumberOfRecords:number,
    Email:string,
    TestId:number
  } 

