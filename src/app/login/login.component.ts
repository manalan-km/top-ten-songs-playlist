import { Component } from '@angular/core';
import { CLIENT_ID, CLIENT_SECRET } from '../../secrets';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  #clientID:string
  #scope:string
  redirectURI:string


  constructor(private spotifyService: SpotifyService) { 
    this.#clientID = this.spotifyService.getClientID()
    this.#scope = this.spotifyService.getScope()
    this.redirectURI = this.spotifyService.getRedirectURI()
    
    console.log(this.#clientID, this.#scope)
    this.login()
  }

  generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  login = () => { 
    const state = this.generateRandomString(16);
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.#clientID,
      scope: this.#scope,
      redirect_uri: 'http://localhost:4200/update',
      state: state
    });

    // Redirect user to Spotify authorization page
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }
}
