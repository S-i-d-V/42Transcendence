import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PopupsService } from '../popups.service';

interface Player {
  nbLoses: number;
  nbWins: number;
  score: number;
  username: string;

  showButtons: boolean;
}

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.component.html',
  styleUrls: ['./ladder.component.css'],
})
export class LadderComponent implements OnInit {
  ladder: Array<Player> = [];
  isLoaded = false;

  buttons: boolean = false;

  constructor(private http: HttpClient, public popupsService: PopupsService) {
    this.http
      .get<Array<Player>>(`${environment.backend}/game/ladder`)
      .subscribe((data) => {
        this.ladder = data;
        this.isLoaded = true;
      });
  }

  ngOnInit(): void {
    //
  }

  colorPodium(index: number): string {
    if (index === 1) return 'first';
    else if (index === 2) return 'second';
    else if (index === 3) return 'third';
    else return '';
  }

  scoreEvolution(rank: number, lastRank: number): string {
    if (rank > lastRank) return 'up';
    else if (rank < lastRank) return 'down';
    else return 'equal';
  }

  displayButtons(){
    this.buttons = true;
  }

  displayPlayer() {
    this.buttons = false;
  }
}
