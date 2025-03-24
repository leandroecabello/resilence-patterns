const axios = require('axios');
const CircuitBreaker = require('opossum');

const EXTERNAL_API_URL = 'http://localhost:3001/unstable-endpoint';

async function callExternalAPI() {
  const response = await axios.get(EXTERNAL_API_URL);
  return response.data;
}

const breakerOptions = {
  timeout: 3000,                // request que demore más de 3s falla
  errorThresholdPercentage: 50, // si >50% de los requests fallan, se abre el circuito
  resetTimeout: 5000            // después de 5s, prueba una vez en estado "half-open"
};

const breaker = new CircuitBreaker(callExternalAPI, breakerOptions);

// Eventos del breaker para visualizar el comportamiento
breaker.on('open', () => console.log('🔴 Circuito ABIERTO'));
breaker.on('halfOpen', () => console.log('🟡 Circuito en modo half-open'));
breaker.on('close', () => console.log('🟢 Circuito CERRADO'));
breaker.on('reject', () => console.log('⛔ Llamada rechazada (circuito abierto)'));
breaker.on('timeout', () => console.log('⏱️ Timeout alcanzado'));
breaker.on('success', () => console.log('✅ Request exitoso'));
breaker.on('failure', error => console.log('❌ Fallo:', error.message));

console.log('🚀 Iniciando requests cada 1 segundo...\n');

setInterval(() => {
  breaker.fire()
    .then(res => console.log('📥 Respuesta:', res))
    .catch(err => console.log('❌ Error:', err.message));
}, 1000);