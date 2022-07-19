import { Component } from '@angular/core';
import { MatchmakingService } from './matchmaking.service';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css'],
})
export class MatchmakingComponent {

  //Original gamemode
  originalQueue : boolean = false;
  nbPlayersOriginal : number = 0;
  //timer
  msInQueue : number = 0;
  secInQueue : number = 0;
  running: boolean = false;
  timer = 0;

  constructor(private matchmakingService: MatchmakingService) {}

  startTimer(queueBool: boolean) {
    if (queueBool) {
      const startTime = Date.now() - (this.msInQueue || 0);
      this.timer = setInterval(() => {
        this.msInQueue = Date.now() - startTime;
        if (this.msInQueue / 1000 >= this.secInQueue)
          this.secInQueue++;
      });
    }
    else
      clearInterval(this.timer);
  }

  clearTimer(queueBool: boolean) {
    this.msInQueue = 0;
    this.secInQueue = 0;
    clearInterval(this.timer);
  }

  buttonRequestJoinNormalMatchMaking() {
    this.matchmakingService.requestJoinNormalMatchMaking();
    this.originalQueue = true;
    this.startTimer(this.originalQueue);
  }

  buttonRequestLeaveNormalMatchMaking() {
    this.matchmakingService.requestLeaveNormalMatchMaking();
    this.originalQueue = false;
    this.clearTimer(this.originalQueue);
  }
}
