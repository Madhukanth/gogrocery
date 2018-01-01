import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProductMenu from './components/ProductMenu';
import GroceryFetch from './components/GroceryFetch';
import PersonalCareFetch from './components/PersonalCareFetch';
import StationeryFetch from './components/StationeryFetch';
import VegetablesFetch from './components/VegetablesFetch';
import CartList from './components/CartList';

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

			<Scene
				key="menu"
				component={ProductMenu}
				title="Gogrocery"
				titleStyle={{ alignSelf: 'center', color: 'green' }}
				navigationBarStyle={{ height: 50 }}
				renderRightButton={() => (
					<TouchableOpacity
						style={{ paddingRight: 30, width: 50 }}
						onPress={() => Actions.cart()}
					>
						<Image
							style={{ height: 40, width: 40 }}
							source={require('../icons/cart2.png')}
						/>
					</TouchableOpacity>
				)}
				onRight={() => Actions.signup()}
				left={() => (
					<View style={{ paddingLeft: 10 }}>
						<Image
							style={{
								height: 40,
								width: 40
							}}
							source={require('../icons/logo.png')}
						/>
					</View>
				)}
			/>
			<Scene key="grocery" component={GroceryFetch} />
			<Scene key="vegetables" component={VegetablesFetch} />
			<Scene key="personalCare" component={PersonalCareFetch} />
			<Scene key="stationery" component={StationeryFetch} />
			<Scene
				key="cart"
				title="Cart List"
				titleStyle={{ alignSelf: 'center', paddingRight: 75 }}
				component={CartList}
			/>
		</Scene>
	</Router>
);

export default RouterComponent;
