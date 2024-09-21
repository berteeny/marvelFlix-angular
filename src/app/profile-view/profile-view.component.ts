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
export class ProfileViewComponent {
  movies: any[] = [];
  favMovies: any[] = [];
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user);

  constructor(
    public fetchMovies: FetchApiDataService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getFavMovies();
  }

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

  deleteFavs(movie: any): void {
    let user = JSON.parse(localStorage.getItem('user') || '');

    this.fetchMovies
      .deleteFavMovies(user.username, movie._id)
      .subscribe((result: any) => {
        user.favMovies = result.favMovies;
        localStorage.setItem('user', JSON.stringify(user));
        return result.favMovies;
      });
  }

  isFav(movie: any): boolean {
    let user = JSON.parse(localStorage.getItem('user') || '');
    return user.favMovies.indexOf(movie._id) >= 0;
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px',
    });
  }

  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }

  goHome(): void {
    this.router.navigate(['movies']);
  }
}
