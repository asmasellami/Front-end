import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParfumService } from '../services/parfum.service';
import { Parfum } from '../model/parfum.model';
import { Marque } from '../model/marque.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-parfum',
  templateUrl: './update-parfum.component.html',
  styleUrls: ['./update-parfum.component.css'],
})
export class UpdateParfumComponent implements OnInit {
  currentParfum = new Parfum();
  marques!: Marque[];
  updatedIdMarque!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private parfumService: ParfumService
  ) {}

  /* ngOnInit(): void {
    this.parfumService.listeMarques().subscribe((marqs) => {
      this.marques = marqs._embedded.marques;
      console.log(marqs);
    });
    this.parfumService
      .consulterParfum(this.activatedRoute.snapshot.params['id'])
      .subscribe((parf) => {
        this.currentParfum = parf;
        this.updatedIdMarque = this.currentParfum.marque.idMarque;

        this.parfumService
          .loadImage(this.currentParfum.image.idImage)
          .subscribe((img: Image) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
          });
      });
  }
 */

  ngOnInit(): void {
    this.parfumService.listeMarques().subscribe((marqs) => {
      this.marques = marqs._embedded.marques;
      console.log(marqs);
    });
    this.parfumService
      .consulterParfum(this.activatedRoute.snapshot.params['id'])
      .subscribe((parf) => {
        this.currentParfum = parf;
        this.updatedIdMarque = parf.marque.idMarque;

      });
this.updateParfum();
  }




  /* updateParfum() {
    this.currentParfum.marque = this.marques.find(
      (marq) => marq.idMarque == this.updatedIdMarque
    )!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.parfumService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentParfum.image = img;
          this.parfumService
            .updateParfum(this.currentParfum)
            .subscribe((parf) => {
              this.router.navigate(['parfums']);
            });
        });
    } else {
      this.parfumService
        .updateParfum(this.currentParfum)
        .subscribe((parf) => {
          this.router.navigate(['parfums']);
        });
    }
  } */
/*
  updateParfum() {
    this.currentParfum.marque = this.marques.find(
      (marq) => marq.idMarque == this.updatedIdMarque
    )!;
    this.parfumService.updateParfum(this.currentParfum).subscribe((parf) => {
      this.router.navigate(['parfums']);
    });
  } */

  updateParfum() {
    this.currentParfum.marque = this.marques.
      find(marq => marq.idMarque == this.updatedIdMarque)!;
    this.parfumService
      .updateParfum(this.currentParfum)
      .subscribe((parf) => {

        this.parfumService
        .uploadImageFS(this.uploadedImage,
          this.uploadedImage.name, parf.idParfum!)
        .subscribe((response: any) => { }
     )
          this.router.navigate(['parfums']);
      });
  }


  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
/*
  onAddImageParfum() {
    this.parfumService.uploadImageParf(this.uploadedImage,this.uploadedImage.name,this.currentParfum.idParfum)
      .subscribe((img: Image) => {
        this.currentParfum.images.push(img);
      });
  } */

  onAddImageParfum() {
    if (this.uploadedImage) {
      this.parfumService.uploadImageParf(this.uploadedImage, this.uploadedImage.name, this.currentParfum.idParfum)
        .subscribe((img: Image) => {
          this.currentParfum.images.push(img);
        });
    }
  }

  supprimerImage(img: Image) {
    let conf = confirm('Etes-vous sûr de supprimer cet image ?');
    if (conf)
      this.parfumService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentParfum.images
        const index = this.currentParfum.images.indexOf(img, 0);
        if (index > -1) {
          this.currentParfum.images.splice(index, 1);
        }
      });
  }
}
