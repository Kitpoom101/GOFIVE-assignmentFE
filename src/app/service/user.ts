import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username: string;
  password: string;
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

export interface UsersQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'username' | 'email' | 'createdDate';
  sortDir?: 'asc' | 'desc';
  search?: string;
}

export interface PagedUsersResponse {
  items: User[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private apiUrl = `${environment.apiUrl}/api/v1/users`; // your backend

  constructor(private http: HttpClient) {}

  getUsers(params: UsersQueryParams): Observable<PagedUsersResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 1)
      .set('pageSize', params.pageSize ?? 10)
      .set('sortBy', params.sortBy ?? 'name')
      .set('sortDir', params.sortDir ?? 'asc');

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PagedUsersResponse>(this.apiUrl, { params: httpParams });
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
