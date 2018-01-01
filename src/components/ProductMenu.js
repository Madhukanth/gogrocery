import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import { Image } from 'react-native';
//import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import VegetablesFetch from './VegetablesFetch';
import GroceryFetch from './GroceryFetch';
import PersonalCareFetch from './PersonalCareFetch';
import StationeryFetch from './StationeryFetch';

class ProductMenu extends Component {
	state = {
		selectedTab: 'vegetables&fruits'
	};

	render() {
		return (
			<TabNavigator>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'vegetables&fruits'}
					title="Vegatables&Fruits"
					titleStyle={{ fontSize: 10, color: 'black' }}
					tabStyle={{}}
					renderIcon={() => (
						<Image
							style={{ height: 30, width: 30 }}
							source={require('../../icons/a.png')}
						/>
					)}
					// renderSelectedIcon={() => (
					// 	<Image source={{ uri: 'http://images.bazaar121.com/CI0002.jpg' }} />
					// )}
					//badgeText="1"
					onPress={() => this.setState({ selectedTab: 'vegetables&fruits' })}
				>
					<VegetablesFetch />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'grocery'}
					title="Grocery"
					titleStyle={{ fontSize: 10, color: 'black' }}
					renderIcon={() => (
						<Image
							style={{ height: 30, width: 30 }}
							source={require('../../icons/b.png')}
						/>
					)}
					//renderSelectedIcon={() => <Image source={...} />}
					//renderBadge={() => <CustomBadgeView />}
					onPress={() => this.setState({ selectedTab: 'grocery' })}
				>
					<GroceryFetch />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'personalCare'}
					title="Personal Care"
					titleStyle={{ fontSize: 10, color: 'black' }}
					renderIcon={() => (
						<Image
							style={{ height: 30, width: 30 }}
							source={require('../../icons/c.png')}
						/>
					)}
					//renderSelectedIcon={() => <Image source={...} />}
					//renderBadge={() => <CustomBadgeView />}
					onPress={() => this.setState({ selectedTab: 'personalCare' })}
				>
					<PersonalCareFetch />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'stationery'}
					title="Stationery"
					titleStyle={{ fontSize: 10, color: 'black' }}
					renderIcon={() => (
						<Image
							style={{ height: 27, width: 27 }}
							source={require('../../icons/d.png')}
						/>
					)}
					//renderSelectedIcon={() => <Image source={...} />}
					//renderBadge={() => <CustomBadgeView />}
					onPress={() => this.setState({ selectedTab: 'stationery' })}
				>
					<StationeryFetch />
				</TabNavigator.Item>
			</TabNavigator>
		);
	}
}

export default ProductMenu;
