import React, { Component } from 'react';
import {
	BackHandler,
	ImageBackground,
	Image,
	Text,
	StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { emailChanged, passwordChanged, loginSuccess } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
	state = {
		login: ''
	};
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			BackHandler.exitApp();
		});

		if (this.props.loggedin) {
			Actions.menu();
		}
	}

	login = () => {
		if (this.props.email !== '' && this.props.password !== '') {
			axios({
				method: 'POST',
				url: 'http://192.168.43.228:3090/login',
				data: {
					email: this.props.email.toLowerCase(),
					password: this.props.password
				}
			})
				.then(res => {
					console.log(res.data.success);
					if (res.data.success === 'true') {
						this.props.loginSuccess();
						Actions.menu();
					} else {
						this.refs.view.shake(1000);
						this.setState({ login: 'failed' });
					}
				})

				.catch(err => {
					console.log(err);
				});
		} else if (this.props.email === '' || this.props.password === '') {
			this.refs.view.jello(1000);
		}
	};

	render() {
		return (
			<ImageBackground
				source={require('../../icons/back1.jpg')}
				style={{
					height: null,
					alignSelf: 'stretch',
					width: null,
					justifyContent: 'center',
					flex: 1
				}}
			>
				<StatusBar
					hidden
					showHideTransition="fade"
					backgroundColor="#4256af"
					barStyle="light-content"
				/>
				<Image
					source={require('../../icons/logogg.png')}
					style={{
						height: 100,
						width: 100,
						alignSelf: 'center',
						marginTop: 50
					}}
				/>
				<Text
					style={{
						color: '#4256af',
						fontSize: 50,
						fontWeight: 'bold',
						alignSelf: 'center'
					}}
				>
					GoGrocery
				</Text>
				<Text
					style={{
						color: 'grey',
						paddingBottom: 0,
						alignSelf: 'center',
						fontSize: 15
					}}
				>
					Grocery in your pocket
				</Text>

				<Card style={{ flexGrow: 1 }}>
					<Animatable.View ref="view">
						<CardSection
							style={{
								borderBottomWidth: 1,
								borderColor: 'white',
								padding: 0,
								alignItems: 'baseline',
								marginLeft: 15,
								marginRight: 15
							}}
						>
							<Image
								source={require('../../icons/mail.png')}
								style={{
									height: 20,
									width: 20,
									tintColor: 'white',
									marginTop: 37,
									marginRight: 10
								}}
							/>

							<Input
								style={{ paddingBottom: 20 }}
								labelStyle={{ flex: 0, paddingLeft: 0 }}
								placeholder="Email"
								placeholderColor="white"
								value={this.props.email}
								onChangeText={text => {
									this.setState({ login: '' });
									this.props.emailChanged(text);
								}}
							/>
						</CardSection>
						<CardSection
							style={{
								borderColor: 'white',
								borderBottomWidth: 1,
								padding: 0,
								alignItems: 'baseline',
								marginLeft: 15,
								marginRight: 15
							}}
						>
							<Image
								source={require('../../icons/password.png')}
								style={{
									height: 22,
									width: 18,
									tintColor: 'white',
									marginTop: 32,
									marginRight: 10
								}}
							/>
							<Input
								style={{ paddingBottom: 17 }}
								labelStyle={{ flex: 0, paddingLeft: 0 }}
								secureTextEntry
								placeholder="Password"
								placeholderColor="white"
								value={this.props.password}
								onChangeText={text => {
									this.setState({ login: '' });
									this.props.passwordChanged(text);
								}}
							/>
						</CardSection>
					</Animatable.View>
					<CardSection style={{ paddingTop: 20 }}>
						<Button
							style={{
								backgroundColor: '#4256af',
								borderColor: '#4256af'
							}}
							onPress={() => this.login()}
						>
							Login
						</Button>
					</CardSection>
					<CardSection style={{ justifyContent: 'space-between' }}>
						<Button
							textStyle={{ fontSize: 15 }}
							style={{
								backgroundColor: 'transparent',
								borderColor: 'transparent'
							}}
						>
							Forgot Password?
						</Button>
						<Image
							source={require('../../icons/separator.png')}
							style={{
								tintColor: 'white',
								height: 30,
								width: 20
							}}
						/>
						<Button
							textStyle={{ fontSize: 15, marginRight: 50 }}
							style={{
								backgroundColor: 'transparent',
								borderColor: 'transparent'
							}}
							onPress={() => Actions.signup()}
						>
							Signup
						</Button>
					</CardSection>

					{(() => {
						if (this.state.login === 'failed') {
							return (
								<CardSection
									style={{
										borderColor: 'red',
										backgroundColor: '#fb4e5150',
										borderRadius: 30,
										height: 30,
										justifyContent: 'center'
									}}
								>
									<Text
										style={{ color: 'red', fontSize: 15, alignSelf: 'center' }}
									>
										Please enter valid email and password
									</Text>
								</CardSection>
							);
						}
					})()}
				</Card>
			</ImageBackground>
		);
	}
}

const mapStateToProps = state => ({
	email: state.auth.email,
	password: state.auth.password,
	loggedin: state.auth.loggedin
});

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginSuccess
})(LoginForm);
