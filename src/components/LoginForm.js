import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginSuccess } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			BackHandler.exitApp();
		});

		if (this.props.loggedin === true) {
			Actions.menu();
		}
	}

	login = () => {
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
				}
			})

			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="mail@email.com"
						value={this.props.email}
						onChangeText={text => this.props.emailChanged(text)}
					/>
				</CardSection>
				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="password"
						value={this.props.password}
						onChangeText={text => this.props.passwordChanged(text)}
					/>
				</CardSection>
				<CardSection>
					<Button onPress={() => this.login()}>Login</Button>
				</CardSection>
			</Card>
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
