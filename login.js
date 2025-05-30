document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Verificar se já existem usuários cadastrados
    const checkAndCreateDefaultUsers = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Se não existirem usuários, criar alguns padrão
        if (users.length === 0) {
            const defaultUsers = [
                { username: 'usuario1', password: 'senha123' },
                { username: 'admin', password: 'adminpass' },
                { username: 'teste', password: 'teste123' }
            ];
            
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    };

    // Inicializar usuários padrão se necessário
    checkAndCreateDefaultUsers();

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            errorMessage.textContent = '';
            errorMessage.className = '';

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                errorMessage.textContent = 'Por favor, preencha o usuário e a senha.';
                errorMessage.className = 'error-message';
                return;
            }

            try {
                // Busca usuários no localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];

                // Verifica as credenciais
                const foundUser = users.find(user => user.username === username && user.password === password);

                if (foundUser) {
                    // Login bem-sucedido - redireciona para app.html
                    errorMessage.textContent = 'Login bem-sucedido! Redirecionando...';
                    errorMessage.className = 'success-message';
                    
                    // Armazena usuário logado
                    localStorage.setItem('currentUser', username);
                    
                    // Redireciona após um pequeno atraso
                    setTimeout(() => {
                         window.location.href = 'app.html';
                    }, 1000);
                } else {
                    // Credenciais inválidas
                    errorMessage.textContent = 'Usuário ou senha inválidos.';
                    errorMessage.className = 'error-message';
                }
            } catch (error) {
                console.error('Erro ao processar login:', error);
                errorMessage.textContent = 'Erro ao tentar fazer login.';
                errorMessage.className = 'error-message';
            }
        });
    }
});
