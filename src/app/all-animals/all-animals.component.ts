import { Component, OnInit } from '@angular/core';
import { IntakeService } from '../intake.service';

@Component({
  selector: 'app-all-animals',
  templateUrl: './all-animals.component.html',
  styleUrls: ['./all-animals.component.scss']
})
export class AllAnimalsComponent implements OnInit {

  constructor(private intakeService: IntakeService) { }

  ngOnInit() {
  }

}
