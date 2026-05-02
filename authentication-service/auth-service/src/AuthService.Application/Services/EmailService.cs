using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using AuthService.Application.Interfaces;
using System.IO;

namespace AuthService.Application.Services;

public class EmailService(IConfiguration configuration, ILogger<EmailService> logger) : IEmailService
{
    public async Task SendEmailVerificationAsync(string email, string username, string token)
    {
        var subject = "Verifica tu dirección de correo electrónico";
        var verificationUrl = $"{configuration["AppSettings:FrontendUrl"]}/verify-email?token={token}";

        var body = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 8px;'>
                
                <div style='text-align: center; padding-bottom: 20px;'>
                    <h2 style='color: #c20000;'>¡Bienvenido a Brasa 33, {username}! 🔥</h2>
                </div>

                <p style='font-size: 16px; color: #333;'>
                    Gracias por registrarte. Para activar tu cuenta y comenzar a disfrutar de nuestros servicios,
                    necesitamos que confirmes tu dirección de correo electrónico.
                </p>

                <div style='text-align: center; margin: 30px 0;'>
                    <a href='{verificationUrl}' 
                    style='background-color: #c20000; color: #ffffff; padding: 12px 25px; 
                            text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;'>
                        Verificar mi correo
                    </a>
                </div>

                <p style='font-size: 14px; color: #555;'>
                    Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                </p>

                <p style='word-break: break-all; font-size: 13px; color: #777;'>
                    {verificationUrl}
                </p>

                <hr style='margin: 25px 0; border: none; border-top: 1px solid #ddd;' />

                <p style='font-size: 13px; color: #777;'>
                    Este enlace expirará en 24 horas por razones de seguridad.
                </p>

                <p style='font-size: 13px; color: #777;'>
                    Si no creaste una cuenta en Brasa 33, puedes ignorar este mensaje sin ningún problema.
                </p>

                <p style='font-size: 13px; color: #999; text-align: center; margin-top: 30px;'>
                    © {DateTime.Now.Year} Brasa 33. Todos los derechos reservados.
                </p>

            </div>
            ";

        await SendEmailAsync(email, subject, body);
    }

    public async Task SendPasswordResetAsync(string email, string username, string token)
    {
        var subject = "Restablece tu contraseña";
        var resetUrl = $"{configuration["AppSettings:FrontendUrl"]}/reset-password?token={token}";
        var body = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 8px;'>

                <div style='text-align: center; padding-bottom: 20px;'>
                    <h2 style='color: #c20000;'>Restablecimiento de Contraseña </h2>
                </div>

                <p style='font-size: 16px; color: #333;'>
                    Hola <strong>{username}</strong>,
                </p>

                <p style='font-size: 15px; color: #333;'>
                    Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Brasa 33</strong>.
                    Si fuiste tú, puedes crear una nueva contraseña haciendo clic en el siguiente botón:
                </p>

                <div style='text-align: center; margin: 30px 0;'>
                    <a href='{resetUrl}' 
                    style='background-color: #c20000; color: #ffffff; padding: 12px 25px; 
                            text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;'>
                        Restablecer mi contraseña
                    </a>
                </div>

                <p style='font-size: 14px; color: #555;'>
                    Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                </p>

                <p style='word-break: break-all; font-size: 13px; color: #777;'>
                    {resetUrl}
                </p>

                <hr style='margin: 25px 0; border: none; border-top: 1px solid #ddd;' />

                <p style='font-size: 13px; color: #777;'>
                     !!Este enlace expirará en 1 hora por motivos de seguridad!!
                </p>

                <p style='font-size: 13px; color: #777;'>
                    Si no solicitaste este cambio, puedes ignorar este mensaje. 
                    Tu contraseña actual permanecerá segura y sin modificaciones.
                </p>

                <p style='font-size: 13px; color: #999; text-align: center; margin-top: 30px;'>
                    © {DateTime.Now.Year} Brasa 33. Todos los derechos reservados.
                </p>

            </div>
            ";

        await SendEmailAsync(email, subject, body);
    }

    public async Task SendWelcomeEmailAsync(string email, string username)
    {
        var subject = "¡Bienvenido a BRASA 33!";

        var body = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 8px;'>

                <div style='text-align: center; padding-bottom: 20px;'>
                    <h2 style='color: #c20000;'>¡Bienvenido a Brasa 33, {username}! </h2>
                </div>

                <p style='font-size: 16px; color: #333;'>
                    ¡Excelente noticia! Tu cuenta ha sido <strong>verificada y activada correctamente</strong>.
                </p>

                <p style='font-size: 15px; color: #333;'>
                    Ahora puedes acceder a todas las funciones de nuestra plataforma y disfrutar de la experiencia completa que Brasa 33 tiene para ti.
                </p>

                <div style='background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #c20000;'>
                    <p style='margin: 0; font-size: 14px; color: #555;'>
                        Si tienes alguna duda o necesitas ayuda, nuestro equipo de soporte está listo para asistirte.
                    </p>
                    <p style='margin: 5px 0 0 0; font-size: 14px;'>
                        <a href='mailto:la33code@gmail.com' style='color: #c20000; text-decoration: none;'>
                            la33code@gmail.com
                        </a>
                    </p>
                </div>

                <p style='font-size: 15px; color: #333;'>
                    Gracias por confiar en nosotros y ser parte de la comunidad Brasa 33.
                </p>

                <p style='font-size: 13px; color: #999; text-align: center; margin-top: 30px;'>
                    © {DateTime.Now.Year} Brasa 33. Todos los derechos reservados.
                </p>

            </div>
            ";

        await SendEmailAsync(email, subject, body);
    }

