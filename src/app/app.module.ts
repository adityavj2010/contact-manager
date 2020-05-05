import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from './services/user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    EditUserComponent,
    AddUserComponent,
    UserFormComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
