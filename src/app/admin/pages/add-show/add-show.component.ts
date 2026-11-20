import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieApiService } from '../../../services/movie-api.service';
import { AdminService } from '../../../services/admin.service';
import { AddShowRequest } from '../../../data/MovieShow';

@Component({
  selector: 'app-add-show',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-show.component.html',
  styleUrl: './add-show.component.css'
})
export class AddShowComponent implements OnInit {
  screens: String[] = [];
  movies: String[] = [];
  selectedScreenName = '';
  selectedMovieName = '';
  startTime = '';

  constructor(
    private movieService: MovieApiService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.loadFormData();
  }

  loadFormData(): void {
    // Load screens from AdminService (port 8084)
    this.adminService.getScreens().subscribe({
      next: (screenNames) => {
        this.screens = screenNames;
      },
      error: (err) => {
        console.error('Failed to load screens from admin service:', err);
      }
    });

    // Load movies from AdminService (port 8084)
    this.adminService.getMovies().subscribe({
      next: (movieTitles) => {
        this.movies = movieTitles;
      },
      error: (err) => {
        console.error('Failed to load movies from admin service:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.selectedScreenName || !this.selectedMovieName || !this.startTime) {
      return;
    }

    const showRequest: AddShowRequest = {
      screenName: this.selectedScreenName,
      movieName: this.selectedMovieName,
      startTime: this.startTime
    };

    this.adminService.addShow(showRequest).subscribe({
      next: (response) => {
        alert("Show added successfully");
      },
      error: (err) => {
        alert("Something went wrong");
      }
    });



  }
}
