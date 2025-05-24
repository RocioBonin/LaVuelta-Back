export const emailHtmlWithPassword = `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenid@ a La Vuelta Logística</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    body {
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #fafafa;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #0C1177;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    .password-box {
      background-color: #f1f1f1;
      padding: 15px;
      border-left: 4px solid #0C1177;
      margin: 20px 0;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777777;
      padding: 10px;
      border-top: 1px solid #eeeeee;
    }
  </style>
</head>

<body>
  <div class="email-container">
    <div class="header">
      <h1>¡Bienvenid@ a Glu Logística!</h1>
    </div>
    <div class="content">
      <p>Hola <strong>{{userName}}</strong>,</p>
      <p>Tu cuenta ha sido creada exitosamente por nuestro equipo. A continuación te compartimos tu contraseña temporal para que puedas ingresar:</p>

      <div class="password-box">
        Contraseña temporal: <strong>{{password}}</strong>
      </div>

      <p>Te recomendamos cambiar tu contraseña desde tu perfil una vez que hayas ingresado al sistema.</p>
      <p>Gracias por formar parte de Glu. Estamos para ayudarte en cada paso.</p>
      <p>— El equipo de Glu Logística</p>
    </div>
    <div class="footer">
      © 2025 Glu Logística. Todos los derechos reservados.
    </div>
  </div>
</body>

</html>
`;
