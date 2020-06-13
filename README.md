# blog-microservices
This project is a simple blog application where you can create posts and add comments associated with said posts, for the purpose of experimenting with a microservice architecture.

As I build out and optimize this project I'll be updating the README to document the current state of the application and what I'm going to be focusing on improving.

# Update 8cba836170a6a4a17e502351064541f92dd926dd
Some backend changes have been made to optimize the network requests required to populate the UI's posts and comments. A separate query service has been created to store the combined posts and comments so that all data can be easily served to the front-end in a single HTTP request. A simple event bus express server was introduced to publish events to all of the application's associated microservices, so that each service can asynchronously handle their respective events. Finally, an additional comment moderating service was created to explore more complicated event-handling and how to deal with data updates on the query service.

# Update da353304b13a67180194ba5c659f8ea8d19a6988
Currently, the core functionality of the application is complete. Two separate Posts and Comments Node.js/Express services handle creation and querying of posts and comments on the back-end, while the React app client provides simple forms and rendering for displaying the content to the user.

However, the application is currently inefficient in the sense that the client makes an initial request to fetch all posts, and then for each individual post it has to make a separate network request to fetch that specific post's associated comments (as the axios request is implemented at the individual CommentList level in the component's useEffect hook, rather than higher up in the component hierarchy and passing down the overall list of comments as props). Currently the posts and comments services are decoupled (which is my priority with the microservice architecture) but the back-end requires further optimization regarding how data is served.
