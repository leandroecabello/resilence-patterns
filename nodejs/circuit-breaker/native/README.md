# 🛡️ Circuit Breaker - Node.js Nativo

Este ejemplo muestra cómo usar el patrón **Circuit Breaker** en Node.js utilizando la librería [Opossum](https://github.com/nodeshift/opossum). La implementación es mínima y sin frameworks, ideal para comprender el funcionamiento básico del patrón.

---

## 🤔 ¿Qué es Circuit Breaker?

Circuit Breaker es un patrón de resiliencia que protege a tu sistema de **seguir llamando a un servicio que está fallando constantemente**. En vez de insistir y provocar más errores, el sistema “abre el circuito” y deja de hacer llamadas por un tiempo.

🔧 **Ejemplo simple**:  
Imaginá que un microservicio intenta consultar una API externa. Esta API empieza a responder con errores. En lugar de seguir llamando y colapsar el sistema, el Circuit Breaker detecta las fallas y corta las llamadas por unos segundos. Luego vuelve a probar.

🧠 **Beneficio principal**:  
Evita caídas en cascada, reduce el consumo de recursos innecesarios y permite que los servicios se recuperen.

---

## ⚙️ Escenario simulado

Este ejemplo consulta una API inestable (`/unstable-endpoint`) provista por un servicio mock (`external-api`) que falla aleatoriamente.

- Si las fallas superan el 50%, el circuito se abre durante 5 segundos.
- Luego intenta reestablecer la conexión en modo “half-open”.

---

## 🚀 Cómo correr este ejemplo

### 1. Levantar los servicios simulados (en raíz del repo)

```bash
npm install
npm run dev
```

### 2. Ejecutar el circuito
```bash
cd nodejs/circuit-breaker/native
npm install
node index.js
```

Verás mensajes como:

```javascript
✅ All good
❌ Error: Request failed with status code 500
🔴 Circuito ABIERTO
🟢 Circuito CERRADO
```

## 📁 Archivos clave
- `index.js`: lógica principal del circuito
- `external-api`: API mock que simula fallos

## ✍️ Otros ejemplos
En este repositorio también encontrarás implementaciones con NestJS y otros lenguajes para comparar cómo se aplica el patrón en distintos entornos.