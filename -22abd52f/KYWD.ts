import { ConfigService } from "@nestjs/config";
import { Product } from "src/products/entities/Product.entity";
import { Transaction } from "src/products/entities/Transaction.entity";

export class TypeOrmConfig {
    constructor(public configService: ConfigService) {}

    getConfig(){
        return {
            type: this.configService.get('DB_TYPE'),
            host: this.configService.get('DB_HOST'),
            port: this.configService.get('DB_PORT'),
            username: this.configService.get('DB_USERNAME'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_NAME'),
            entities: [Product, Transaction],
            synchronize: true,
        }
    }
}