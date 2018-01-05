import {Component, OnInit} from '@angular/core';
import {Aquarium} from  '../models/models';
import {AquariumService} from '../services/services';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-aquarium',
  templateUrl: './aquarium.component.html',
  styleUrls: ['./aquarium.component.css']
})
export class AquariumComponent implements OnInit {

  public aquarium: Aquarium;

  constructor(public aquariumService: AquariumService) {
    this.aquarium = new Aquarium();
  }

  ngOnInit() {
    this.refresh();
  }

  onChangeSocket(event: any, socketNumber: number): void {
    //console.log(event.target.checked, socketNumber)
    this.aquariumService.switchSocket(socketNumber, event.target.checked)
      .then(data => {
        setTimeout(this.refresh.bind(this), 3000);
      })
      .catch(err => {

      });
  }

  refresh(): void {
    this.aquariumService.getStatus()
      .then(aq => {
        this.aquarium = aq;
      }).catch(err => {

    })
  }

}
