import { CART_CHANGED, CART_DELETE } from '../actions/types';

let index;
const INITIAL_STATE = {
	items: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CART_CHANGED:
			return { ...state, items: [...state.items, action.payload] };
		case CART_DELETE:
			index = state.items.indexOf(action.payload);
			state.items.splice(index, 1);
			return { ...state, items: [...state.items] };
		default:
			return state;
	}
};
