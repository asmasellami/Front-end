import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { Router } from '@angular/router';
import { Marque } from '../model/marque.model';
import { Image } from '../model/Image.model';
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
  uploadedImage!: File;
  imagePath: any;

  constructor(private parfumService: ParfumService, private router: Router) {}

  ngOnInit(): void {
    this.parfumService.listeMarques().subscribe((marqs) => {
      console.log(marqs);
      this.marques = marqs._embedded.marques;
    });
    this.addParfum();
  }

  /* addParfum() {

    this.parfumService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.newParfum.image=img;

    this.newParfum.marque = this.marques.find((parf) => parf.idMarque == this.newIdMarque)!;
    this.parfumService.ajouterParfum(this.newParfum).subscribe((parf) => {

      console.log(parf);
      this.router.navigate(['parfums']);

    });
    });
  } */

  addParfum() {
    this.newParfum.marque = this.marques.find((parf) => parf.idMarque == this.newIdMarque)!;
    this.parfumService.ajouterParfum(this.newParfum).subscribe((parf)=> {
      this.parfumService.uploadImageFS(
          this.uploadedImage,
          this.uploadedImage.name,
          parf.idParfum

        )
      this.router.navigate(['parfums']);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
