import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { Router } from '@angular/router';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-add-parfum',
  templateUrl: './add-parfum.component.html',
  styleUrls: ['./add-parfum.component.css'],
})
export class AddParfumComponent implements OnInit {
  newParfum = new Parfum();
  marques!: Marque[];
  newIdMarque!: number;
  newMarque!: Marque;

  constructor(private parfumService: ParfumService, private router: Router) {}

  ngOnInit(): void {
    this.parfumService.listeMarques().subscribe((marqs) => {
      console.log(marqs);
      this.marques = marqs._embedded.marques;
    });
  }

  addParfum() {
    this.newParfum.marque = this.marques.find(
      (parf) => parf.idMarque == this.newIdMarque
    )!;
    this.parfumService.ajouterParfum(this.newParfum).subscribe((parf) => {
      console.log(parf);
      this.router.navigate(['parfums']);
    });
  }
}
