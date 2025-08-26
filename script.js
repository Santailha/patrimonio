// Configuração do Firebase (a mesma do login.js)
const firebaseConfig = {
    apiKey: "AIzaSyBGZ93MoIsFJ2vO-zgWhCOBbhfKiUQZ3WE",
    authDomain: "estoque-patrimonio.firebaseapp.com",
    projectId: "estoque-patrimonio",
    storageBucket: "estoque-patrimonio.appspot.com",
    messagingSenderId: "445286258280",
    appId: "1:445286258280:web:398f3df3dc9c12741e8ddd"
};

// Inicializa o Firebase e o Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('addItemForm');
    const estoqueTableBody = document.querySelector('#estoqueTable tbody');
    const toggleOptionalFieldsBtn = document.getElementById('toggleOptionalFields');
    const optionalFields = document.getElementById('optionalFields');

    // Verifica se o usuário está logado
    auth.onAuthStateChanged(user => {
        if (!user) {
            // Se não estiver logado, redireciona para a página de login
            window.location.href = 'login.html';
        } else {
            // Se estiver logado, carrega os itens do estoque
            loadItems();
        }
    });
    
    // Função para carregar itens do Firestore
    function loadItems() {
        db.collection("estoque").onSnapshot((querySnapshot) => {
            estoqueTableBody.innerHTML = ''; // Limpa a tabela antes de carregar
            querySnapshot.forEach((doc) => {
                const item = doc.data();
                const row = `
                    <tr data-id="${doc.id}">
                        <td>${item.name}</td>
                        <td>${item.serial}</td>
                        <td>${item.quantity}</td>
                        <td>${item.model}</td>
                        <td>${item.sector}</td>
                        <td><button class="btn-delete">Remover</button></td>
                    </tr>
                `;
                estoqueTableBody.innerHTML += row;
            });
        });
    }

    // Botão para mostrar/ocultar campos opcionais
    toggleOptionalFieldsBtn.addEventListener('click', function() {
        optionalFields.classList.toggle('active');
        this.textContent = optionalFields.classList.contains('active') ? 'Ocultar Detalhes' : 'Adicionar Detalhes';
    });

    // Adicionar novo item
    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newItem = {
            name: document.getElementById('itemName').value,
            serial: document.getElementById('itemSerial').value,
            quantity: document.getElementById('itemQuantity').value,
            model: document.getElementById('itemModel').value || 'N/A',
            sector: document.getElementById('itemSector').value || 'N/A',
        };

        // Salva o novo item no Firestore
        db.collection("estoque").add(newItem).then(() => {
            console.log("Documento adicionado com sucesso!");
            addItemForm.reset();
            optionalFields.classList.remove('active');
            toggleOptionalFieldsBtn.textContent = 'Adicionar Detalhes';
        }).catch((error) => {
            console.error("Erro ao adicionar documento: ", error);
        });
    });

    // Remover item
    estoqueTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-delete')) {
            const row = e.target.closest('tr');
            const docId = row.getAttribute('data-id');
            
            // Remove o item do Firestore
            db.collection("estoque").doc(docId).delete().then(() => {
                console.log("Documento removido com sucesso!");
            }).catch((error) => {
                console.error("Erro ao remover documento: ", error);
            });
        }
    });
});

// (Todo o código anterior do script.js permanece o mesmo)
// ...

document.addEventListener('DOMContentLoaded', function() {
    // ... (toda a lógica existente, como auth, loadItems, addItemForm, etc.)

    const logoutBtn = document.getElementById('logoutBtn');
    const searchInput = document.getElementById('searchInput');

    // --- LÓGICA DO BOTÃO DE SAIR ---
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            // Logout bem-sucedido, redireciona para a tela de login
            window.location.href = 'login.html';
        }).catch((error) => {
            console.error("Erro ao fazer logout: ", error);
        });
    });

    // --- LÓGICA DO FILTRO DE BUSCA ---
    searchInput.addEventListener('keyup', () => {
        const filterText = searchInput.value.toLowerCase();
        const tableRows = document.querySelectorAll('#estoqueTable tbody tr');

        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            if (rowText.includes(filterText)) {
                row.style.display = ''; // Mostra a linha se o texto corresponder
            } else {
                row.style.display = 'none'; // Oculta a linha se não corresponder
            }
        });
    });
    
    // ... (Restante do seu código, como o event listener para remover item)
});
