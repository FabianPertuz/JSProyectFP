# Online Store Application Analysis

## Design Decisions

1. **User Interface**:
    - Clean and minimalist design to avoid distracting from the main content (the products).
    - Contrasting colors for important buttons (cart, add to cart).
    - Clear visual hierarchy with appropriate font sizes.
    - Cart sidebar overlays the content to maintain context.

2. **User Experience**:
    - Cart accessible from anywhere with a floating button.
    - Visual feedback when adding products (temporary messages).
    - Accessible filters and sorting to facilitate searching.
    - Responsive design that works on mobile, tablets, and desktop.

3. **Data Structure**:
    - **Products**: Array of objects containing all information from the API.
    - **Cart**: Array of objects extending products by adding quantity.
    - **LocalStorage**: Stores the cart as a JSON string for persistence.

4. **Filters and Sorting**:
    - **Implemented filters**:
      - By category (dropdown with dynamic options).
      - By maximum price (slider with visual feedback).
    - **Sorting**:
      - By price (ascending/descending).
      - By name (A-Z/Z-A).
    - **Search**: By product title or description.

## Justification of Decisions

1. **Persistence with localStorage**:
    - Allows the cart to be maintained between sessions without the need for a backend.
    - Simple but effective implementation for this use case.

2. **Combined Filters**:
    - Filters are applied in cascade to better refine results.
    - Sorting is applied afterwards so as not to affect filtering.

3. **Cart Design**:
    - Sidebar on desktop to maintain shopping context.
    - On mobile, it takes up the entire screen due to space limitations.
    - Shows product summary, quantity, and total per item.

4. **User Feedback**:
    - Temporary messages when adding items.
    - Item counter on the cart button.
    - Empty state when there are no products or search results.

