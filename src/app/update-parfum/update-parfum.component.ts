import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParfumService } from '../services/parfum.service';
import { Parfum } from '../model/parfum.model';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-parfum',
  templateUrl: './update-parfum.component.html',
  styleUrls: ['./update-parfum.component.css'],
})
export class UpdateParfumComponent implements OnInit {
  currentParfum = new Parfum();
  marques!: Marque[];
  updatedIdMarque!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private parfumService: ParfumService
  ) {}

  ngOnInit(): void {
    this.parfumService.listeMarques().subscribe((marqs) => {
      this.marques = marqs._embedded.marques;
      console.log(marqs);
    });
    this.parfumService
      .consulterParfum(this.activatedRoute.snapshot.params['id'])
      .subscribe((parf) => {
        this.currentParfum = parf;
        this.updatedIdMarque = this.currentParfum.marque.idMarque;
      });
  }

  updateParfum() {
    this.currentParfum.marque = this.marques.find(
      (marq) => marq.idMarque == this.updatedIdMarque
    )!;
    this.parfumService.updateParfum(this.currentParfum).subscribe((parf) => {
      this.router.navigate(['parfums']);
    });
  }
}
