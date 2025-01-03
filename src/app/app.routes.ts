import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ProfileComponent } from './components/profile/profile.component';

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
        path: 'profile',
        component: ProfileComponent,
        title: "Profile Page"
    }
];
