import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() search = new EventEmitter<string>();
  @Output() selectAll = new EventEmitter<void>();
  @Output() sortFieldChange = new EventEmitter<string>();
  @Output() deleteSelected = new EventEmitter<void>();

  sortField: string = 'firstname';
  selectedUsers: number[] = [];

  applyFilter(filterValue: string) {
    const trimmedValue = filterValue.trim().toLowerCase();
    this.search.emit(trimmedValue);
  }

  sort() {
    this.sortFieldChange.emit(this.sortField);
  }

  onSelectionChange(event: any, id: number) {
    if (event.checked) {
      this.selectedUsers.push(id);
    } else {
      const index = this.selectedUsers.indexOf(id);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
  }

  onDeleteSelected() {
    this.deleteSelected.emit();
  }

  onSelectAll() {
    this.selectAll.emit();
  }

}
