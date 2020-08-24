# DatingYou
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
    ├── core                      # Core Module manages global services, interceptors, guards and other configs
    │   ├── configs
    │   ├── guards
    │   ├── interceptors
    │   ├── models
    │   ├── services
    │   └── core.module.ts
    ├── layout                    # Layout Module manages navigation components, layouts and theme service, 
    │   ├── components
    │   ├── containers
    │   ├── services
    │   └── layout.module.ts
    ├── pages                     # Pages is where lazy loaded and eager modules live
    │   ├── auth
    │   ├── settings
    │   └── members
    ├── shared                    # Shared Module includes the most used components in the app. Gets imported in all the modules.
    │   ├── components
    │   ├── directives
    │   ├── pipes
    │   ├── validators
    │   └── shared.module.ts
    ├── store                     # Manages and initializes the Root Store Module (NGRX Store)
    │   ├── effects
    │   ├── reducers
    │   └── root-store.module.ts
    ├── app.component.ts
    ├── app.module.ts  
    └── app-routing.module.ts
    
### Modules folder structure
     
    module                    
    ├── containers
    ├── components
    ├── services
    ├── guards
    ├── store
    └── module.ts


### Todo
- Filter functionality
- Upgrade to Angular 10


#### License: MIT

#### Author: [Enea Jahollari](https://github.com/eneajaho)
