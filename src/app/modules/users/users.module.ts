import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule} from '@angular/material/card';
import {MatCheckboxModule }  from '@angular/material/checkbox';





@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
