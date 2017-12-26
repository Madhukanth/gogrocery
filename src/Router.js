import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProductMenu from './components/ProductMenu';

const RouterComponent = () => (
	<Router>
		<Scene key="auth">
			<Scene
				key="login"
				component={LoginForm}
				title="Login/Signin"
				rightTitle="Signup"
				onRight={() => Actions.signup()}
			/>
			<Scene
				key="signup"
				component={SignupForm}
				titleStyle={{ alignItems: 'center' }}
				title="Signup"
			/>
			<Scene key="menu" component={ProductMenu} title="Menu" />
		</Scene>
	</Router>
);

export default RouterComponent;
