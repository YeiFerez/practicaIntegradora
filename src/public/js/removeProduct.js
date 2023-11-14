const removeProductButtons = document.querySelectorAll('.custom-remove-product-button');

removeProductButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const cart = window.location.pathname.split('/').pop(); // Obtener el último segmento de la URL
        const product = button.getAttribute('data-product');
        console.log('Cart ID:', cart);
        console.log('Product ID:', product);

        fetch(`/api/carts/${cart}/product/${product}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.status !== 200) return;
                alert('Product removed');
                location.reload();
            })
            .catch(err => console.error(`Error: ${err}`));
    });
});
