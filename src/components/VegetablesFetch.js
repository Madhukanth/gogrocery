import React, { Component } from 'react';
import axios from 'axios';
import {
	TouchableOpacity,
	Image,
	Text,
	FlatList,
	Dimensions,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Input, CardSection, Spinner } from './common';
import { cartChanged } from '../actions/CartActions';

const { height, width } = Dimensions.get('window');
class VegetablesFetch extends Component {
	state = {
		loading: true,
		arr: [],
		name: [],
		url: []
	};

	async componentWillMount() {
		axios({
			method: 'GET',
			url: 'http://192.168.43.228:3090/vegetables'
		})
			.then(res => {
				this.setState({ arr: res.data });
				this.state.arr.map(item => {
					this.setState({ name: [...this.state.name, item.name] });
					this.setState({ url: [...this.state.url, item.imageurl] });
					return this.state.arr;
				});
			})
			.then(() => this.setState({ loading: false }));
	}

	render() {
		if (this.state.loading) {
			return <Spinner size="large" />;
		} else if (!this.state.loading) {
			return (
				<FlatList
					data={this.state.arr}
					renderItem={({ item }) => (
						<CardSection
							style={{
								flexDirection: 'column',
								width: width / 2,
								borderWidth: 1,
								height: 320,
								borderBottomWidth: 1,
								flex: 1
							}}
						>
							<Image
								style={{
									height: 150,
									width: 150,
									alignSelf: 'center',
									borderColor: 'black'
								}}
								source={{ uri: item.imageurl }}
							/>
							<CardSection style={{ height: 40, padding: 0, paddingLeft: 5 }}>
								<Text>{item.name}</Text>
							</CardSection>
							<CardSection style={{ height: 40, padding: 0, paddingTop: 10 }}>
								<Input
									style={{ backgroundColor: 'white' }}
									label="Qty"
									value=""
								/>
							</CardSection>
							<CardSection style={{ height: 40, padding: 0, paddingTop: 10 }}>
								<Text style={{ paddingLeft: 20 }}>Price:</Text>
							</CardSection>
							<CardSection style={{ height: 40, padding: 0 }}>
								<TouchableOpacity
									style={{
										flex: 1,
										alignSelf: 'stretch',
										backgroundColor: '#007aff',
										borderRadius: 5,
										borderWidth: 1,
										borderColor: '#007aff',
										marginLeft: 5,
										marginRight: 5,
										height: 30,
										alignItems: 'center'
									}}
									onPress={() => {
										if (this.props.items.indexOf(item) !== -1) {
											return Alert.alert(
												'Item Exist',
												'Item already exist in the cart list',
												[
													{
														text: 'OK',
														onPress: () => console.log('OK Pressed')
													}
												]
											);
										} else if (this.props.items.indexOf(item) === -1) {
											this.props.cartChanged(item);
											return Alert.alert(
												'Item Added',
												'Item added to the cart list',
												[
													{
														text: 'OK',
														onPress: () => console.log('OK Pressed')
													}
												]
											);
										}
									}}
								>
									<Text style={{ color: 'white', paddingTop: 2 }}>
										Add to cart
									</Text>
								</TouchableOpacity>
							</CardSection>
						</CardSection>
					)}
					keyExtractor={item => item._id}
					numColumns={2}
				/>
			);
		}
	}
}

const mapStateToProps = state => ({
	items: state.cart.items
});
export default connect(mapStateToProps, { cartChanged })(VegetablesFetch);
