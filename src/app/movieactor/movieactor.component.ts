import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-movieactor",
  templateUrl: "./movieactor.component.html",
  styleUrls: ["./movieactor.component.css"],
})
export class MovieactorComponent implements OnInit {
    actorsDB: any[] = [];
    moviesDB: any[] = [];
    actorId: string = "";
    movieId: string = "";
    constructor(private dbService: DatabaseService, private router: Router) {}
    ngOnInit() {
        this.dbService.getActors().subscribe((data: any[]) => {
          this.actorsDB = data;
        });
        this.dbService.getMovies().subscribe((data: any[]) => {
            this.moviesDB = data;
          });
      }
    onSelectUpdateMovie(item) {
        this.movieId = item._id;
    }
    onSelectUpdateActor(item){
        this.actorId = item._id;
    }
    addMovieToActor(){
        this.dbService.addMovieToActor(this.movieId, this.actorId).subscribe(result => {
            this.router.navigate(["/listmovies"]);
        })
    }
}