import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movies } from '../../data/movies';
import { MovieApiService } from '../../services/movie-api.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {

  movie: any;
  id: number;
  private sanitizer = inject(DomSanitizer);

  constructor(private route: ActivatedRoute, private movieApiService: MovieApiService, private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.movieApiService.getMovieById(this.id).subscribe
      (
        {
          next: (response) => {
            this.movie = response.data;
            console.log(this.movie)
          },
          error: (err) => {
            console.error('Error fetching movies:', err);
          }
        }
      );
  }

  get imageUrl(): string {
    let img = this.movie.image;
    if (img.includes('BookMyShow/S3/')) {
      img = '/images/' + img.substring(img.lastIndexOf('/') + 1);
    }
    return `http://localhost:8081${img}`;
  }

  get banerUrl(): string {
    let img = this.movie.banner;
    if (img.includes('BookMyShow/S3/')) {
      img = '/images/' + img.substring(img.lastIndexOf('/') + 1);
    }
    return `http://localhost:8081${img}`;
  }

  bookTickets(): void {
    const id = Number(this.movie?.movieId);
    this.router.navigate(['/movies', id, 'shows']);
  }
}


