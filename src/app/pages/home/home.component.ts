import { Component, OnInit } from '@angular/core';
//import { movies } from '../../data/movies';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-home',
  imports: [MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit() {
    this.movieApiService.getMovies().subscribe({
      next: (response) => {
        this.movies = response.data;
        console.log(this.movies)
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }
}
