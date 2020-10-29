import * as actionTypes from './../actionTypes'

const initialState = {
	isLogged: false,
	userInfo: {
        "user_id": 1,
        "username": "admin",
        "user_email": "admin@devsfit.com",
        "isAdmin": 0,
        "isGym": 1,
        "isTrainee": null,
        "isSelf": null
    },
	jwtToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaXNHeW0iOjEsImlhdCI6MTU5ODI1NDk1OSwiZXhwIjoxNTk4MzQxMzU5fQ.FmpC4D3OKsoCqNmOEx7rOfBZ0V6axz26JYGopMdbUos"
};
const userReducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.SIGN_IN: 
            return Object.assign({}, state, {
                isLogged: true,
                userInfo: {
                    username: action.data.message
                },
                jwtToken: action.data.token

            });
        case actionTypes.SIGN_OUT: 
            localStorage.removeItem('channel-1')
            window.location = 'https://devsfit.com'
            return Object.assign({}, state, {
                isLogged: false,
                userInfo: {
                    
                },
                jwtToken: ''
            });
        default :
            return state;
    }
}


export default userReducer;