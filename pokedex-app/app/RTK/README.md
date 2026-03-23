# RTK Query Setup for Pokémon TCG API

This project uses **RTK Query** from Redux Toolkit to interact with the Pokémon Trading Card Game API.

## Installation

First, install the required dependencies:

```bash
npm install @reduxjs/toolkit react-redux
```

## Project Structure

```
app/
├── RTK/
│   ├── pokemonApi.js      # RTK Query API service
│   └── store.js           # Redux store configuration
├── components/
│   ├── Providers.js       # Redux Provider wrapper
│   └── CardsList.js       # Example component using RTK Query
├── layout.js              # Updated with Providers
└── page.js                # Updated to use CardsList
```

## Files Created/Modified

### 1. **app/RTK/pokemonApi.js**
Defines the RTK Query API service with endpoints:
- `getCards` - Fetch cards with pagination and optional search
- `getCardById` - Fetch a single card by ID
- `getSets` - Fetch card sets
- `getSetById` - Fetch a single set by ID
- `getCardsBySet` - Fetch cards filtered by set

### 2. **app/RTK/store.js**
Configures the Redux store with:
- RTK Query reducer
- RTK Query middleware for cache management

### 3. **app/components/Providers.js**
Client-side wrapper that provides Redux store to the app.

### 4. **app/components/CardsList.js**
Example component demonstrating RTK Query usage with:
- Fetching cards from the API
- Pagination support
- Loading and error states
- Grid display of card data

### 5. **app/layout.js**
Updated to wrap children with `<Providers>` component.

### 6. **app/page.js**
Updated to use the `<CardsList>` component.

## API Endpoints

Base URL: `https://api.pokemontcg.io/v2`

### Available Endpoints

#### Get Cards
```javascript
const { data, isLoading, isError } = useGetCardsQuery({
  limit: 20,      // Cards per page (default: 20)
  offset: 0,      // Pagination offset (default: 0)
  q: 'fire'       // Optional search query
});
```

#### Get Single Card
```javascript
const { data, isLoading, isError } = useGetCardByIdQuery('sv04pt-1');
```

#### Get Sets
```javascript
const { data, isLoading, isError } = useGetSetsQuery({
  limit: 20,
  offset: 0
});
```

#### Get Set by ID
```javascript
const { data, isLoading, isError } = useGetSetByIdQuery('sv04pt');
```

#### Get Cards by Set
```javascript
const { data, isLoading, isError } = useGetCardsBySetQuery({
  setId: 'sv04pt',
  limit: 20,
  offset: 0
});
```

## Usage Example

```jsx
'use client';

import { useGetCardsQuery } from '@/app/RTK/pokemonApi';

export function MyComponent() {
  const { data, isLoading, isError, error } = useGetCardsQuery({
    limit: 10,
    offset: 0
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data?.map(card => (
        <div key={card.id}>
          <h3>{card.name}</h3>
          <img src={card.images?.small} alt={card.name} />
        </div>
      ))}
    </div>
  );
}
```

## Running the App

```bash
npm run dev
```

Visit `http://localhost:3000` to see the Pokémon cards in action!

## Benefits of RTK Query

- **Automatic Caching**: Results are cached and reused
- **Automatic Request Deduplication**: Multiple identical requests are merged into one
- **Automatic Refetching**: Can set intervals for periodic updates
- **Optimistic Updates**: Update UI before server confirms
- **Race Condition Prevention**: Handles out-of-order responses
- **Great DevX**: Redux DevTools integration for debugging
- **Hooks-based API**: Clean React hooks for data fetching

## Next Steps

You can extend this setup by:

1. Adding filters and search functionality
2. Implementing card details page
3. Adding favorites/collection management with Redux slices
4. Setting up authentication for user-specific features
5. Adding real-time updates with WebSockets
