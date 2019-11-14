# Butterflyr 
    Butterflyr is a full stack application cloning the popular social media website Facebook.
    Link to live website  link](https://www.google.com)
 ![alt-text](https://i.imgur.com/gtGiHpb.png)

## Technologies
-Ruby On Rails 
-Postgres
-HTML / CSS
-Javascript
-React
-Redux
-Amazon Web Services S3
-Heroku
-jQuery/Json/Jbuilder 
-Webpack

## Features 

Butterflyr replicates the main features of Facebook including friending, posting, commenting, and liking posts/comments. 

One of the interesting implementations for facebook is a signup page that has a form authentication to ensure 
the inputs are not null and are of valid format. 

![alt-text](https://i.imgur.com/dYLVWxI.png)

The challenge was to ensure the error would persist even after losing focus. A conditional was put in place to
check the status of the inputs even after the user is not on focus with the input in context. 

```javascript
return e => {  
      if (e.type === "focus" && e.target.value.length < 1) {
        const newInput = merge({}, this.state.inputs, { [field]: { [e.type]: "focus-invalid", ["blur"]:"" }})   
        this.setState({inputs: newInput})
    } else if (e.type === "blur" && e.target.value.length < 1) {
        const newInput = merge({}, this.state.inputs, { [field]: { [e.type]: "not-focus-invalid", ["focus"]: "" }, }, )
        // newInput.inputs[field]['focus'] = "" 
        this.setState({inputs: newInput})
    } else if (e.target.value.length > 1) {
        const newInput = merge({}, this.state.inputs, { [field]: { [e.type]: "" }})
        this.setState({inputs: newInput})
      
    }}
  }
``` 
## User Show Page 
The user's show page consists of a multitude of different components. The most prominent feature is the ability for the user to create a post along with an image as an optional attachment. The message would then be re-rendered onto the user's show page where there is a directory of all their previously made posts. 

![alt-text](https://i.imgur.com/13JxbR4.png) 

The user show page also a hosts a myriad of customizable components. The user can update general information such as their contact, school, work etc. As well as update their profile and cover photo. 

![alt-text](https://i.imgur.com/WtP2srV.png)

## The users newsfeed 

Newsfeed hosts a collection of posts made by both the user and along with the user's friend sorted by the timestamp. Currently this has not yet been implemented but will be coming in version 0.2

![alt-text](https://i.imgur.com/dDH4Sqw.png)

## Future Features 
-Friendships (in progress)
This implementation is roughly 70% finished. The user can currently add a friend and the data will persist to the back end. Additional conditions to render the "Add Friend" on a users page will need to be implemented to ensure the user cannot add the user while the request is pending and/or the user cannot add themselves as friends. The backend portion works via a polymorphic association between two users and as well as a status of the request. 

![alt-text](https://i.imgur.com/tUAoWvU.png) 

-Comments can be reply to comments. 
-Likes (with emojis)
-Messenger
-SearchBar for searching other users as well as friends 
