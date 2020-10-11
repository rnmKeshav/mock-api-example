
## Mock-api example to forward custom request

### Problem 1:
I have an application which requires API to be called at different service layers. How can i easily forward/proxy my request to different service layers. 

### Answer 1:

Use `mock-api` custom routes. Update `forward.hostname` to the hostname your application hits maximum then add individual routes.

 - Get steps 1 to 5 done mentioned in answer 1. 
 - Edit config file(`mock-api.config.js`) to add custom routes and add `routes` property to config


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
      path: "/search/users", <-- Request path for which you want to modify response
      method: "GET",
      headers: {  // This will override config.forward.headers
        Host: "api.github.com"
      },
      hostname:"https://api.github.com/",
    }
  }]
}
```


### Problem 5:
I have API urls and response data. Need to create quick back-end for prototyping and mocking.

### Answer 5:

Edit your config(`mock-api.config.js`) file to make custom request for each urls and set `enable_forward` to false.

#mock-api.config.js

```
let config = {
  port: 3002,
  routes: [{
    enable_forward: false, <-- This enables forwarding
    request: {
      path: "/user/:id" <-- Request path for which you want to modify response
    },
    response: {
      response_data: {
        "id": 382877,
        "account_id": "173815",
        "email": "keshav.kumar@practo.com",
        "first_name": "Keshav Kumar",
        "phone_number": "+919782929930",
        "city": "Bangalore",
        "country": "IN",
        "agent": false
      },
      beforeResponse: function ({params}) {
        this.response_data.id = params.id
      }
    }
  }]
}
```
