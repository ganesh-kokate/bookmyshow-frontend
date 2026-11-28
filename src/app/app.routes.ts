import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ShowsComponent } from './pages/shows/shows.component';
import { SeatLayoutComponent } from './pages/seat-layout/seat-layout.component';
import { AdminLayoutComponent } from './admin/pages/admin-layout/admin-layout.component';
import { AddShowComponent } from './admin/pages/add-show/add-show.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';


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
    },
    {
        path: 'payments',
        component: PaymentDetailsComponent
    },
    // Admin routes
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'theatres',
                pathMatch: 'full'
            },
            // {
            //     path: 'theatres',
            //     component: TheatreListComponent
            // },
            // {
            //     path: 'theatres/add',
            //     component: AddTheatreComponent
            // },
            // {
            //     path: 'screens/add',
            //     component: AddScreenComponent
            // },
            // {
            //     path: 'seats',
            //     component: ConfigureSeatsComponent
            // },
            // {
            //     path: 'shows',
            //     component: ShowListComponent
            // },
            {
                path: 'shows/add',
                component: AddShowComponent
            }
        ]
    }
];
