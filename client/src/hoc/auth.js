import React, { useEffect } from 'react';
import { auth } from '../_actions/user_action';
import { useDispatch } from "react-redux";


// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        // let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
                console.log(response);
                // 분기처리

                //* 로그인하지 않은상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                    //* 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else {
                        if(option === false) {
                            props.history.push('/');
                        }
                    }
                }
            })

        }, []) 

        return (
            <SpecificComponent />
        )
    } 
    return AuthenticationCheck
}
