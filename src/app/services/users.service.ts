import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { User } from '../modules/users/user.interface'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '../../assets/data.json';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(ids: number[]): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => users.filter(user => !ids.find(id => user.id === id)))
    );
  }

  searchUsers(value: string): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => users.filter((user) => user.firstName.toLowerCase().includes(value.toLowerCase()) || user.lastName.toLowerCase().includes(value.toLowerCase())))
    );
  }
}
