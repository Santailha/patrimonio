document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('addItemForm');
    const estoqueTableBody = document.querySelector('#estoqueTable tbody');
    const toggleOptionalFieldsBtn = document.getElementById('toggleOptionalFields');
    const optionalFields = document.getElementById('optionalFields');

    toggleOptionalFieldsBtn.addEventListener('click', function() {
        optionalFields.classList.toggle('active');
        if (optionalFields.classList.contains('active')) {
            this.textContent = 'Ocultar Detalhes';
        } else {
            this.textContent = 'Adicionar Detalhes';
        }
    });

    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const itemName = document.getElementById('itemName').value;
        const itemSerial = document.getElementById('itemSerial').value;
        const itemQuantity = document.getElementById('itemQuantity').value;
        const itemModel = document.getElementById('itemModel').value || 'N/A';
        const itemSector = document.getElementById('itemSector').value || 'N/A';

        const newRow = `
            <tr>
                <td>${itemName}</td>
                <td>${itemSerial}</td>
                <td>${itemQuantity}</td>
                <td>${itemModel}</td>
                <td>${itemSector}</td>
                <td><button class="btn-delete">Remover</button></td>
            </tr>
        `;

        estoqueTableBody.innerHTML += newRow;
        addItemForm.reset();
        
        // Oculta os campos opcionais após adicionar
        optionalFields.classList.remove('active');
        toggleOptionalFieldsBtn.textContent = 'Adicionar Detalhes';
    });

    estoqueTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-delete')) {
            e.target.closest('tr').remove();
        }
    });
});
