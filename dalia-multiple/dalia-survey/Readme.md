## Notes
- Thanks for the interesting challenge. It was more fun to go back to understand the requirement, k now about the product and built it. 
- Requesting to read the notes mentioned below before starting the application or having a code lookup
- Please note that my .git folder got corrupted due to a webpack plugin, and I had to redo couple of things. Due to this my comments to each commit are not intact. 

### Application Setup

#### To Start App
- yarn install
- yarn start 
- open: http://localhost:9000/

#### To Deploy App
    Deploys to Zeit for now :)
- yarn deploy

#### To built prod build
- yarn build

### Checklist
- [x] The user sees all the available surveys
- [x] The user clicks on one survey
- [x] The user can complete the questions of the clicked survey
- [x] The answers are sent to the backend
- [x] A message is shown to the User: "Thanks for answering the survey!"
- [x] The User can go back to point 1.
- [x] Everything has to work in the browser without any backend support
- [x] You can use any frontend library you like, no limitation on quantity and size.
- [x] The solution has to work in Chrome's last version, don't worry about the others.
- [x] The interface should render properly on a big desktop screen and/or on the small screens of mobile devices.
- [x] Employed initial test cases.

### Important Notes
- Why only build with JS + HTML/CSS + Webpack  
- Work flow of creation of elements
- About Components and Containers
- About my Local store
- Performance
- Deployment
- What I could have done more


#### Why only JS/CSS/HTML + Webpack and why no other framework?
- I believe application is used mostly in mobile apps and served to million users. Using a framework will bring unnecessary overhead and will create performance issues to reach users at low 3g speed. 
- for prod mode, I have used power of pre-fetch and pre-load respective containers. 
- Containers such as surveyQna and surveySuccess which is not required at the initial load are pre-fetched upon request and surveyOptions are preloaded 
- Minifiaction is skipped for development


#### Work flow of creation of elements.
- At the initial stage, API for loading options are called and preloading surveyOption container
- Once upon selection of any survey option, I am pre-fetching surveyQna and its API
- Upon retrieved of the data, only the initial data is constructed at the DOM and rest will generated upon request
- The above is done to reduce memory usage
- Upon navigating for next question the prevs question is hidden in the DOM. 
- The hidden DOM will be retrieved once its requested by clicking on prevs button. 


#### About Components and Containers and file structure
- I have split the application under container and components. Basically input field (radio) which is used here is considered as just presentational layer. Rest which deals with logic are mentioned under container.
- Seperation of services, store and utils are also employed


#### About my Local store
  - Using singleton instance with deepmerge capility. 
  - Also halts mutation to the store directly
  - This could have done better with Pub-Sub or introducing redux directly

#### Deployment
- I am using Zeit to host the entire application
- It can also produce prod build too

#### Performance
  - Development mode, perf is avoided
  - Prod mode, minification, pre-fetch and pre-load are introduced  
  - Injecting critical CSS in the application head to increase TTI
  - I could have introduced treeshaking mechanism to shred down unwanted codes 
  - Splitting of media queries and loading them only during access from mobile devices


### What I could have done more
- I could have done more to improve the application
- Such as introducing TypeScript,
- More test cases to cover and code coverage 
- better UI with more functionalities such and resetting the form while on the question
