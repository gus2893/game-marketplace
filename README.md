## GE-Game Marketplace

This is a mock app that allows users to Log in (basic auth), Create Items, and trade them with other users using a token (money)

- Users can access dashboard that shows all of their items (for sale, or bought)
- Users can view all items for sale under the 'Items' tab
- Users can add new items to sell for anything over $1, must pay a 5% fee in order to place an item for sale
- Users can buy items from other users as long as the sale time is not expired and they have enough tokens + 5% fee
- Users can remove their own items from marketplace

## Run it locally

Set up the Service
Set up a postgres DB

modify your `.env.template` to `.env`

EXAMPLE:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=game_marketplace_db
PORT=5000
```

Run the Service

```bash
cd game-marketplace-service; npm install; npm start
```

Run the UI

```bash
cd game-marketplace-ui; npm install;npm start
```

(run the UI on port 3001)
