document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('addItemForm');
    const estoqueTableBody = document.querySelector('#estoqueTable tbody');

    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const itemName = document.getElementById('itemName').value;
        const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);
        const totalValue = itemQuantity * itemPrice;

        const newRow = `
            <tr>
                <td>${itemName}</td>
                <td>${itemQuantity}</td>
                <td>R$ ${itemPrice.toFixed(2)}</td>
                <td>R$ ${totalValue.toFixed(2)}</td>
                <td><button class="btn-delete">Remover</button></td>
            </tr>
        `;

        estoqueTableBody.innerHTML += newRow;
        addItemForm.reset();
    });

    estoqueTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-delete')) {
            e.target.closest('tr').remove();
        }
    });
});
