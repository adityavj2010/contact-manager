import { Injectable } from '@angular/core';
import { LocalStorageDataSource } from '../shared/classes/local-storage.datasource';

@Injectable({
  providedIn: 'root'
})
export class UserService extends LocalStorageDataSource {

}
