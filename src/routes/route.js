import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const AppRoute = ({
	component: Component,
	isAuthProtected,
	...rest
}) => {
	const account = useSelector((state)=>state.account)
	console.log("account", account.account)
	return(
		<Route
			{...rest}
			
			render={props => {console.log("test", account.authorized, "props:", props.location)
				if (props.location=="/accont_check"){
					console.log("here")
					return (
						<div>
							<Component {...props} />
						</div>
					);
				}
				if (isAuthProtected && !account.authorized) {
					console.log("there")
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
