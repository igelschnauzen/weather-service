A simple NestJS API for getting JSON weather data by city name

## Technologies Used

- NodeJS
- TypeScript
- NestJS
- Redis
- PostgreSQL
- Prisma

## API endpoints

- **/get/:city**: Get JSON weather by city name
- **/cleanCache/:password**: Clean Redis cache (requieres a password)
- **/cleanDb/:password**: Clean PostgreSQL data (requieres a password)
