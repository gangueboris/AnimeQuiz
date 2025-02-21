import { Injectable } from '@angular/core';
import  { Quiz } from '../types-quiz';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // Local database
  private dataQuestions: Array<Quiz> = [
    {
        "question": "What is the name of the pirate crew led by Monkey D. Luffy in 'One Piece'?",
        "correct_answer": "Straw Hat Pirates",
        "incorrect_answers": [
            "Red-Haired Pirates",
            "Heart Pirates",
            "Whitebeard Pirates"
        ]
    },
    {
        "question": "In 'Demon Slayer', what is Tanjiro's primary goal?",
        "correct_answer": "To cure his sister Nezuko",
        "incorrect_answers": [
            "To defeat Muzan Kibutsuji",
            "To become a Hashira",
            "To avenge his family"
        ]
    },
    {
        "question": "Which anime features a high school girl named Haruhi Suzumiya and her mysterious brigade?",
        "correct_answer": "The Melancholy of Haruhi Suzumiya",
        "incorrect_answers": [
            "Toradora!",
            "Clannad",
            "Lucky Star"
        ]
    },
    {
        "question": "In 'Fullmetal Alchemist', what is the ultimate taboo in alchemy?",
        "correct_answer": "Human transmutation",
        "incorrect_answers": [
            "Using Philosopher's Stones",
            "Alchemy without a circle",
            "Transforming gold"
        ]
    },
    {
        "question": "What is the main weapon of choice for Guts in 'Berserk'?",
        "correct_answer": "Dragonslayer sword",
        "incorrect_answers": [
            "Crossbow",
            "Twin daggers",
            "Spear"
        ]
    },
    {
        "question": "In 'Sword Art Online', what is the name of the virtual world where players are trapped?",
        "correct_answer": "Aincrad",
        "incorrect_answers": [
            "Alfheim",
            "Underworld",
            "Gun Gale Online"
        ]
    },
    {
        "question": "Who is the teacher of Gon and Killua in 'Hunter x Hunter' during the Greed Island arc?",
        "correct_answer": "Biscuit Krueger",
        "incorrect_answers": [
            "Wing",
            "Kite",
            "Knuckle Bine"
        ]
    },
    {
        "question": "Which anime features a young boy named Edward Elric seeking the Philosopher's Stone?",
        "correct_answer": "Fullmetal Alchemist: Brotherhood",
        "incorrect_answers": [
            "Black Clover",
            "Bleach",
            "Seven Deadly Sins"
        ]
    },
    {
        "question": "In 'Fairy Tail', what type of magic does Natsu Dragneel use?",
        "correct_answer": "Fire Dragon Slayer Magic",
        "incorrect_answers": [
            "Celestial Spirit Magic",
            "Ice-Make Magic",
            "Requip Magic"
        ]
    },
    {
        "question": "What is the name of the energy attack famously used by Goku in 'Dragon Ball Z'?",
        "correct_answer": "Kamehameha",
        "incorrect_answers": [
            "Final Flash",
            "Spirit Bomb",
            "Galick Gun"
        ]
    },
    {
        "question": "In 'Bleach', what is the name of Ichigo's Zanpakuto?",
        "correct_answer": "Zangetsu",
        "incorrect_answers": [
            "Benihime",
            "Senbonzakura",
            "Hyōrinmaru"
        ]
    },
    {
        "question": "Which anime features a character named Levi Ackerman, known for his exceptional combat skills?",
        "correct_answer": "Attack on Titan",
        "incorrect_answers": [
            "Sword Art Online",
            "Demon Slayer",
            "Tokyo Ghoul"
        ]
    },
    {
        "question": "What is the name of the virtual currency used in the anime 'No Game No Life'?",
        "correct_answer": "Gold coins",
        "incorrect_answers": [
            "Spirit Points",
            "Mana Crystals",
            "Bet Tokens"
        ]
    },
    {
        "question": "In 'Tokyo Ghoul', what is the name of the mask maker for the ghouls?",
        "correct_answer": "Uta",
        "incorrect_answers": [
            "Kaneki",
            "Touka",
            "Arima"
        ]
    },
    {
        "question": "What is the name of the cursed object in 'Jujutsu Kaisen' that Yuji Itadori consumes?",
        "correct_answer": "Ryomen Sukuna's Finger",
        "incorrect_answers": [
            "Cursed Amulet",
            "Cursed Sword",
            "Cursed Orb"
        ]
    }
];
  constructor(/*private http: HttpClient*/) { }
   
  getDataQuestions(): Array<Quiz> {
    return [...this.dataQuestions]; // Return a copy to prevent direct mutation
  }
  /*
  // Function to get quiz from the database
  getAllQuiz(): Observable<Array<Quiz>> { 
    return this.http.get<Array<Quiz>>("");
  }

  // Function to add a quiz in the database
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>("", quiz);
  }

  // Function to update a quiz in the database
  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>("", quiz);
  }

  // Function to delete a quiz in the database
  deleteQuiz(quizId: number): Observable<void> {
    return this.http.delete<void>("");
  }*/

  
  


}
