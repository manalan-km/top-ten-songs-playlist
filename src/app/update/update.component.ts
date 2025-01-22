import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  queryParams: any;

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    // Subscribe to queryParams observable to read the parameters
    this.route.queryParams.subscribe((params) => {
      console.log('Query Parameters:', params);
      this.queryParams = params;
    });
  }
}
