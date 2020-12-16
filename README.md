# DatingYou - [Live app](https://dating-you.netlify.app/)
A dating application built on top of Angular, NGRX, Bootstrap and RxJS.

Backend is built with .Net Core 3.1 . Check out here: [DatingYou Backend](https://github.com/eneajaho/dating-api).

## How to run
- Clone the repository
- Install dependencies
- Run application

```bash
git clone https://github.com/eneajaho/dating-client.git
npm install
ng serve -o
```


## What's included
- NGRX Store (eager & lazy loaded store modules)
- Authentication & Authorization
- CRUD & Pagination (server side)
- Multiple layouts architecture 
- Light & Dark Mode
- Image uploading


### Main folder structure
    .
    ├── core                      # Core Module manages global services, interceptors and other configs.
    │   ├── configs
    │   ├── guards
    │   ├── interceptors
    │   ├── models
    │   ├── services
    │   └── core.module.ts
    ├── layout                    # Layout Module manages navigation components, layouts and theme service.
    │   ├── components
    │   ├── containers
    │   ├── services
    │   └── layout.module.ts
    ├── pages                     # Pages is where lazy loaded and eager modules live
    │   ├── auth
    │   ├── settings
    │   └── members
    ├── shared                    # Shared folder includes shared utilities in the app. 
    │   ├── components
    │   ├── directives
    │   ├── pipes
    │   └── validators
    ├── store                     # Manages and initializes the Root Store Module (NGRX Store)
    │   ├── effects
    │   ├── reducers
    │   └── root-store.module.ts
    ├── app.component.ts
    ├── app.module.ts  
    └── app-routing.module.ts
    
### Feature modules folder structure (auth, members, settings etc.)
     
    module                    
    ├── containers
    ├── components
    ├── services
    ├── guards
    ├── store
    └── module.ts

### Login in live app
```
- Username: lola | dorothy | duke
- Password: password
```


### Todo
- Likes functionality
- Private messages (using SignalR) functionality
- Add animations - 35%
- SSR (Angular Universal)
- Testing 
- ~~Filter functionality~~
- ~~Stricter type checking~~
- ~~Upgrade to Angular 11~~

#### License: MIT

#### Author: [Enea Jahollari](https://github.com/eneajaho)
