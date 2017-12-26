import React, { Component } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Card, CardSection, Button, Input } from './common';
import {
	nameChanged,
	emailChanged,
	passwordChanged,
	addressChanged,
	phonenumberChanged,
	signupSuccess
} from '../actions';

class SignupForm extends Component {
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			Actions.login();
			return true;
		});
	}

	signup = () => {
		axios({
			method: 'POST',
			url: 'http://192.168.43.228:3090/signup',
			data: {
				email: this.props.email,
				password: this.props.password,
				name: this.props.name,
				address: this.props.address,
				phonenumber: this.props.phonenumber
			}
		})
			.then(res => {
				console.log(res.data.success);
				if (res.data.success === 'true') {
					this.props.signupSuccess();
					Actions.menu();
				}
			})

			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<ScrollView>
				<Card>
					<CardSection>
						<Input
							label="Name"
							placeholder="Stephen"
							value={this.props.name}
							onChangeText={text => this.props.nameChanged(text)}
						/>
					</CardSection>
					<CardSection>
						<Input
							label="email"
							placeholder="mail@email.com"
							value={this.props.email}
							onChangeText={text => this.props.emailChanged(text)}
						/>
					</CardSection>
					<CardSection>
						<Input
							label="password"
							placeholder="password"
							value={this.props.password}
							onChangeText={text => this.props.passwordChanged(text)}
						/>
					</CardSection>
					<CardSection>
						<Input
							label="Address"
							placeholder="Door No,Street,City,State"
							value={this.props.address}
							onChangeText={text => this.props.addressChanged(text)}
						/>
					</CardSection>
					<CardSection>
						<Input label="Country" value="India" />
					</CardSection>
					<CardSection>
						<Input
							label="Phone number"
							placeholder="+91"
							value={this.props.phonenumber}
							onChangeText={text => this.props.phonenumberChanged(text)}
						/>
					</CardSection>
					<CardSection>
						<Button onPress={() => Actions.login()}>Back</Button>
						<Button onPress={() => this.signup()}>Next</Button>
					</CardSection>
				</Card>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	name: state.auth.name,
	email: state.auth.email,
	password: state.auth.password,
	address: state.auth.address,
	phonenumber: state.auth.phonenumber
});

export default connect(mapStateToProps, {
	nameChanged,
	emailChanged,
	passwordChanged,
	addressChanged,
	phonenumberChanged,
	signupSuccess
})(SignupForm);
