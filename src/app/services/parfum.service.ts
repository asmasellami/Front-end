import { Injectable } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Marque } from '../model/marque.model';
import { Image } from '../model/Image.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/marquewrapped';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ParfumService {
  apiURL: string = 'http://localhost:8081/parfums/ApiProjet';
  apiURLMarq: string = 'http://localhost:8081/parfums/marq';
  parfums: Parfum[]; //un tableau de Parfum
  parfum!: Parfum;
  marques: Marque[];

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.marques = [
     /*  { idMarque: 1, marqueName: 'DIOR' },
      { idMarque: 2, marqueName: 'Chanel' },
      { idMarque: 3, marqueName: 'GUCCI' }, */
    ];
    this.parfums = [
      /*  {
        idParfum: 1,
        parfumName: 'Sauvage',
        parfumPrice: 300.6,
        releasedate: new Date('02/15/2015'),
        marque: { idMarque: 1, marqueName: 'DIOR' },
      },
      {
        idParfum: 2,
        parfumName: 'Gucci Bloom',
        parfumPrice: 450,
        releasedate: new Date('12/17/2017'),
        marque: { idMarque: 3, marqueName: 'GUCCI' },
      },
      {
        idParfum: 3,
        parfumName: 'Chanel 5',
        parfumPrice: 900.123,
        releasedate: new Date('02/20/1990'),
        marque: { idMarque: 2, marqueName: 'Chanel' },
      }, */
    ];
  }

  /*   listeParfums(): Observable<Parfum[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Parfum[]>(this.apiURL + '/all', {
      headers: httpHeaders,
    });
  }
 */

  /* listeParfums(): Observable<Parfum[]>{
    return this.http.get<Parfum[]>(this.apiURL+"/all");
   } */

  listeParfums(): Observable<Parfum[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Parfum[]>(this.apiURL + '/all', {
      headers: httpHeaders,
    });
  }

  ajouterParfum(prod: Parfum): Observable<Parfum> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Parfum>(this.apiURL + '/addParf', prod, {
      headers: httpHeaders,
    });
  }

  supprimerParfum(id: number) {
    const url = `${this.apiURL}/delParf/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterParfum(id: number): Observable<Parfum> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Parfum>(url, { headers: httpHeaders });
  }

  /*
  trierParfums() {
    this.parfums = this.parfums.sort((n1, n2) => {
      if (n1.idParfum! > n2.idParfum!) {
        return 1;
      }
      if (n1.idParfum! < n2.idParfum!) {
        return -1;
      }
      return 0;
    });
  } */

  updateParfum(parf: Parfum): Observable<Parfum> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Parfum>(this.apiURL + '/updateParf', parf, {
      headers: httpHeaders,
    });
  }

  listeMarques(): Observable<MarqueWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<MarqueWrapper>(this.apiURLMarq, {
      headers: httpHeaders,
    });
  }

  consulterMarque(id: number): Marque {
    return this.marques.find((marq) => marq.idMarque == id)!;
  }

  rechercherParMarque(idMarque: number): Observable<Parfum[]> {
    const url = `${this.apiURL}/nomParf/${idMarque}`;
    return this.http.get<Parfum[]>(url);
  }

  rechercherParNom(nom: string): Observable<Parfum[]> {
    const url = `${this.apiURL}/parfsByName/${nom}`;
    return this.http.get<Parfum[]>(url);
  }

  /* ajouterMarque(marq: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.apiURLMarq, marq, httpOptions);
  }
 */

  ajouterMarque(marq: Marque): Observable<Marque> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt; // Make sure to include a space after 'Bearer'
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Marque>(this.apiURLMarq, marq, {
      headers: httpHeaders,
    });
  }

  supprimerMarque(id: number) {
    const url = `${this.apiURLMarq}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageParf(file: File,filename: string,idParf: number): Observable<any> {

    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageParf'}/${idParf}`;
    return this.http.post(url, imageFormData);

  }
  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

  uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
    }
}
