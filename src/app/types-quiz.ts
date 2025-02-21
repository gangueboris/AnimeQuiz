// user's response choice in the quiz
export interface UserResponse {
    user_response: string;
}


// Quiz data
export interface Quiz {
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
}

  