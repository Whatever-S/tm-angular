import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SortedFields, User } from '../modules/users/user.interface';
import { UserService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  private readonly sortBy$$ = new BehaviorSubject<SortedFields>('firstName');
  private readonly checkedUserIds$$ = new BehaviorSubject<number[]>([]);
  private readonly users$$ = new BehaviorSubject<User[]>([]);

  readonly sortBy$ = this.sortBy$$.asObservable();
  readonly checkedUserIds$ = this.checkedUserIds$$.asObservable();
  readonly users$ = this.users$$.asObservable();

  constructor(private readonly userService: UserService) {}

  getUsers(): Observable<User[]> {
    return this.userService.getUsers().pipe(
      tap(users => this.users$$.next(this.sort(users)))
    );
  }

  deleteUsers(): Observable<User[]> {
    const ids = this.checkedUserIds$$.getValue();

    return this.userService.deleteUser(ids).pipe(
      tap((users) => this.users$$.next(this.sort(users)))
    );
  }

  searchUsers(value: string): Observable<User[]> {
    return this.userService.searchUsers(value).pipe(
      tap(users => this.users$$.next(this.sort(users)))
    );
  }

  updateSortRule(sortedBy: SortedFields): void {
    this.sortBy$$.next(sortedBy);
  }

  sortUsers(): User[] {
    const users = this.users$$.getValue();

    return this.sort(users);
  }

  sort(users: User[]): User[] {
    const sortedBy = this.sortBy$$.getValue();

    return users.sort((user1, user2) => user1[sortedBy].localeCompare(user2[sortedBy]));
  }

  addSelectedId(id: number): void {
    if (!this.checkedUserIds$$.getValue().includes(id)) {
      this.checkedUserIds$$.next([...this.checkedUserIds$$.getValue(), id]);
    }
  }

  removeSelectedId(id: number): void {
    this.checkedUserIds$$.next(this.checkedUserIds$$.getValue().filter(item => item !== id));
  }

  selectAll(): void {
    this.checkedUserIds$$.next(this.users$$.getValue().map(user => user.id));
  }

}
