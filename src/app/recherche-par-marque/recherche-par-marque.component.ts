import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Marque } from '../model/marque.model';
import { ParfumService } from '../services/parfum.service';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styleUrls: ['./recherche-par-marque.component.css']
})
export class RechercheParMarqueComponent implements OnInit {


  parfums!: Parfum[];
  IdMarque!: number;
  marques!: Marque[];

  constructor(private parfumService: ParfumService) { }

  ngOnInit(): void {
    this.parfumService.listeMarques().
      subscribe(marqs => {
        this.marques = marqs._embedded.marques;
        console.log(marqs);
      });


  }

  onChange() {
    this.parfumService.rechercherParMarque(this.IdMarque).
      subscribe(parfs => { this.parfums = parfs });
  }


}
