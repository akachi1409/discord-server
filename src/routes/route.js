import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const AppRoute = ({
	component: Component,
	isAuthProtected,
	...rest
}) => {
	return(
		<Route
			{...rest}
			
			render={props => {
				switch(props.location.pathname){
					
					case "/dashboard/mine" : 
						localStorage.setItem("sidebar", "dashboard-mine");
						break;
					case "/dashboard/other" : 
						localStorage.setItem("sidebar", "dashboard-other");
						break;
					case "/account":
						console.log(";;;;;")
						localStorage.setItem("sidebar", "account");
						break;
				}
				if (props.location=="/accont_check"){
					return (
						<div>
							<Component {...props} />
						</div>
					);
				}
				if (isAuthProtected && !localStorage.getItem("authUser")) {
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}
				return (
					<div>
						<Component {...props} />
					</div>
				);
			}}
		/>
	);
		}

export default AppRoute;
