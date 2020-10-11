let config = {
  port: 3002,
  forward: {
    hostname: "https://www.practo.com/",  // hostname where request will be forwarded. This will be fallback for custom route.
    headers: {  // headers to be sent in all requests.
      host: "www.practo.com",
      accept: "application/json",
      referer: "https://www.practo.com/",
      "accept-encoding": "gzip"
    }
  },
  routes: [{
    enable_forward: true,
    request: {
      path: "/client-api/v1/practicedoctors/149529/slots"
    },
    response: {
      status: 401,
      headers: {  // Can be used to override response header.
        "custom_response_header": "custom_response_header_value"
      }
    }
  }, {
    enable_forward: false,
    request: {
      path: "/user/:id"
    },
    response: {
      response_data: {
        "id": 382277,
        "account_id": "173515",
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

module.exports = config;
