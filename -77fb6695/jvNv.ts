import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Product } from "src/products/entities/Product.entity";
import { Transaction } from "src/products/entities/Transaction.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'mysql-db',
    port: 3306,
    username: 'root',
    password: 'Sithila5566',
    database: 'test_db',
    entities: [Product, Transaction],
    synchronize: true,
}