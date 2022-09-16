NextNewsletter 🚀 is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Ensure you have ![node-version-image](https://img.shields.io/badge/node-16.17.0-brightgreen.svg) version installed.
- Define the local environment variables by copying `.env.sample`:

```
cp .env.sample .env.local
```

💡Secrets can be generated via node CLI with `crypto.randomBytes(128).toString('base64')` .

### Development

1. Install all dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

2. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
