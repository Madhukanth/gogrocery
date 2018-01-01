import { CART_CHANGED, CART_DELETE } from './types';

export const cartChanged = item => ({
	type: CART_CHANGED,
	payload: item
});

export const cartDelete = item => ({
	type: CART_DELETE,
	payload: item
});
