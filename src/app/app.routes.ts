import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'quiz',
        component: QuizComponent,
        title: 'Quiz Page'
    },
    {
        path: 'add-question',
        component: AddQuestionComponent,
        title: 'Add-question Page'
    },
    {
        path: 'edit-question',
        component: EditQuestionComponent,
        title: 'Edit-question Page'
    }
    
];
