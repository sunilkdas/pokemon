import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  public pokemons :[]; 
  public pokemondetails :any; 
  public urlsdetails :any;
  public allDetails :any;
  public seachitem: string;
  constructor() { }
  private url = 
  ['https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964'];
  ngOnInit() {
    this.getAllPokemons();
  }
  getAllPokemons(){
    let requests = this.url.map(url => fetch(url).then((res) => res.json()));
    console.log(requests);
    Promise.all(requests)
      .then(responses => {
          this.pokemons=responses[0].results;
         
          this.urlsdetails =  this.pokemons.map(i=> i['url']);
          this.getAllPokemonsDeatils();
         
      });
  
  }
  findPokeemon(){
    
     console.log("DSf"+this.seachitem )
    this.pokemondetails=[];
     this.allDetails.forEach(i => {
       if(i['name'].indexOf(this.seachitem)!=-1){
          
        this.pokemondetails.push(i);
          
       }
     });
    }
    
   
  
  getAllPokemonsDeatils(){
  let requests = this.urlsdetails.map(urlsdetails => fetch(urlsdetails).then((res) => res.json()));
    console.log(this.urlsdetails.length);
    Promise.all(requests)
      .then(responses => {
        this.pokemondetails=this.pokemons;
          var u=0;
          while(u<this.urlsdetails.length){
          this.pokemondetails[u]["details"]=(responses[u]);
          u++;
          }
      //    Object.assign(this.allDetails,this.pokemondetails);
          //localStorage.setItem("pokemons",JSON.stringify( this.pokemondetails));
          this.allDetails =JSON.parse(JSON.stringify( this.pokemondetails)); 
            console.log();
      });
  
  }
}
