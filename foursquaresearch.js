const API_Base_Url = "https://api.foursquare.com/v3" //will require 'Search for Places' endpoint
const API_key = "fsq3R1hT9y8NcNogN8uaO/32VvoruReXBXuuIXAEkD2YmGs="
const headers = {
    Accept: 'application/json',
    Authorization: API_key
}

async function search(lat, lng, query){

    let ll = lat + "," + lng;    //mimic ll parameter in foursquare
    let response = await axios.get(API_Base_Url + "/places/search", {
        headers: {
            ...headers //This expands the object of headers, namely Accept and Authorization
        },
        params: {
            'll': ll,
            'query': query,
            'v': '20210903', // v is params for Foursquare version of API
            'limit': '8'
        }
    })
    return response.data;
}

// in console-> await search(40.74, -73.99, "tacos") These calls the function with the 3 arguments of lat, lng, query
// in console-> 'network' tab, find the search operation, go to 'response' tab, this response.data copy to JSON pathfinder



    //end point parameters needed