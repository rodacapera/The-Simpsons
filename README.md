# The Simpsons App 🍩

App simple en React Native para consultar personajes de los Simpsons y gestionar notas personales.

## Descripción

Esta es una prueba técnica para demostrar el consumo de una API pública, manejo de estado local y persistencia de datos. La app permite:
- Registrarse e iniciar sesión (datos guardados en el dispositivo).
- Ver un listado de personajes de The Simpsons.
- Buscar personajes por nombre.
- Ver detalles y frases de cada personaje.
- Crear, editar y borrar notas personales sobre cada personaje (privadas por usuario).

## Cómo ejecutar la app

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Instalar Pods (iOS):**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Correr en Android:**
   ```bash
   npx react-native run-android
   ```

4. **Correr en iOS:**
   ```bash
   npx react-native run-ios
   ```

## Decisiones Técnicas

- **Gestión de Estado**: Usé `Context API` para la autenticación porque es simple y suficiente para manejar la sesión global. No hacía falta Redux para esto.
- **Persistencia**: `AsyncStorage` se encarga de guardar los usuarios (para simular el login) y las notas. Es la solución estándar para persistencia ligera.
- **Navegación**: `React Navigation` con un Stack básico. La navegación cambia dinámicamente según si hay usuario logueado o no (Auth flow).
- **API y Fallback**: La API de `thesimpsonsapi.com` devuelve data correcta, pero las imágenes (`portrait_path`) estaban dando 404. Decidí implementar un fallback usando `ui-avatars.com` con los colores de los Simpsons para que la app no se vea rota.
- **Estilos**: StyleSheet plano. No usé librerías de componentes pesadas para mantenerlo ligero y fácil de leer.

## Limitaciones

- **Imágenes**: Como mencioné, las imágenes originales no cargan, así que se ven avatares generados.
- **Seguridad**: Las contraseñas se guardan en texto plano en AsyncStorage. En una app real, esto NO se hace (usaríamos Keychain/Keystore y un backend real).
- **Listas Largas**: La lista tiene paginación simple ("Load More"). Si la API fuera muy lenta o la lista gigante, habría que optimizar el renderizado (FlashList).

## Mejoras Futuras

Con más tiempo, agregaría:
- Tests unitarios con Jest/Testing Library.
- TypeScript estricto (ahora es JS/TS básico).
- Un backend real con Node.js.
- Animaciones con Reanimated para dar más "vida" a la UI.

---
*Hecho por [Tu Nombre]*
