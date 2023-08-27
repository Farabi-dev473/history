import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Product } from './products/entities/Product.entity';
import { Transaction } from './products/entities/Transaction.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    installSubscriptionHandlers: true,
   autoSchemaFile: join(process.cwd(), './schema.gql')
  }), 
  ProductsModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-db',
    port: 3306,
    username: 'root',
    password: 'Sithila5566',
    database: 'test_db',
    entities: [Product, Transaction],
    synchronize: true,
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
