import React from "react" 
import CreatePost from "./profile_page/create_post"
import NewsFeed from "./newsfeed/news_feed"
function abc() {
    return (
        <div className="home-page-containers">
       <NewsFeed/> 
      <CreatePost/>
     
      <div className="request-tab">
        <div className="birthday-friend-column">
        <div className="axx" ><img className="calendar" src="https://magazine.rehearseapp.net/wp-content/uploads/2019/08/Calendar.png"/>1 friend request</div>
        <div className="ayy"><img className="present" src="https://cdn11.bigcommerce.com/s-hii7479o/images/stencil/original/products/9552/25692/present_2__06101.1523656413.png?c=2" />Morty's Birthday and 2 others</div>
        </div>
        <div className="sponsored-ads">
          <div className="sponsor-text"> Sponsored </div>
          <img className="picklecostume" src={window.pickle}/>
          <div className="adstuff">
          <div>Hot Topic</div>
         <div>HOT-TOPIC.COM</div>
         <div>Be the best pickle you can be today with this award winning Halloween Costume! Save up to 30% with the code APPACADEMY</div>
         </div>
         <div className="ad-2-ads">
          <div className="ad-2-text"> Sponsored </div>
          <img className="picklecostume" src="https://www.growthmarketingpro.com/wp-content/uploads/2018/06/app-academy.png"/>
          <div className="adstuff">
          <div>App Academy</div>
         <div>APP-ACADEMY.IO</div>
         <div> Change Careers and make over $100,000! Join (this or that) awesome program! Dont thunk about it take action and apply!(e) </div>
         </div>
        </div>
        </div>
        
      </div>
      
      </div>
    )
}

export default abc; 

