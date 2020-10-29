import React ,{useState} from 'react';


function Activities() {
    const demoRecentActivities = [
        {
            image: "../../material/logo/logo.png",
            time: 16,
            entity: "X Fitness Jym",
            activity: "Added  new stuff in the system"
        },
        {
            image: "../../material/logo/logo.png",
            time: 16,
            entity: "X Fitness Jym",
            activity: "Added  new stuff in the system"
        },
        {
            image: "../../material/logo/logo.png",
            time: 16,
            entity: "X Fitness Jym",
            activity: "Added  new stuff in the system"
        },
        {
            image: "../../material/logo/logo.png",
            time: 16,
            entity: "X Fitness Jym",
            activity: "Added  new stuff in the system"
        }
    ];

    const demoUpcomingActivities = [
        {
            name: "lorem minus aliquam",
            amount: 360
        },
        {
            name: "lorem minus aliquam",
            amount: 360
        },
        {
            name: "lorem minus aliquam",
            amount: 360
        },
        {
            name: "lorem minus aliquam",
            amount: 360
        },
        {
            name: "lorem minus aliquam",
            amount: 360
        }
    ];
    const [recentActivities, setRecentActivities] = useState(demoRecentActivities);
    const [upcomingActivities, setUpcomingActivities] = useState(demoUpcomingActivities);
    
    const ViewRecentActivities = recentActivities.map((activity, index) => {
        //console.log(activity.image)
        return (
            <div className="container" key={index}
            style={index== recentActivities.length - 1 ? {borderBottom: 'none'} : {}}
            >
                <img src="/static/js/material/logo/logo.png" className="activity_image" alt="" srcset=""/>
                <p className="time">{activity.time} Min ago</p>
                <p className="entity">{activity.entity}</p>
                <p className="activity">{activity.activity}</p>
            </div>
        )
    })

    const ViewUpcomingActivities = upcomingActivities.map((activity, index) => {
        //console.log(upcomingActivities.length)
        return (
            <div className="container2" key={index}
            style={ index==upcomingActivities.length-1 ? {borderBottom:'none'} : {}}
            >
                    <p className="activity_name">{activity.name} </p>
                <p className="activity_ammount">{activity.ammount}</p>
                </div>
        )
    })

    return (
        <div className="activities">
                    <div className="recent_activities">
                        <p className="header">Recent</p>
                        <div className="body" id="recent_activity">
                            {ViewRecentActivities}
                           
                        </div>
                        <p className="footer" onclick="recent_activities()" id="recent_activity_toggler">Show</p>
                        
                    </div>
                    <div className="upcomming_activities">
                        <p className="header">Upcomming</p>
                        <div className="body" id="upcomming">
                            {ViewUpcomingActivities}
                        </div>
                    <p className="footer" onclick="upcomming_activities()" id="upcomming_activity_toggler">Show</p>
                </div>
        </div>
                
    )
}

export default Activities;