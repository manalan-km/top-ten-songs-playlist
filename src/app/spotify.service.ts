import { Injectable } from '@angular/core';
import { CLIENT_ID, CLIENT_SECRET, PLAYLIST_URI } from '../secrets';
import { AuthCode } from '../Models/AuthorizationCode';
import { TokenData } from '../Models/TokenData';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientID = CLIENT_ID
  private clientSecret = CLIENT_SECRET
  private playlistURI = PLAYLIST_URI

  private updateState: 'Not updated yet' | 'Updating' | 'Updated' | 'Failed with errors' = 'Not updated yet'

  scope = "user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private"

  code: AuthCode
  codeValidity: boolean

  token!:TokenData
  constructor() {
    this.codeValidity = false
    this.code = {
      code: '',
      state:''
    }
   }

  getClientID() :string { 
    return this.clientID
  } 

  getClientSecret() :string { 
    return this.clientSecret
  } 

  getScope() :string { 
    return this.scope
  }

  getCode() { 
    return this.code
  }

  getUpdateState() { 
    return this.updateState
  }

  getRedirectURI() { 
    return "http://localhost:4200/update"
  }

  async getTopTenSongsURIs() { 
    let songURIs: string[] = [];

    const accessToken = this.token.access_token
    const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10' 

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    try{ 
      const response = await fetch(url, {
        headers: headers,
      })
      if(response.ok) { 
        const data:SpotifyApi.UsersTopTracksResponse = await response.json()
        const items = data.items
  
        items.forEach( song => songURIs.push( song.uri ))
      }
      else { 
        throw new Error(`Failed fetching top 10 songs : ${response.status} : ${response.statusText} `)
      }
    }
    catch(err) { 
      console.error('Error fetching top 10 songs: ',err)
    }
    

    return songURIs
  }
  
  isCodeValid() : boolean { 
    return this.codeValidity
  }

  setCode(params:any) { 
    if(params.error) { 
      console.log('Code not received with error:', params.error)
      this.codeValidity =  false
    }
    else { 
      this.code.code = params.code
      this.code.state = params.state
      this.codeValidity = true
    }
    
  }

  get AccessToken() { 
    return this.token.access_token;
  }

  async setAccessToken() { 
    const code = this.getCode()
    console.log('Code:', code)
    const clientID = this.getClientID()
    const clientSecret = this.getClientSecret()
    if(code.state === null) { 
      console.log('State Mismatch')
    }
    else { 

      const url = 'https://accounts.spotify.com/api/token'
      const body = new URLSearchParams(
        {
          code: code.code!,
          redirect_uri: this.getRedirectURI(),
          grant_type: 'authorization_code'
        }
      )
      const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`)
      }

      try { 
        const response = await fetch(url,{
          method:"POST",
          body: body,
          headers: headers
        })
        this.token = await response.json()
        console.log(this.token  )
      }

      catch(err) { 
        console.log(`Failed to set access Token: ${err}`)
      }
      
    }
  }

  uriCSVgenerator(URIs: string[]) :string { 
    return URIs.join(",")
  }

  async updatePlaylist() { 

    const topSongsURIs: string[] = await this.getTopTenSongsURIs() 
    const uriStrings : string = this.uriCSVgenerator(topSongsURIs)

    const url = `https://api.spotify.com/v1/playlists/${this.playlistURI}/tracks?uris=` + encodeURIComponent(uriStrings)


    const accessToken = this.token.access_token
    
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    try { 
      const response = await fetch(url,{
        method:"PUT",
        headers: headers,
      })
      
      if(response.ok) { 
        console.log('Updated Playlist!')
        this.updatePlaylistDescription()

      }
      else { 
        throw new Error(`Failed updating top 10 songs : ${response.status} : ${response.statusText} `)
      }
      
    }

    catch(err) { 
      console.log(`Failed to update playlist ${err}`)
    }
    




  }


  async updatePlaylistDescription() { 
    const description = `This is my top 10 frequently listened songs for the past week. Updated on ${new Date()}`
    const accessToken = this.token.access_token

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }

    const body = {
      "description": description,
      "public": false
    }

    const url = "https://api.spotify.com/v1/playlists/" + this.playlistURI

    try { 
      const response = await fetch(url,{
        method:"PUT",
        headers: headers,
        body: JSON.stringify(body)
      })
      
      if(response.ok) { 
        console.log('Updated Playlist Description!')
      }
      else { 
        throw new Error(`Failed updating description : ${response.status} : ${response.statusText} `)
      }
      
    }

    catch(err) { 
      console.log(`Failed to update playlist description ${err}`)
    }


  }

}