    private async Task SendEmailAsync(string to, string subject, string body)
    {
        var smtpSettings = configuration.GetSection("SmtpSettings");

        try
        {
            // Verificar si el email está habilitado
            var enabled = bool.Parse(smtpSettings["Enabled"] ?? "true");
            if (!enabled)
            {
                logger.LogInformation("El envío de emails está deshabilitado en la configuración. Omitiendo envío");
                return;
            }

            // Validar configuración
            var host = smtpSettings["Host"];
            var portString = smtpSettings["Port"];
            var username = smtpSettings["Username"];
            var password = smtpSettings["Password"];
            var fromEmail = smtpSettings["FromEmail"];
            var fromName = smtpSettings["FromName"];

            if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                logger.LogError("La configuración SMTP no está configurada correctamente");
                throw new InvalidOperationException("La configuración SMTP no está configurada correctamente");
            }

            // Avoid logging sensitive SMTP details

            var port = int.Parse(portString ?? "587");

            var protocolLogPath = smtpSettings["ProtocolLogPath"];
            if (!string.IsNullOrWhiteSpace(protocolLogPath))
            {
                var logDir = Path.GetDirectoryName(protocolLogPath);
                if (!string.IsNullOrWhiteSpace(logDir))
                {
                    Directory.CreateDirectory(logDir);
                }
                logger.LogInformation("SMTP protocol logging enabled at {ProtocolLogPath}", protocolLogPath);
            }

            using var protocolLogger = !string.IsNullOrWhiteSpace(protocolLogPath)
                ? new ProtocolLogger(protocolLogPath)
                : null;

            using var client = protocolLogger != null
                ? new SmtpClient(protocolLogger)
                : new SmtpClient();

            // Configurar timeout
            var timeoutMs = int.Parse(smtpSettings["Timeout"] ?? "30000");
            client.Timeout = timeoutMs;

            try
            {
                // Configurar validación de certificados SSL
                var ignoreCertErrors = bool.Parse(smtpSettings["IgnoreCertificateErrors"] ?? "false");
                if (ignoreCertErrors)
                {
                    logger.LogWarning("Validación de certificados SSL deshabilitada. Solo usar en desarrollo.");
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                }

                // Verificar configuración de SSL implícito
                var useImplicitSsl = bool.Parse(smtpSettings["UseImplicitSsl"] ?? "false");

                // Configuración específica por puerto y SSL
                if (useImplicitSsl || port == 465)
                {
                    await client.ConnectAsync(host, port, SecureSocketOptions.SslOnConnect);
                }
                else if (port == 587)
                {
                    await client.ConnectAsync(host, port, SecureSocketOptions.StartTls);
                }
                else
                {
                    await client.ConnectAsync(host, port, SecureSocketOptions.Auto);
                }

                // Autenticación
                await client.AuthenticateAsync(username, password);

                // Crear mensaje con MimeKit
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(fromName, fromEmail));
                message.To.Add(new MailboxAddress("", to));
                message.Subject = subject;
                message.Body = new TextPart("html") { Text = body };

                // Enviar
                await client.SendAsync(message);
                logger.LogInformation("Email enviado exitosamente");

                await client.DisconnectAsync(true);
                logger.LogInformation("Pipeline de email completado");
            }
            catch (MailKit.Security.AuthenticationException authEx)
            {
                logger.LogError(authEx, "La autenticación de Gmail falló. Verifica la contraseña de aplicación.");
                throw new InvalidOperationException($"La autenticación de Gmail falló: {authEx.Message}. Por favor, verifica la contraseña de aplicación.", authEx);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error al enviar el email");
                throw;
            }
            logger.LogInformation("Email processed");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error al enviar el email");

            // Verificar si usar fallback
            var useFallback = bool.Parse(smtpSettings["UseFallback"] ?? "false");
            if (useFallback)
            {
                logger.LogWarning("Usando respaldo de email");
                return; // No fallar, solo logear
            }

            throw new InvalidOperationException($"Error al enviar el email: {ex.Message}", ex);
        }
    }
}

