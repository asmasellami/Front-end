import { Component, OnInit } from '@angular/core';
import { ParfumService } from '../services/parfum.service';
import { Parfum } from '../model/parfum.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit {
  nomParfum! : string;
  parfums!: Parfum[];

  allParfums!: Parfum[];
  searchTerm!: string;
  constructor(private parfumService: ParfumService) { }

  ngOnInit(): void {
    this.parfumService.listeParfums().subscribe(parfs => {
      console.log(parfs);
      this.allParfums = parfs;
      this.parfums = parfs;
      });
  }

  rechercherParfs(){
    this.parfumService.rechercherParNom(this.nomParfum).
    subscribe(parfs => {
    this.parfums = parfs;
    console.log(parfs)});
    }

  onKeyUp(filterText : string){

      this.parfums = this.allParfums.filter(item =>
      item?.parfumName?.toLowerCase().includes(filterText));

    }

}
