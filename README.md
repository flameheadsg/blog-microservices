# blog-microservices
This project is a simple blog application where you can create posts and add comments associated with said posts, for the purpose of experimenting with a microservice architecture.

As I build out and optimize this project I'll be updating the README to document the current state of the application and what I'm going to be focusing on improving.

# Update da353304b13a67180194ba5c659f8ea8d19a6988
Currently, the core functionality of the application is complete. Two separate Posts and Comments Node.js/Express services handle creation and querying of posts and comments on the back-end, while the React app client provides simple forms and rendering for displaying the content to the user.

However, the application is currently inefficient in the sense that the client makes an initial request to fetch all posts, and then for each individual post it has to make a separate network request to fetch that specific post's associated comments (as the axios request is implemented at the individual CommentList level in the component's useEffect hook, rather than higher up in the component hierarchy and passing down the overall list of comments as props). Currently the posts and comments services are decoupled (which is my priority with the microservice architecture) but the back-end requires further optimization regarding how data is served.
