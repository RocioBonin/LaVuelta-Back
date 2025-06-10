export const emailHtml = `
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
            background-color: #fafafa;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #24BA63;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            padding: 10px;
            border-top: 1px solid #eeeeee;
        }

        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: 600;
            background-color: #24BA63;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.5s easy;
        }

        .button:hover {
            background-color: #055E2A;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>¡Bienvenid@ a La Vuelta Logistica! Descubre nuestras novedades</h1>
        </div>
        <div class="content">
            <p>Hola, <strong>{{userName}}</strong></p>
            <p>¡Gracias por unirte a nuestra comunidad! <br> En <strong>La Vuelta</strong>, nos apasiona conectar personas y empresas a través de soluciones de mensajería rápidas, confiables y seguras.

A partir de ahora, serás el primero en enterarte de: <br>
📦 Ofertas exclusivas y descuentos en envíos. <br>
🚀 Nuevos servicios y herramientas que facilitan tu logística. <br>
🌍 Historias inspiradoras y tips para optimizar tus envíos. <br>

Estamos aquí para hacer que tus entregas lleguen a tiempo. Si tienes alguna pregunta o necesitas ayuda, nuestro equipo estará encantado de asistirte.</p><br>
            <p>¡Gracias por elegirnos!</p>
        </div>
    </div>
</body>

</html>
`;
