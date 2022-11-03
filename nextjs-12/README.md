# NextNewsletter 🚀 [Next.JS 12]

The application is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Ensure you have ![node-version-image](https://img.shields.io/badge/node-16.17.0-brightgreen.svg) version installed.
- Define the local environment variables by copying `.env.sample`:

```
cp .env.sample .env.local
```

- Fill in all environment variables by their respective values

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

## Tests

- Define the local environment variables by copying `.env.sample`:

```
cp .env.sample .env.test
```

- Fill in all environment variables by their respective values

💡 Define `OAUTH_PASSPORT_STRATEGY=mock` to use a mock authentication.
 
## License

This project is Copyright (c) 2014 and onwards Nimble. It is free software and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE

## About
<a href="https://nimblehq.co/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.nimblehq.co/logo/dark/logo-dark-text-160.png">
    <img alt="Nimble logo" src="https://assets.nimblehq.co/logo/light/logo-light-text-160.png">
  </picture>
</a>

This project is maintained and funded by Nimble.

We ❤️ open source and do our part in sharing our work with the community!
See [our other projects][community] or [hire our team][hire] to help build your product.

Want to join? [Check out our Jobs][jobs]!

[community]: https://github.com/nimblehq
[hire]: https://nimblehq.co/
[jobs]: https://jobs.nimblehq.co/
