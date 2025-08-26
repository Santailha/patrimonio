// Configuração do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBGZ93MoIsFJ2vO-zgWhCOBbhfKiUQZ3WE",
    authDomain: "estoque-patrimonio.firebaseapp.com",
    projectId: "estoque-patrimonio",
    storageBucket: "estoque-patrimonio.appspot.com",
    messagingSenderId: "445286258280",
    appId: "1:445286258280:web:398f3df3dc9c12741e8ddd"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido, redireciona para a página de estoque
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Exibe uma mensagem de erro
            errorMessage.textContent = 'Email ou senha inválidos. Tente novamente.';
            console.error("Erro de autenticação:", error);
        });
});
