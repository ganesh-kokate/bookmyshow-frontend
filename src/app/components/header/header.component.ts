import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { MovieSearchService } from '../../services/movie-search.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private movieSearchService: MovieSearchService) { }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.movieSearchService.searchMovie(value);
  }

}
