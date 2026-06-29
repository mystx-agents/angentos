# AgentOS - Official Instagram Graph API Integration

## Setup Guide
1. Go to the [Meta App Dashboard](https://developers.facebook.com/apps).
2. Create a new App of type "Business".
3. Add the "Instagram Graph API" product.
4. Set up an Instagram Professional Account linked to a Facebook Page.
5. Generate your App ID and App Secret.

## Environment Variables
Ensure the following variables are present in your `.env` file:
```env
INSTAGRAM_CLIENT_ID=your_meta_app_id
INSTAGRAM_CLIENT_SECRET=your_meta_app_secret
INSTAGRAM_REDIRECT_URI=http://localhost:8000/api/instagram/auth/callback
INSTAGRAM_WEBHOOK_VERIFY_TOKEN=your_secure_random_token
```

## Webhook Setup Guide
1. In the Meta App Dashboard, navigate to the Webhooks product.
2. Select "Instagram" from the dropdown.
3. Click "Subscribe to this object".
4. Callback URL: `https://your-domain.com/api/instagram/webhook`
5. Verify Token: `your_secure_random_token`
6. Subscribe to the `messages` and `messaging_postbacks` fields.

## API Documentation
The module exposes the following REST endpoints:
- `GET /api/instagram/auth/url`: Returns the Meta OAuth redirect URL.
- `GET /api/instagram/auth/callback`: Handles the OAuth code exchange, gets long-lived token, encrypts and links account.
- `GET /api/instagram/dashboard`: Returns connected account health, API status, token expiry, and sync metrics.
- `GET /api/instagram/webhook`: Meta webhook challenge verifier.
- `POST /api/instagram/webhook`: Receives new Instagram Direct Messages. 

## Agent Brain Integration
When a message hits the webhook:
1. Validates HMAC signature (`X-Hub-Signature-256`).
2. Enqueues event via `InstagramEventQueue`.
3. Dispatches `INSTAGRAM_MESSAGE_RECEIVED` into the `AgentBrain` Priority Queue.
4. Processes through LLM (Memory, Safety, Analytics).
5. Responses are delivered asynchronously via the `InstagramGraphClient`.

## Token Manager
A background scheduler task continuously runs (`monitor_tokens`) checking for tokens expiring within 7 days. It automatically requests token refreshes using the official `ig_refresh_token` grant type.

## Troubleshooting Guide
- **Error: 400 Bad Request (OAuth code invalid)** -> Ensure the `redirect_uri` precisely matches the one defined in Meta Developer Portal.
- **Error: Invalid Signature** -> Verify that your `.env` `INSTAGRAM_CLIENT_SECRET` matches the one in your Meta App Dashboard.
- **Webhook Not Receiving Events** -> Ensure your Instagram account is Professional/Creator, linked to an FB Page, and the FB page is granted permissions to the Meta App.
