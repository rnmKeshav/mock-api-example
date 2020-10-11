This example covers cases you want to forward/proxy your requests to your backend service/API layer and use that response to build your application. Example here assumes you already have a backend service for required API calls.

## Mock-api example to forward all request

### Problem 1:
I have an application which makes API call to a service(`forward_service_1`) and renders application based on response data from the service. I am facing `CORS` issue from my client(`localhost`) and unable to make `POST`, `PATCH` request. What can i do to fix these issues?

### Answer 1:

Following steps can be done to solve this issue.

Step 1: Install [mock-api](https://github.com/rnmKeshav/mock-api)
Step 2: Run setup steps (`npx mock-api-setup`) and add a npm script in your `package.json`

 - What is your API service hostname? This can be something like `https://www.practo.com`
 - What are the headers your service requires to respond to your API? You can get this in browser's request header.

Step 3: Edit `mock-api.config.js` file created after running `Step 2`

#mock-api.config.js

```
let config = {
  port: 3002,
  forward: {
    hostname: "https://www.practo.com", <-- Edit this field to your hostname 
    headers: { <-- Edit this object to put all your headers
      host: "www.practo.com",
      accept: "application/json",
      referer: "https://www.practo.com/",
      "accept-encoding": "gzip"
    }
  }
}
```

Step 4: Run npm script added in `step 2`
Step 5: Hit your API URL via `mock-api`

Example - 

URL template: `localhost:port/${your_api_endpoint}`

Lets say **API URL to GET data** is https://www.practo.com/client-api/v1/practicedoctors/149529/slots?with_relation=true&mobile=true&group_by_hour=true&logged_in_api=false

Formed URL: `localhost:3002/client-api/v1/practicedoctors/149529/slots?with_relation=true&mobile=true&group_by_hour=true&logged_in_api=false`


### Problem 2:
I want to make API requests to URL which is protected by authentication layer and will only respond when user is logged in.

### Answer 2:

Since API is protected and requires logged in user session, you will need to figure out all the headers your API needs to respond. In most of the cases it is just `cookie` set by the server. You can find this in your existing production application's request header on the host you want to make API call.

To solve this problem, follow all the steps mentioned above. In `Step 3` edit the `headers` and put everything your server requires to be sent in headers. `mock-api` will forward all the headers provided with every requests.

#mock-api.config.js
```
let config = {
  port: 3002,
  forward: {
    hostname: "https://www.practo.com", <-- Edit this field to your hostname 
    headers: { <-- Edit this object to put all your headers
      host: "www.practo.com",
      accept: "application/json",
      referer: "https://www.practo.com/",
      "accept-encoding": "gzip",
      cookie: "xxxxx" <--- This is required to make authenticated API call
    }
  }
}
```

### Problem 3:
My API service is always responding with correct data and status code but i want to handle error for API. 

### Answer 3:
You need to override API response header which is possible with `mock-api` using custom routes.

 - Get steps 1 to 5 done mentioned in answer 1. 
 - Edit config file(`mock-api.config.js`) to add custom routes


#mock-api.config.js

```
let config = {
  port: 3002,
  forward: {
    hostname: "https://www.practo.com", <-- Edit this field to your hostname 
    headers: { <-- Edit this object to put all your headers
      host: "www.practo.com",
      accept: "application/json",
      referer: "https://www.practo.com/",
      "accept-encoding": "gzip"
    }
  },
  routes: [{
    enable_forward: true, <-- This enables forwarding
    request: {
      path: "/client-api/v1/practicedoctors/149529/slots" <-- Request path for which you want to modify response
    },
    response: {
      status: "401", <-- Edit this if you want to change response status code
      headers: {  <-- Can be used to override response header.
        "custom_response_header": "custom_response_header_value"
      }
    }
  }]
}
```

