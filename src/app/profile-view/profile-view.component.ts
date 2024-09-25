import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})

/**
 * This class allows user to see their profile details and favourite movies array
 */
export class ProfileViewComponent {
  movies: any[] = [];
  favMovies: any[] = [];
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user);
  birthday = new Date(this.parsedUser.birthday);
  birthdayWithoutTime = this.birthday.toISOString().split('T')[0];

  constructor(
    public fetchMovies: FetchApiDataService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getFavMovies();
  }

  /**
   * GETs all movies from database and filters out any that are not favourited by user
   */
  getFavMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      let parsedUser = JSON.parse(this.user);

      this.favMovies = this.movies.filter(
        (movie) => parsedUser.favMovies.includes(movie._id) === true
      );
      return this.favMovies;
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
   * allows user to remove movie from favourite movies array
   * @param movie
   */
  deleteFavs(movie: any): void {
    let user = JSON.parse(localStorage.getItem('user') || '');

    this.fetchMovies
      .deleteFavMovies(user.username, movie._id)
      .subscribe((result: any) => {
        user.favMovies = result.favMovies;
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
        return result.favMovies;
      });
  }

  /**
   * evaluates whether a movie has been added to user's favourite movies array
   * @returns boolean
   */
  isFav(movie: any): boolean {
    let user = JSON.parse(localStorage.getItem('user') || '');
    return user.favMovies.indexOf(movie._id) >= 0;
  }

  /**
   * opens profile edit dialog
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px',
    });
  }

  /**
   * logs out user
   */
  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }

  /**
   * navigates back to main movie view
   */
  goHome(): void {
    this.router.navigate(['movies']);
  }
}
