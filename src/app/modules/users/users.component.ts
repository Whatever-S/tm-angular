import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UsersStoreService } from 'src/app/services/users-store.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(public usersStoreService: UsersStoreService) { }

  ngOnInit(): void {
    this.usersStoreService.getUsers().subscribe();
  }

  checkboxChange(id: number, event: MatCheckboxChange): void {
    if (event.checked) {
      this.usersStoreService.addSelectedId(id);
    }

    if (!event.checked) {
      this.usersStoreService.removeSelectedId(id);
    }
  }
}
