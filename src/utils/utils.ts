async function fetchWebApi(endpoint:string, method:string, body:{}, token:string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }