// types/index.ts

export interface IUser {
  user_id: string;
  username: string;
  email: string;
  password_hash: string;
}

export interface ICategory {
  category_id: string;
  name: string;
  image: string;
}

export interface ISubTopic {
  sub_topic_id: string;
  title: string;
  materi_default: string;
}

export interface ITopic {
  topic_id: string;
  category_id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  duration: string; 
  sub_topics: ISubTopic[];
}


export interface ICustomCategory {
  custom_category_id: string;
  name: string;
}

export interface ICustomAiTopic {
  custom_topic_id: string;
  user_id: string;
  user_prompt_request: string;
  created_at: string;          
  custom_category: ICustomCategory;
  title: string;
  duration: string;
  sub_topics: ISubTopic[];
}

export interface IQuestionBreakdown {
  question_id: string;
  question_number: number;
  status: "Correct" | "Incorrect";
  question: string;
  user_answer: string;
  ai_feedback: string;
}

export interface ILearningHistory {
  history_id: string;
  user_id: string;
  topic_id: string;
  is_custome_topic: boolean;
  topic_title: string;
  date: string;
  status: "Completed" | "In Progress";
  level: string;
  score: number;
  ai_feedback: string;
  question_breakdown: IQuestionBreakdown[];
}