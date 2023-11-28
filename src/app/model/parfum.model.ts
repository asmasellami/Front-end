import { Marque } from "./marque.model";
import { Image } from "./Image.model";

export class Parfum {
   idParfum!:number;
	 parfumName?:string;
	 parfumPrice?:number;
	 releasedate?:Date;
   marque! : Marque;
   image! : Image;
   imageStr!:string
   images!: Image[];




}
