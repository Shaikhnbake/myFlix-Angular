import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';

//Declare api url that provides data for client app
const apiUrl = 'https://myflix1najm.herokuapp.com'

@Injectable({
  providedIn: 'root'
})

// fetch api data service function
export class UserRegistrationService {

  //HttpClient module is used as constructor param allowing HttpClient to access the entire class 
  // making it available via this.http
  constructor(private http: HttpClient) {}

  //API call for user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails,
      {headers: new HttpHeaders({ 
        Authorization: 'Bearer ' + token, 
      })}
      )
      .pipe(catchError(this.handleError));
  }

  //API call for user login
  public userLogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails,
        {headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token, 
        })}
      )
      .pipe(catchError(this.handleError));
  }

  //API call to get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', 
        {headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token, 
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //API call to get one movies
  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies' + Title, 
        {headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token, 
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //API call to get director information
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies' + '/director' + directorName, 
        {headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token, 
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //API call to get genre information
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies' + '/genre' + genreName, 
        {headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token 
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //API call to get current User Information
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users' + username, 
        {headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //API call to get favorite movies list of current user
  getTopMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users' + username, 
        {headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.topMovies),
        catchError(this.handleError)
      );
  }

  //API call to Add movie to user's favorite movie list
  addTopMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
      return this.http
        .post(apiUrl + '/users' + username + '/movies' + movieId,
          { topMovies: movieId }, 
          { headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  //API call to Delete movie from user's favorite movie list
  deleteTopMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
      return this.http
        .delete(apiUrl + '/users' + username + '/movies' + movieId, 
          { headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  //API call to Edit/Update user information
  updateUserInfo(newUserInfo: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
      return this.http
        .put(apiUrl + '/users' + username, newUserInfo, 
          { headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  //API call to Delete user
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
      return this.http
        .delete(apiUrl + '/users' + username, 
          { headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }


  //Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  //ERROR HANDLER
  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('Error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Error has occured; please try again later!')
  }

}
