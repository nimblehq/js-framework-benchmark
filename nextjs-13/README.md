# NextNewsletter 🚀 [Next.JS 13]

The application is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Ensure you have ![node-version-image](https://img.shields.io/badge/node-16.17.0-brightgreen.svg) version installed.
- Define the local environment variables by copying `.env.sample`:

```
cp .env.sample .env
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

2. Migrate database:

    ```bash
    prisma generate

    prisma migrate dev
    ```

3. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Start maildev

    ```
    # set these 2 env variables into those in .env if you want to use maildev
    MAILGUN_SMTP_HOST=0.0.0.0
    MAILGUN_SMTP_PORT=1025
    ```

    ```bash
    maildev
    # then go to http://0.0.0.0:1080/#/
    ```

5. Start redis + worker

    ```bash
    # install redis if not already, port 6379
    redis-server
    ```

    ```bash
    yarn worker
    ```

6. Open [http://localhost:3300](http://localhost:3300) with your browser to see the result.

## Tests

1. Run tests:

    ```bash
    yarn test
    ```

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
