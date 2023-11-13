import { Injectable } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Marque } from '../model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/marquewrapped';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ParfumService {
  apiURL: string = 'http://localhost:8081/parfums/ApiProjet';
  apiURLMarq: string = 'http://localhost:8081/parfums/marq';
  parfums: Parfum[]; //un tableau de Produit
  parfum!: Parfum;
  marques: Marque[];

public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string[];

  constructor(private http: HttpClient) {
    this.marques = [
      { idMarque: 1, marqueName: 'DIOR' },
      { idMarque: 2, marqueName: 'Chanel' },
      { idMarque: 3, marqueName: 'GUCCI' },
    ];
    this.parfums = [
      {
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
      },
    ];
  }

  listeParfums(): Observable<Parfum[]> {
    return this.http.get<Parfum[]>(this.apiURL);
  }
  ajouterParfum(parf: Parfum): Observable<Parfum> {
    return this.http.post<Parfum>(this.apiURL, parf, httpOptions);
  }
  supprimerParfum(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  //ou Bien
  /* this.parfums.forEach((cur, index) => {
  if(prod.idParfum === cur.idParfum) {
  this.parfums.splice(index, 1);
  }
  }); */

  consulterParfum(id: number): Observable<Parfum> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Parfum>(url);
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
    return this.http.put<Parfum>(this.apiURL, parf, httpOptions);
  }

  /*  listeMarques():Marque[] {
    return this.marques;
    } */

  listeMarques(): Observable<MarqueWrapper> {
    return this.http.get<MarqueWrapper>(this.apiURLMarq);
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
  ajouterMarque(marq: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.apiURLMarq, marq, httpOptions);
  }
  supprimerMarque(id: number) {
    const url = `${this.apiURLMarq}/${id}`;
    return this.http.delete(url, httpOptions);
  }




}
