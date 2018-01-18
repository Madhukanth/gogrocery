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
import PurchaseForm from './components/PurchaseForm';

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
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity
							style={{ paddingLeft: 1, width: 50, paddingTop: 6 }}
							onPress={() => {}}
						>
							<Image
								style={{
									height: 30,
									width: 30,
									tintColor: '#007aff'
								}}
								source={require('../icons/search1.png')}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ paddingLeft: 7, width: 50, paddingTop: 6 }}
							onPress={() => {
								Actions.cart();
							}}
						>
							<Image
								style={{ height: 35, width: 35, tintColor: '#007aff' }}
								source={require('../icons/cart.png')}
							/>
						</TouchableOpacity>
					</View>
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
			<Scene key="purchase" title="Purchase Form" component={PurchaseForm} />
		</Scene>
	</Router>
);

export default RouterComponent;
