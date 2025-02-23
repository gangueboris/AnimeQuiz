// user's response choice in the quiz
export interface UserResponse {
    user_response: string;
}


// Quiz data
export interface Quiz {
    id?: number;  // Optional because the backend will generate it
    question: string;
    correctAnswer: string;
    incorrectAnswers: Array<string>;
}

  