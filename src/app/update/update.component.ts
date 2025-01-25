import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { 
  }

  async ngOnInit() {
    // Subscribe to queryParams observable to read the parameters
    const queryParams = this.route.snapshot.queryParams;
    this.spotifyService.setCode(queryParams)
    if(this.spotifyService.isCodeValid()) { 
      await this.spotifyService.setAccessToken()
      this.updatePlaylist()
    }
  }

  updatePlaylist(){
    this.spotifyService.updatePlaylist()
  }

}
