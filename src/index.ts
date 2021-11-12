import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

async function bootstrap() {
  const app = express();

  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: true,
    logging: false,
  });

  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());

  app.use(router());

  app.listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
  });
}

bootstrap();
