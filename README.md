# Prototipos
prototipo html para visualização
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Primeiro Acesso - Confirme seu CPF</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 420px;
      margin: auto;
      background: #F8F8F8;
    }
    h2 {
      font-size: 22px;
      color: #004AAD;
    }
    input, button {
      width: 100%;
      padding: 12px;
      margin-top: 16px;
      font-size: 18px;
      border-radius: 8px;
    }
    button {
      background: #00A34D;
      color: #fff;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }
    button:disabled {
      background: #A9A9A9;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <h2>Confirme seu CPF</h2>
  <p>Para sua segurança, confirme o CPF cadastrado.</p>

  <label for="cpf">CPF</label>
  <input type="text" id="cpf" placeholder="000.000.000-00" maxlength="14">

  <button id="continuar" disabled>Continuar</button>

  <script>
    const cpfInput = document.getElementById('cpf');
    const btn = document.getElementById('continuar');

    function mascaraCPF(valor) {
      return valor
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    cpfInput.addEventListener('input', () => {
      cpfInput.value = mascaraCPF(cpfInput.value);
      btn.disabled = cpfInput.value.length < 14;
    });

    btn.addEventListener('click', () => {
      window.location.href = "cadastro.html";
    });
  </script>
</body>
</html>
