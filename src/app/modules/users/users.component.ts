import { Component } from '@angular/core';
import { User } from './user.interface';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users)
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(users => {
      this.users = users;
    });
  }
}
