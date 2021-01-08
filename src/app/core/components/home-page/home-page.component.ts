import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { ConfigurationService } from 'src/app/shared/configuration.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router: Router,
    private configurationService: ConfigurationService) { }

  ngOnInit(): void {
  }

  startPlanning() {
    this.router.navigate(['/create-account']);

    if (this.configurationService.firstUse) {
    }
    else {
    }
  }
}
