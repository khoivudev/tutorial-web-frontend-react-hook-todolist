### REACT HOOK BASIC TUTORIAL

- Call GET API to Get data from database and render item todolist
- Call DELETE API to Remove todolist item and delete item in database
- Call ADD API to add new item to todolist
- Call PATCH API to update completed state todo item

- Separate UI (components) and Logic (App.js)
  - Passing props (array, func) between App.js and Component
  - Passing aray (todos) from App.js(Logic) to UI(TodoList)
  - Passing function (onTodoClick) from UI(Todolist) to App.js(Logic)
- Tech
  - Package:
    - scss
    - axios

### DEVELOPMENT

1. Set proxy, must to be a string in package.json file

2. For example

```json
{
  "proxy": "https://backend.example.com"
}
```

3. Run project
   npm install && npm start || yarn install && yarn start

### DEPLOYMENT

```js
heroku create $APP_NAME --buildpack mars/create-react-app
```

Set Proxy to deloy Heroku:

1. When deploy on heroku, just push only package-lock.json or yarn.lock. Dont push both those files!
   npm install || yarn install

2. Create static.json file

```json
{
  "root": "build/",
  "clean_urls": false,
  "routes": {
    "/**": "index.html"
  },
  "https_only": true,
  "headers": {
    "/**": {
      "Strict-Transport-Security": "max-age=7776000"
    }
  },
  "proxies": {
    "/api/": {
      "origin": "${API_URL}"
    }
  }
}
```

3. Push file to heroku
   git push heroku master

4. Config proxy heroku
   All request from react contain "/api/abc" -> "/abc" <br/>
   For example:<br/>
   From react: axios.get("/api/search-items") → ${API_URL}/search-items <br/> 
From react:     axios.get("/api/users/me")   → ${API_URL}/users/me<br/>
   (!)Therefore, run this cmd to set proxy var in heroku: <br/>

```js
heroku config:set API_URL="https://backend.example.com/api"
```
