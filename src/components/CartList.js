import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { cartChanged, cartDelete } from '../actions/CartActions';
import { CardSection } from '../components/common';

class CartList extends Component {
	render() {
		if (this.props.items.length === 0) {
			return (
				<View style={{ alignItems: 'center', paddingTop: 230 }}>
					<Text style={{ fontSize: 20, color: 'red' }}>Your Cart is empty</Text>
				</View>
			);
		} else if (this.props.items !== []) {
			console.log(this.props.items);
			return (
				<FlatList
					data={this.props.items}
					renderItem={({ item }) => (
						<CardSection
							style={{ borderWidth: 1, borderBottomWidth: 1, height: 120 }}
						>
							<Image
								source={{ uri: item.imageurl }}
								style={{ height: 100, width: 90 }}
							/>
							<View
								style={{
									width: 150,
									paddingLeft: 17,
									justifyContent: 'space-around'
								}}
							>
								<Text style={{ fontSize: 15, fontWeight: 'bold' }}>
									{item.name}
								</Text>
							</View>
							<TouchableOpacity
								style={{
									flex: 1,
									backgroundColor: '#007aff',
									borderRadius: 5,
									borderWidth: 1,
									borderColor: '#007aff',
									marginLeft: 5,
									marginRight: 5,
									marginTop: 20,
									height: 40,
									alignItems: 'center'
								}}
								onPress={() => this.props.cartDelete(item)}
							>
								<Text
									style={{
										color: 'white',
										alignSelf: 'center',
										marginTop: 8
									}}
								>
									Remove
								</Text>
							</TouchableOpacity>
						</CardSection>
					)}
					keyExtractor={item => item._id}
				/>
			);
		}
	}
}

const mapStateToProps = state => ({
	items: state.cart.items
});

export default connect(mapStateToProps, { cartChanged, cartDelete })(CartList);
