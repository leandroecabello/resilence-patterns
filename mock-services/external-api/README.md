# 🧪 Mock API - External Service Simulado

Este servicio simula una API externa **inestable**, pensada para probar patrones de resiliencia como **Circuit Breaker**, **Retry**, **Timeouts**, etc.

Permite cambiar su comportamiento en tiempo real para simular distintos escenarios de falla, lentitud o salud.

---

## ⚙️ Endpoints

### `GET /unstable-endpoint`

Es el endpoint principal que responde según el modo actual del servicio.

---

### `POST /mode/:type`

Permite cambiar el comportamiento del servicio en tiempo real. Reemplazá `:type` por alguno de los siguientes:

| Modo             | Descripción |
|------------------|-------------|
| `healthy`        | Siempre responde OK (`200`) |
| `always-fail`    | Siempre responde con error (`500`) |
| `intermittent`   | Falla de forma aleatoria (40% de las veces) |
| `flaky-delay`    | Responde con delay de 2 segundos y puede fallar |
| `temporary-fail` | Falla durante 10 segundos y luego vuelve a estado saludable |



#### 📌 Ejemplos:
```bash
curl -X POST http://localhost:3001/mode/always-fail
curl -X POST http://localhost:3001/mode/temporary-fail
```

## 🚀 Cómo correrlo
Este servicio forma parte del monorepo resilience-patterns.

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

El servicio quedará disponible en:

```bash
http://localhost:3001/unstable-endpoint
```

## 🧠 ¿Para qué sirve esto?
Este mock simula condiciones reales de APIs inestables para que puedas probar patrones de resiliencia sin depender de servicios externos:

🔁 Retry automático

🛡️ Circuit Breaker

⏱️ Timeout + Fallback

🧪 Pruebas de carga y caos

## ✍️ Personalización
Podés extender este mock agregando nuevos endpoints, distintos tipos de errores (404, 401, etc.), o condiciones específicas para pruebas más avanzadas.

> 📦 Está escrito en Node.js con express, contenido en un contenedor Docker que podés levantar fácilmente con docker-compose.


## 💡 Conclusion:
✅ Una API simulada  
✅ Comportamiento cambiante en tiempo real  
✅ Documentación clara para cualquier dev  
✅ Base perfecta para conectar con `circuit-breaker/native`