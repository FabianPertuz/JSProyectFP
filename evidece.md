# Análisis de la Aplicación de Tienda Online

## Decisiones de Diseño

1. **Interfaz de Usuario**:
   - Diseño limpio y minimalista para no distraer del contenido principal (los productos).
   - Colores contrastantes para botones importantes (carrito, agregar al carrito).
   - Jerarquía visual clara con tamaños de fuente adecuados.
   - Barra lateral del carrito que se superpone al contenido para no perder contexto.

2. **Experiencia de Usuario**:
   - Carrito accesible desde cualquier punto con un botón flotante.
   - Feedback visual al agregar productos (mensajes temporales).
   - Filtros y ordenamiento accesibles para facilitar la búsqueda.
   - Diseño responsive que funciona en móviles, tablets y desktop.

3. **Estructura de Datos**:
   - **Productos**: Array de objetos con toda la información de la API.
   - **Carrito**: Array de objetos que extienden los productos añadiendo cantidad.
   - **LocalStorage**: Almacena el carrito como string JSON para persistencia.

4. **Filtros y Ordenamiento**:
   - **Filtros implementados**:
     - Por categoría (dropdown con opciones dinámicas).
     - Por precio máximo (slider con feedback visual).
   - **Ordenamientos**:
     - Por precio (ascendente/descendente).
     - Por nombre (A-Z/Z-A).
   - **Búsqueda**: Por título o descripción del producto.

## Justificación de Decisiones

1. **Persistencia con localStorage**:
   - Permite mantener el carrito entre sesiones sin necesidad de backend.
   - Simple implementación pero efectiva para este caso de uso.

2. **Filtros combinados**:
   - Los filtros se aplican en cascada para refinar mejor los resultados.
   - El ordenamiento se aplica después para no afectar el filtrado.

3. **Diseño del Carrito**:
   - Barra lateral en desktop para no perder contexto de compra.
   - En móvil ocupa toda la pantalla por limitaciones de espacio.
   - Muestra resumen del producto, cantidad y total por item.


