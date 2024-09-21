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

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      return this.movies;
    });
  }

  openGenre(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genreName: movie.genre },
    });
  }

  openDirector(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { directorName: movie.director },
    });
  }

  openSynopsis(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: { movie: movie },
    });
  }

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

  isFav(movie: any): boolean {
    let user = JSON.parse(localStorage.getItem('user') || '');
    return user.favMovies.indexOf(movie._id) >= 0;
  }

  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }
  goToProfile(): void {
    this.router.navigate(['profile']);
  }
}
