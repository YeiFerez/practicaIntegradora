
document.addEventListener('DOMContentLoaded', () => {
    const clearCartForm = document.querySelector('.custom-cart-clear-form');

    if (clearCartForm) {
        clearCartForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const cartId = clearCartForm.getAttribute('cart');
            const requestOptions = {
                method: 'DELETE',
            };

            try {
                const response = await fetch(`/api/carts/${cartId}`, requestOptions);

                if (response.ok) {
                    console.log('Cart cleared successfully.');
                    location.reload();
                } else {
                    console.error('Failed to clear cart.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
