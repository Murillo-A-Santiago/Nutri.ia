document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const registerButton = document.getElementById('register-button');
    const usernameInput = document.getElementById('new-username');
    const passwordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const registerMessage = document.getElementById('register-message');

    if (registerButton) {
        registerButton.addEventListener('click', (event) => {
            event.preventDefault();
            registerMessage.textContent = '';
            registerMessage.className = '';

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            // Validação básica
            if (!username || !password || !confirmPassword) {
                registerMessage.textContent = 'Por favor, preencha todos os campos.';
                registerMessage.className = 'error-message';
                return;
            }

            if (password !== confirmPassword) {
                registerMessage.textContent = 'As senhas não coincidem.';
                registerMessage.className = 'error-message';
                return;
            }

            try {
                // Busca usuários existentes no localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];

                // Verifica se o usuário já existe
                const userExists = users.some(user => user.username === username);
                if (userExists) {
                    registerMessage.textContent = 'Nome de usuário já existe.';
                    registerMessage.className = 'error-message';
                    return;
                }

                // Adiciona novo usuário
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));

                // Cadastro bem-sucedido
                registerMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
                registerMessage.className = 'success-message';
                
                // Redirecionar para a página de login após cadastro
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } catch (error) {
                console.error('Erro ao tentar cadastrar:', error);
                registerMessage.textContent = 'Erro ao processar o cadastro. Tente novamente.';
                registerMessage.className = 'error-message';
            }
        });
    }
});
