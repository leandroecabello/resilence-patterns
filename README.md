# 🛡️ Resilience Patterns

Este repositorio contiene implementaciones prácticas de patrones de resiliencia, robustez y eficiencia en la comunicación entre APIs y servicios distribuidos.

Organizado por lenguaje y patrón, este monorepo busca ser una referencia clara y pedagógica para aprender e implementar estas estrategias en entornos reales.

---

## 📚 Patrones implementados

### Node.js
- [Circuit Breaker (Native)](./nodejs/circuit-breaker/native)
- [Circuit Breaker (NestJS)](./nodejs/circuit-breaker/nestjs)
- Retry Pattern (coming soon)

### GO `(coming soon)`

### Python `(coming soon)`

---

## 🐳 Uso de Docker

Este monorepo incluye un `docker-compose.yml` en la raíz con servicios simulados comunes (como APIs mock, Redis, etc.) para facilitar el testing local de los patrones.

Podés configurar los puertos u otras variables editando el archivo `.env`.

### Comandos útiles

```bash
npm install         # una vez, para usar los scripts
npm run dev         # levanta los servicios simulados con docker-compose
npm run down        # detiene los servicios
npm run logs        # muestra logs en tiempo real
npm run rebuild     # limpia y vuelve a construir todo
```

## 🚀 Cómo levantar el entorno

Este monorepo está pensado para ser fácil de levantar y testear localmente usando Docker.

### 1. Cloná el repositorio

```bash
git clone https://github.com/tu-usuario/resilience-patterns.git
cd resilience-patterns
```

### 2. Instalá las dependencias necesarias para los comandos
```bash
npm install
```

Esto es solo para poder usar los scripts npm run dev, no instala ningún patrón ni ejemplo.

### 3. Levantá los servicios simulados
```bash
npm run dev
```

Esto ejecuta docker-compose up --build y levanta todos los servicios definidos (por ahora, solo external-api en el puerto `3001 por defecto` ).

### 4. Ejecutá el ejemplo del patrón
Entrá a la carpeta del patrón que quieras correr (ejemplo con Node.js nativo):

```bash
cd nodejs/circuit-breaker/native
npm install
node index.js
```

## 🧠 Patrones que se cubrirán

- Circuit Breaker
- Retry automático
- Timeouts y fallbacks
- Rate Limiting
- Queue-based Load Leveling
- Bulkheads
- Compensating actions (como en Sagas)

## ✨ Patrones implementados (explicación sencilla)
### 1. 🛡️ Circuit Breaker
El patrón Circuit Breaker se utiliza para proteger a un sistema de seguir haciendo llamadas a un servicio que está fallando. En lugar de insistir y sobrecargarlo, el sistema “abre el circuito” y deja de hacer llamadas por un tiempo.

🔧 Caso típico:
Una API de terceros empieza a fallar y responde con errores. En vez de seguir llamándola y empeorar la situación, el sistema interrumpe las llamadas por unos segundos y prueba más adelante si ya volvió a funcionar.

🧠 ¿Por qué es útil?
Previene caídas en cadena, reduce consumo innecesario y le da tiempo al servicio afectado para recuperarse.

### 2. 🔁 Retry Pattern
El patrón Retry consiste en reintentar una operación que falló, después de un pequeño intervalo de tiempo. Se usa cuando se espera que el fallo sea momentáneo, como una desconexión de red o un timeout.

🔧 Caso típico:
Una API responde con un error temporal (por ejemplo, una falla de red). En lugar de fallar de inmediato, el sistema espera 1 segundo y vuelve a intentar la operación.

🧠 ¿Por qué es útil?
Aumenta la tolerancia a fallos transitorios y mejora la estabilidad en sistemas distribuidos donde las fallas intermitentes son normales.