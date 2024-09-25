import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

/**
 * This class allows user to see all movies,
 * add movies to their list of favourites and navigate to their user profile page
 */
export class MovieCardComponent {
  movies: any[] = [];
  username: any = localStorage.getItem('user');

  constructor(
    public fetchMovies: FetchApiDataService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * GET's all movies from database and displays them
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      return this.movies;
    });
  }

  /**
   * opens genre dialog
   * @param genre
   */
  openGenre(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genreName: movie.genre },
    });
  }

  /**
   * opens director dialog
   * @param director
   */
  openDirector(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { directorName: movie.director },
    });
  }

  /**
   * opens synopsis dialog
   * @param synopsis
   */
  openSynopsis(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: { movie: movie },
    });
  }

  /**
   * allows user to add or remove movie from their favourite
   *  movies array based on its current state
   * @param movieID
   */
  toggleFavs(movie: any): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    if (user.favMovies.includes(movie._id)) {
      this.fetchMovies
        .deleteFavMovies(user.username, movie._id)
        .subscribe((result: any) => {
          user.favMovies = result.favMovies;
          localStorage.setItem('user', JSON.stringify(user));
        });
    } else {
      this.fetchMovies
        .addFavMovies(user.username, movie._id)
        .subscribe((result: any) => {
          user.favMovies = result.favMovies;
          localStorage.setItem('user', JSON.stringify(user));
        });
    }
  }

  /**
   * evaluates whether a movie is already on the user's favouite movies array
   * @param movie
   * @returns boolean
   */
  isFav(movie: any): boolean {
    let user = JSON.parse(localStorage.getItem('user') || '');
    return user.favMovies.indexOf(movie._id) >= 0;
  }

  /**
   * logs out user
   */
  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }

  /**
   * navigates to user profile view
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }
}
