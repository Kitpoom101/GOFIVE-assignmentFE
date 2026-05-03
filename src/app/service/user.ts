import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdDate?: string;
  role?: {
    roleId: string;
    roleName: string;
  };
  permissions?: Array<{
    permissionId: string;
    permissionName: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private apiUrl = `${environment.apiUrl}/api/v1/users`; // your backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
