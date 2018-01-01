import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = props => {
	const { inputStyle, lableStyle, containerStyle } = styles;
	return (
		<View style={containerStyle}>
			<Text style={lableStyle}>{props.label}</Text>
			<TextInput
				secureTextEntry={props.secureTextEntry}
				placeholder={props.placeholder}
				style={[inputStyle, props.style]}
				value={props.value}
				onChangeText={props.onChangeText}
			/>
		</View>
	);
};

const styles = {
	inputStyle: {
		color: 'black',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 20,
		lineHeight: 5,
		flex: 2,
		height: 45
	},
	lableStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1,
		color: 'black'
	},
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}
};
export { Input };
