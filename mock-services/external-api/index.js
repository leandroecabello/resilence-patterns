const express = require('express');
const app = express();
const PORT = 3000;

let failureMode = 'intermittent'; // 'always-fail', 'intermittent', 'healthy', 'flaky-delay'
let failUntil = null;

// Cambia el modo después de X segundos (opcional)
function setTemporaryFailure(seconds) {
  failureMode = 'always-fail';
  failUntil = Date.now() + seconds * 1000;
}

app.get('/unstable-endpoint', (req, res) => {
  // Restaurar estado si terminó la fase de fallo
  if (failUntil && Date.now() > failUntil) {
    failureMode = 'healthy';
    failUntil = null;
    console.log('🟢 Servicio volvió a estado saludable');
  }

  switch (failureMode) {
    case 'always-fail':
      return res.status(500).send('💥 Servicio caído (modo always-fail)');

    case 'intermittent':
      if (Math.random() < 0.4) {
        return res.status(500).send('⚠️ Falla aleatoria');
      }
      return res.send('✅ Respuesta OK');

    case 'flaky-delay':
      setTimeout(() => {
        if (Math.random() < 0.5) {
          return res.status(500).send('⏱️ Timeout con error');
        }
        res.send('✅ Lenta pero exitosa');
      }, 2000); // delay de 2s
      break;

    case 'healthy':
    default:
      return res.send('✅ Servicio saludable');
  }
});

// Endpoint para cambiar el estado desde afuera
app.post('/mode/:type', (req, res) => {
  const { type } = req.params;

  if (type === 'temporary-fail') {
    setTemporaryFailure(10); // falla por 10s
    return res.send('⏱️ Entrando en modo falla temporal por 10 segundos');
  }

  const validModes = ['always-fail', 'intermittent', 'healthy', 'flaky-delay'];
  if (validModes.includes(type)) {
    failureMode = type;
    failUntil = null;
    return res.send(`⚙️ Modo cambiado a: ${type}`);
  }

  res.status(400).send('Modo inválido');
});

app.listen(PORT, () => {
  console.log(`🧪 External API mock corriendo en http://localhost:${PORT}`);
});