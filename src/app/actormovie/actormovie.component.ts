import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-actormovie",
  templateUrl: "./actormovie.component.html",
  styleUrls: ["./actormovie.component.css"],
})
export class ActormovieComponent implements OnInit {
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
    addActorToMovie(){
        this.dbService.addActorToMovie(this.actorId, this.movieId).subscribe(result => {
            this.router.navigate(["/listmovies"]);
        })
    }
}