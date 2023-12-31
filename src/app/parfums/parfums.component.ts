import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { AuthService } from '../services/auth.service';
import { Image } from "../model/Image.model";
@Component({
  selector: 'app-parfums',
  templateUrl: './parfums.component.html',
  styleUrls: ['./parfums.component.css']
})
export class ParfumsComponent implements OnInit {
  parfums? : Parfum[]; //un tableau de chînes de caractères
  apiURL: string = 'http://localhost:8081/parfums/ApiProjet';


  constructor(private parfumService: ParfumService,public authService: AuthService) {
    //this.parfums = parfumService.listeParfums();

   }

  ngOnInit(): void {
     /* this.parfumService.listeParfums().subscribe(parf => {
      console.log(parf);
      this.parfums = parf;
      }); */
this.chargerParfums();
    }


   /*   111 chargerParfums(){
    this.parfumService.listeParfums().subscribe(parf => {
    this.parfums = parf;
    this.parfums.forEach((parf) => {
      this.parfumService
      .loadImage(parf.image.idImage)
      .subscribe((img: Image) => {
        parf.imageStr = 'data:' + img.type + ';base64,' + img.image;

      });
      });
   // console.log(parf);
    });
    } */
      chargerParfums(){
      this.parfumService.listeParfums().subscribe(parf => {
      this.parfums = parf;
     /*  this.parfums.forEach((parf) => {
        parf.imageStr = 'data:' + parf.images[0].type + ';base64,' +
        parf.images[0].image;
      }); */
      });
      }

  supprimerParfum(p: Parfum)
{
//console.log(p);
let conf = confirm("Etes-vous sûr de supprimer ce parfum ?");
 if (conf)
this.parfumService.supprimerParfum(p.idParfum).subscribe(() => {
  console.log("parfum supprimé");
  this.chargerParfums();
});

}


}
