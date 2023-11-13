import { Component, OnInit } from '@angular/core';
import { ParfumService } from '../services/parfum.service';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-liste-marques',
  templateUrl: './liste-marques.component.html',
  styleUrls: ['./liste-marques.component.css'],
})
export class ListeMarquesComponent implements OnInit {
  marques!: Marque[];
  updatedMarq: Marque = { idMarque: 0, marqueName: '' };
  ajout: boolean = true;

  constructor(private parfumService: ParfumService) {}

  ngOnInit(): void {
    this.parfumService.listeMarques().subscribe((marqs) => {
      this.marques = marqs._embedded.marques;
      console.log(marqs);
    });
  }

  chargerMarque() {
    this.parfumService.listeMarques().subscribe((marq) => {
      this.marques = marq._embedded.marques;
      console.log(marq);
    });
  }

  marqueUpdated(marq: Marque) {
    console.log('marq updated event', marq);
    this.parfumService
      .ajouterMarque(marq)
      .subscribe(() => this.chargerMarque());
  }
  updateMarq(marq: Marque) {
    this.updatedMarq = marq;
    this.ajout = false;
  }
  supprimerMarque(marq: Marque) {
    let conf = confirm('etes-vous sur de supprimer la marque ?');
    if (conf) {
      this.parfumService.supprimerMarque(marq.idMarque).subscribe(() => {
        console.log('marque supprimée');
        this.chargerMarque();
      });
    }
  }
}
