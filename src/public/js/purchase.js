const purchaseButton = document.getElementById('purchaseButton');

purchaseButton.addEventListener('click', async () => {
	const cartId = purchaseButton.getAttribute('cart');

	try {
		const response = await fetch(`/api/carts/${cartId}/purchase`, {
			method: 'POST',
		});

		if (response.status === 200) {
			alert('Purchase successful!');
			// Puedes redirigir al usuario a otra página o realizar otras acciones después de la compra.
		} else {
			alert('Error during purchase');
		}
	} catch (error) {
		console.error('Error during purchase:', error);
		alert('Error during purchase. Please try again.');
	}
});
