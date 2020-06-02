const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {	
	raw_products = productsList.filter(productsList => ids.includes(productsList.id));

	products = raw_products.map(raw_product => ({name: raw_product.name, category: raw_product.category}));
	
	promotion = getPromotionFromProducts(raw_products)

	function getPrices() {
		let finalPrice = []
		let discounts = []
		raw_products.map(raw_product => {
			raw_product.promotions.filter(prom => {
					if (prom.looks.includes(promotion)) {
						finalPrice.push(prom.price);
						discounts.push(raw_product.regularPrice - prom.price)
					} else if (raw_product.promotions.length == 1 && !prom.looks.includes(promotion)) {
						finalPrice.push(raw_product.regularPrice);
					}
				})
			})
		
		totalPrice = finalPrice.reduce((total, num) => total + num)
		discountValue = discounts.reduce((total, num) => total + num)
		discount = (Math.round((discountValue/(discountValue+totalPrice))*10000)/100).toString()+"%"

		return {totalPrice: totalPrice.toFixed(2), discount, discountValue}
	}

	prices = getPrices()

	return {
		products,
		promotion,
		totalPrice: prices.totalPrice.toString(),
		discountValue: prices.discountValue.toFixed(2).toString(),
		discount: prices.discount
	}
}


function getPromotionFromProducts(products) {
	var categories = []
	products.filter(product => {
		if (!categories.includes(product.category))	{
			categories.push(product.category)
		}
		return;
	});

	function getPromotionType() {
		switch (categories.length) {
			case 1:
				promotion = 'SINGLE LOOK'
				break;
			case 2:
				promotion = 'DOUBLE LOOK'
				break;
			case 3:
				promotion = 'TRIPLE LOOK'
				break;
			default:
				promotion = 'FULL LOOK'
				break;
		}
		return promotion
	}

	return getPromotionType();
}

module.exports = { getShoppingCart };
