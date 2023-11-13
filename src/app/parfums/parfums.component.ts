import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-parfums',
  templateUrl: './parfums.component.html',
  styleUrls: ['./parfums.component.css']
})
export class ParfumsComponent implements OnInit {
  parfums? : Parfum[]; //un tableau de chînes de caractères


  constructor(private parfumService: ParfumService,public authService: AuthService) {
    //this.parfums = parfumService.listeParfums();

   }

  ngOnInit(): void {
    this.parfumService.listeParfums().subscribe(parf => {
      console.log(parf);
      this.parfums = parf;
      });

  }

  chargerParfums(){
    this.parfumService.listeParfums().subscribe(parf => {
    console.log(parf);
    this.parfums = parf;
    });
    }
  supprimerParfum(p: Parfum)
{
//console.log(p);
let conf = confirm("Etes-vous sûr de supprimer ce parfum ?");
 if (conf)
this.parfumService.supprimerParfum(p.idParfum).subscribe(() => {
  console.log("produit supprimé");
  this.chargerParfums();
});

}


}
