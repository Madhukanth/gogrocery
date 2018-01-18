import React, { Component } from 'react';
import axios from 'axios';
import {
	TouchableOpacity,
	Image,
	Text,
	FlatList,
	Dimensions,
	Alert,
	StyleSheet
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux';
import { cartChanged } from '../actions/CartActions';
import { Card, Input, CardSection, Spinner } from './common';

const { height, width } = Dimensions.get('window');
let filteredItems = [];
class StationeryFetch extends Component {
	state = {
		loading: true,
		arr: [],
		arr1: [],
		name: [],
		url: [],
		searchTerm: ''
	};

	async componentWillMount() {
		axios({
			method: 'GET',
			url: 'http://192.168.43.228:3090/stationery'
		})
			.then(res => {
				this.setState({ arr: res.data });
				this.state.arr.map(item => {
					this.setState({ name: [...this.state.name, item.name] });
					this.setState({ url: [...this.state.url, item.imageurl] });
					this.setState({ arr1: [...this.state.arr] });
					return this.state.arr;
				});
			})
			.then(() => this.setState({ loading: false }));
	}
	searchUpdated = term => {
		this.setState({ searchTerm: term });
	};

	render() {
		if (this.state.loading) {
			return <Spinner size="large" />;
		} else if (!this.state.loading) {
			if (this.state.searchTerm !== '') {
				filteredItems = this.state.arr1.filter(
					createFilter(this.state.searchTerm, ['name'])
				);
			} else if (this.state.searchTerm === '') {
				filteredItems = this.state.arr;
			}
			return (
				<Card>
					<SearchInput
						onChangeText={term => {
							this.searchUpdated(term);
						}}
						style={styles.searchInput}
						placeholder="Search"
						fuzzy
						sortResults
					/>
					<FlatList
						data={filteredItems}
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
										borderColor: 'black',
										borderWidth: 1,
										borderRadius: 5
									}}
									source={{ uri: item.imageurl }}
								/>
								<CardSection style={{ height: 40, padding: 0, paddingLeft: 5 }}>
									<Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
								</CardSection>
								<CardSection style={{ height: 40, padding: 0, paddingTop: 10 }}>
									<Input
										style={{ backgroundColor: 'white' }}
										label="Qty"
										value=""
									/>
								</CardSection>
								<CardSection style={{ height: 40, padding: 0, paddingTop: 10 }}>
									<Text style={{ paddingLeft: 23, fontWeight: 'bold' }}>
										Price:
									</Text>
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
				</Card>
			);
		}
	}
}

const styles = StyleSheet.create({
	searchInput: {
		padding: 10,
		borderColor: '#ccc',
		borderWidth: 1
	}
});

const mapStateToProps = state => ({
	items: state.cart.items
});
export default connect(mapStateToProps, { cartChanged })(StationeryFetch);
