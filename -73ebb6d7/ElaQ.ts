import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from './config/typeOrm.config';
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
  TypeOrmModule.forRoot(typeOrmConfig),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
