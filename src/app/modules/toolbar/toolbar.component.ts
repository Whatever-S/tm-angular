import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsersStoreService } from "../../services/users-store.service";
import { MatSelectChange } from "@angular/material/select";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @ViewChild('firstNameInput') firstNameInput!: ElementRef<MatInput>;

  constructor(public usersStoreService: UsersStoreService) {}

  deleteSelected(): void {
    this.firstNameInput.nativeElement.value = '';
    this.usersStoreService.deleteUsers().subscribe();
  }

  selectAll(): void {
    this.usersStoreService.selectAll()
  }

  sortUsers(event: MatSelectChange): void {
    this.usersStoreService.updateSortRule(event.value);
    this.usersStoreService.sortUsers();
  }

  searchUsers() {
    this.usersStoreService.searchUsers(this.firstNameInput.nativeElement.value).subscribe();
  }
}
