import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../inferfaces/view-orden.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private http = inject(HttpClient);
  urlbase= 'http://localhost:8080/api/cliente';

    execute(): Observable<IClient[]> {
      return this.http.get<IClient[]>(this.urlbase);
    }

    deleteClientById(id: number): Observable<void>{
      const confirmed = window.confirm(
        '¿Estás seguro de que deseas eliminar a este cliente?'
      );
      if (confirmed) {
        return this.http.delete<void>(`${this.urlbase}/${id}`);
      } else {
        return new Observable<void>();
      }
    }
    getClientById(id: number): Observable<IClient> {
      return this.http.get<IClient>(`${this.urlbase}/${id}`);
    }
    createClient(payload: IClient): Observable<IClient> {
        return this.http.post<IClient>(this.urlbase, payload);
      }
    updateClient(client: IClient): Observable<IClient> {
        return this.http.put<IClient>(`${this.urlbase}/${client.id}`, client);
      }
}
