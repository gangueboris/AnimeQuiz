import { Injectable } from '@angular/core';
import  { Quiz } from '../types-quiz';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // Local database
  private apiUrl = "https://animequiz-api.onrender.com";
  private dataQuestions: Array<Quiz> = [];
  /* = [
    {
        "question": "What is the name of the pirate crew led by Monkey D. Luffy in 'One Piece'?",
        "correctAnswer": "Straw Hat Pirates",
        "incorrectAnswers": [
            "Red-Haired Pirates",
            "Heart Pirates",
            "Whitebeard Pirates"
        ]
    },
    {
        "question": "In 'Demon Slayer', what is Tanjiro's primary goal?",
        "correctAnswer": "To cure his sister Nezuko",
        "incorrectAnswers": [
            "To defeat Muzan Kibutsuji",
            "To become a Hashira",
            "To avenge his family"
        ]
    },
    {
        "question": "Which anime features a high school girl named Haruhi Suzumiya and her mysterious brigade?",
        "correctAnswer": "The Melancholy of Haruhi Suzumiya",
        "incorrectAnswers": [
            "Toradora!",
            "Clannad",
            "Lucky Star"
        ]
    },
    {
        "question": "In 'Fullmetal Alchemist', what is the ultimate taboo in alchemy?",
        "correctAnswer": "Human transmutation",
        "incorrectAnswers": [
            "Using Philosopher's Stones",
            "Alchemy without a circle",
            "Transforming gold"
        ]
    },
    {
        "question": "What is the main weapon of choice for Guts in 'Berserk'?",
        "correctAnswer": "Dragonslayer sword",
        "incorrectAnswers": [
            "Crossbow",
            "Twin daggers",
            "Spear"
        ]
    },
    {
        "question": "In 'Sword Art Online', what is the name of the virtual world where players are trapped?",
        "correctAnswer": "Aincrad",
        "incorrectAnswers": [
            "Alfheim",
            "Underworld",
            "Gun Gale Online"
        ]
    },
    {
        "question": "Who is the teacher of Gon and Killua in 'Hunter x Hunter' during the Greed Island arc?",
        "correctAnswer": "Biscuit Krueger",
        "incorrectAnswers": [
            "Wing",
            "Kite",
            "Knuckle Bine"
        ]
    },
    {
        "question": "Which anime features a young boy named Edward Elric seeking the Philosopher's Stone?",
        "correctAnswer": "Fullmetal Alchemist: Brotherhood",
        "incorrectAnswers": [
            "Black Clover",
            "Bleach",
            "Seven Deadly Sins"
        ]
    },
    {
        "question": "In 'Fairy Tail', what type of magic does Natsu Dragneel use?",
        "correctAnswer": "Fire Dragon Slayer Magic",
        "incorrectAnswers": [
            "Celestial Spirit Magic",
            "Ice-Make Magic",
            "Requip Magic"
        ]
    },
    {
        "question": "What is the name of the energy attack famously used by Goku in 'Dragon Ball Z'?",
        "correctAnswer": "Kamehameha",
        "incorrectAnswers": [
            "Final Flash",
            "Spirit Bomb",
            "Galick Gun"
        ]
    },
    {
        "question": "In 'Bleach', what is the name of Ichigo's Zanpakuto?",
        "correctAnswer": "Zangetsu",
        "incorrectAnswers": [
            "Benihime",
            "Senbonzakura",
            "Hyōrinmaru"
        ]
    },
    {
        "question": "Which anime features a character named Levi Ackerman, known for his exceptional combat skills?",
        "correctAnswer": "Attack on Titan",
        "incorrectAnswers": [
            "Sword Art Online",
            "Demon Slayer",
            "Tokyo Ghoul"
        ]
    },
    {
        "question": "What is the name of the virtual currency used in the anime 'No Game No Life'?",
        "correctAnswer": "Gold coins",
        "incorrectAnswers": [
            "Spirit Points",
            "Mana Crystals",
            "Bet Tokens"
        ]
    },
    {
        "question": "In 'Tokyo Ghoul', what is the name of the mask maker for the ghouls?",
        "correctAnswer": "Uta",
        "incorrectAnswers": [
            "Kaneki",
            "Touka",
            "Arima"
        ]
    },
    {
        "question": "What is the name of the cursed object in 'Jujutsu Kaisen' that Yuji Itadori consumes?",
        "correctAnswer": "Ryomen Sukuna's Finger",
        "incorrectAnswers": [
            "Cursed Amulet",
            "Cursed Sword",
            "Cursed Orb"
        ]
    }
];*/

  // Constructor
  constructor(private http: HttpClient) { }
   
  getDataQuestions(): Array<Quiz> {
    return [...this.dataQuestions]; // Return a copy to prevent direct mutation
  }

  
  // Function to get quiz from the database
  getAllQuiz(): Observable<Array<Quiz>> { 
    return this.http.get<Array<Quiz>>(`${this.apiUrl}/quiz`);
  }

  // Function to add a quiz in the database
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/quiz`, quiz);
  }

  // Function to update a quiz in the database
  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}/quiz`, quiz);
  }

  // Function to delete a quiz in the database
  deleteQuiz(quizId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quiz/${quizId}`);
  }

  
  


}
