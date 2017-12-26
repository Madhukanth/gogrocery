import React, { Component } from 'react';
import axios from 'axios';
import { Image, ScrollView, Text } from 'react-native';
import { Card, CardSection, Spinner } from './common';

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
				<ScrollView>
					<Card>
						{this.state.url.map((img, i) => (
							<CardSection
								key={i + 0.006}
								style={{ height: 120, borderWidth: 2 }}
							>
								<Image
									key={i + 0.5}
									style={{ height: 100, width: 70 }}
									source={{ uri: img }}
								/>
								<Text key={i}>{this.state.name[i]}</Text>
							</CardSection>
						))}
					</Card>
				</ScrollView>
			);
		}
	}
}

export default VegetablesFetch;
