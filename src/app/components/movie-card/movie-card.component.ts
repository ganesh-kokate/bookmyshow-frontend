import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie: any;

  get imageUrl(): string {
    let img = this.movie.image;
    if (img.includes('BookMyShow/S3/')) {
      img = '/images/' + img.substring(img.lastIndexOf('/') + 1);
    }
    return `http://localhost:8081${img}`;
  }

  get displayLanguage(): string {
    if (this.movie?.language) return this.movie.language;
    if (Array.isArray(this.movie?.languages)) {
      return this.movie.languages.map((l: any) => l.name).join(', ');
    }
    return '';
  }

  get displayGenre(): string {
    if (this.movie?.genre) return this.movie.genre;
    if (Array.isArray(this.movie?.genres)) {
      return this.movie.genres.map((g: any) => g.name).join(', ');
    }
    return '';
  }
}
