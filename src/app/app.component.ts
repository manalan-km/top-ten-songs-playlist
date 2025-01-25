import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'top-ten-songs-playlist';
  constructor(private spotifyService: SpotifyService) {}
}
