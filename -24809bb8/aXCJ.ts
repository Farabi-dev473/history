import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"

class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
         return {
            
         }
    }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    useFactory: async(configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return TypeOrmConfig.getOrmConfig(configService)
    }
}