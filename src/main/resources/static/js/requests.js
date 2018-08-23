
export function getData(url, callback){
    fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(window.dev) {console.log("--------- Fetch Version");}
            callback(data);
        })
   
}

export function postData(url, data, callback) {
	  // Default options are marked with *
	  return fetch(url, {
	    body: JSON.stringify(data), // must match 'Content-Type' header
	    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	    credentials: 'same-origin', // include, same-origin, *omit
	    headers: {
	      'user-agent': 'Mozilla/4.0 MDN Example',
	      'content-type': 'application/json'
	    },
	    method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    mode: 'cors', // no-cors, cors, *same-origin
	    redirect: 'follow', // manual, *follow, error
	    referrer: 'no-referrer', // *client, no-referrer
	  })
	  .then(function(response) {
            return response.json();
        }).then(function(data) {
            if(window.dev) {console.log("--------- Fetch Version");}
            callback(data);
        }) // parses response to JSON
	}




export var groupJSON = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};














