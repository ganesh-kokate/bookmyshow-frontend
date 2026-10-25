import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ShowsComponent } from './pages/shows/shows.component';
import { SeatLayoutComponent } from './pages/seat-layout/seat-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'movies/:id',
        component: MovieDetailsComponent
    },
    {
        path: 'movies/:id/shows',
        component: ShowsComponent
    },
    {
        path: 'seatlayout/:showId',
        component: SeatLayoutComponent
    },
    {
        path: 'movies',
        component: HomeComponent
    }

];
