import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

export const apolloGraphQLConfig= {
    getConfig: () => GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        installSubscriptionHandlers: true,
        autoSchemaFile: '../schema.gql'
      })
}