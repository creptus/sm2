import {Component, OnInit} from '@angular/core';
import {Bedroom} from '../models/models';
import {BedroomService} from '../services/services';
import {Subscription} from 'rxjs/Subscription';
import {LampDirective} from '../directive/lamp.directive';

@Component({
  selector: 'app-bedroom',
  templateUrl: './bedroom.component.html',
  styleUrls: ['./bedroom.component.css']
})
export class BedroomComponent implements OnInit {

  public bedroom: Bedroom;

  constructor(public bedroomService: BedroomService) {
    this.bedroom = new Bedroom();
  }

  refresh(): void {
    this.bedroomService.getStatus()
      .then(b => {
        this.bedroom = b;
      }).catch(err => {

    });
  }

  ngOnInit() {
    this.refresh();
  }

  moveServo(command: string): void {
    this.bedroomService.moveServo({command: command})
      .then(b => {

      }).catch(err => {

    });
  }
}
