import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';
import { ShowService } from '../../services/show.service';
import { MovieShowsDTO } from '../../data/MovieShow';


@Component({
  selector: 'app-shows',
  imports: [],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css'
})
export class ShowsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    //private movieApiService: MovieApiService,
    private showApiService: ShowService,
    private router: Router
  ) { }

  movieId!: number;
  movieTitle = '';
  shows: MovieShowsDTO[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadShows();
  }

  loadShows(): void {
    this.loading = true;

    this.showApiService.getShowsForMovie(this.movieId).subscribe({
      next: (response: any) => {
        console.log("getShowsForMovie" + response);
        this.shows = response;
        // this.movieId = this.shows[0]?.movieTitle ?? '';
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching shows:', error);
        this.errorMessage = 'Unable to load shows. Please try again.';
        this.loading = false;
      }
    });
  }

  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  formatDate(dateTime: string): string {
    return new Date(dateTime).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }


  getTotalShows(): number {
    return this.shows.reduce(
      (total, theater) => total + theater.shows.length,
      0
    );
  }

  selectShow(showId: String): void {
    this.router.navigate(['/seatlayout', showId]);
  }

}
