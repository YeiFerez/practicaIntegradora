
document.addEventListener('click', async (event) => {
    if (event.target && event.target.classList.contains('delete-user')) {
        const userId = event.target.getAttribute('data-user-id');
        if (userId) {
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    method: 'DELETE',
                });

                if (response.status === 200) {
                    alert('Usuario eliminado con éxito');
                } else {
                    // Manejar posibles errores
                    alert('Error al eliminar el usuario');
                }
            } catch (error) {
                console.error(error);
                alert('Error al eliminar el usuario');
            }
        }
    }
});
