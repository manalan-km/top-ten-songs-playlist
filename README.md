# TopTenSongsPlaylist

A really simple web application that runs locally to create a Spotify playlist with your 10 ten listened songs for the past 4 weeks.

Built using:
 - Angular 18: an overkill for a project like this but used for learning purposes.
 - Spotify API: Provides endpoints to access user's listening history and update playlist.


To use this application, you need:
- Create a spotify API app and copy the Spotify API client ID and Client Secret. Click [here](https://developer.spotify.com/documentation/web-api/concepts/apps) to know more.
- PNPM package installer.
- Node Version 20+

Steps to run this app:
- Create a spotify playlist and copy its playlist URI. Click [here](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) to learn about finding the URI.
- Create a file called 'secrets.ts' inside the *src/* and paste the Client ID, Client Secret, and the URI.
- Install the package by running `pnpm i`
- Run `ng serve` and header over to 'http://localhost:4200'.