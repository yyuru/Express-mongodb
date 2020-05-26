define({ "api": [
  {
    "type": "POST",
    "url": "/api/users/create",
    "title": "",
    "description": "<p>Create new user</p>",
    "version": "1.0.0",
    "name": "CreateUser",
    "group": "users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Conflict 409": [
          {
            "group": "Conflict 409",
            "optional": false,
            "field": "Conflict",
            "description": "<p>UserName Exisit</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "users"
  }
] });
