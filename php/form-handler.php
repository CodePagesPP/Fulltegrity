<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/PHPMailer.php';
require 'src/SMTP.php';
require 'src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $presupuesto = $_POST["presupuesto"] ?? "";
    $importacion = $_POST["importacion"] ?? "";
    $tipo_negocio = $_POST["tipo_negocio"] ?? "";
    $plan_visita = $_POST["plan_visita"] ?? "";
    $nombre = $_POST["nombre"] ?? "";
    $apellido = $_POST["apellido"] ?? "";
    $email = $_POST["email"] ?? "";
    $empresa = $_POST["empresa"] ?? "";
    $pais = $_POST["pais"] ?? "";
    $metodo_contacto = $_POST["metodo_contacto"] ?? "";
    $dato_contacto = $_POST["dato_contacto"] ?? "";
    $mensaje = $_POST["mensaje"] ?? "";

    $correoDestino = "<CORREO_DESTINO>";

    $contenidoHTML = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto;'>
        <div style='text-align: center; margin-bottom: 20px;'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZsrRviVm_-d9Zo9j1Rlrr28Tgo8H7NBz14Q&s' alt='Logo' style='max-width: 100px;'>
            <h2 style='color: #333;'>Nueva solicitud desde la página Fulltegrity</h2>
        </div>
        <p><strong>Solicitud de abastecimiento</strong></p>
        <hr>

        <p><strong>Datos del formulario:</strong></p>
        <ul style='line-height: 1.6;'>
            <li><strong>Presupuesto:</strong> $presupuesto</li>
            <li><strong>¿Tiene experiencia importando?:</strong> $importacion</li>
            <li><strong>Tipo de negocio:</strong> $tipo_negocio</li>
            <li><strong>Plan para visitar China:</strong> $plan_visita</li>
            <li><strong>Nombre:</strong> $nombre $apellido</li>
            <li><strong>Email:</strong> $email</li>
            <li><strong>Empresa:</strong> $empresa</li>
            <li><strong>País:</strong> $pais</li>
            <li><strong>Contacto preferido:</strong> $metodo_contacto - $dato_contacto</li>
            <li><strong>Mensaje:</strong><br>$mensaje</li>
        </ul>

        <hr>
        <p style='font-size: 12px; color: #999;'>Este mensaje fue enviado automáticamente desde el sitio web.</p>
    </div>
    ";


    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = '<CORREO>';
        $mail->Password = '<CONTRASEÑA>'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom($mail->Username, 'Fulltegrity');
        $mail->addAddress($correoDestino);

        $mail->isHTML(true);
        $mail->Subject = 'Nueva solicitud de contacto - Fulltegrity';
        $mail->Body    = $contenidoHTML;

        $mail->send();
        echo "Mensaje enviado correctamente.";
    } catch (Exception $e) {
        echo "Error al enviar el correo: {$mail->ErrorInfo}";
    }
} else {
    echo "Acceso no permitido.";
}
?>