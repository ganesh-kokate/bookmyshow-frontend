import { Component, OnInit } from '@angular/core';
//import { movies } from '../../data/movies';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieApiService } from '../../services/movie-api.service';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { MovieSearchService } from '../../services/movie-search.service';

@Component({
  selector: 'app-home',
  imports: [MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  subscription!: Subscription;

  constructor(private movieApiService: MovieApiService, private movieSearchService: MovieSearchService) { }

  ngOnInit() {
    // this.movieApiService.getMovies().subscribe({
    //   next: (response) => {
    //     this.movies = response.data;
    //     console.log(this.movies)
    //   },
    //   error: (err) => {
    //     console.error('Error fetching movies:', err);
    //   }
    // });

    this.subscription = this.movieSearchService.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchText => {

        if (searchText.trim() === '') {
          return this.movieApiService.getMovies();
        }

        return this.movieApiService.searchMovieByName(searchText);
      })
    ).subscribe(
      {
        next: response => {
          this.movies = response.data;
        }
      }
    );
  }
}
