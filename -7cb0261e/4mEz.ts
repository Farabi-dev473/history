import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/Product.entity';
import { Transaction } from './entities/Transaction.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>
    ) {}
    
    async createSingleProduct(quantity: number) {
        const productEntity = this.productRepository.create()
        const {id} = await this.productRepository.save(productEntity)
        const transactionEntity = this.transactionRepository.create({status: 'created', productId: id, quantity})
        const transaction = await this.transactionRepository.save(transactionEntity)
        
        const product = {
            id,
            transactions: [{
                id: transaction.id,
                quantity: transaction.quantity,
                time: transaction.time,
                status: transaction.status
            }]
        }
        
        return product
    }

    async deleteProductById(id: string) {
        let {affected: deletedRows} =  await this.productRepository.createQueryBuilder() 
                                                                 .delete()
                                                                 .from(Product)
                                                                 .where('id = :id', {id})
                                                                 .execute()

        const deleteResponse = {
                 id,
                 deleted: false
        }

        if(deletedRows === 1) {
            deleteResponse.deleted = true
            return deleteResponse
        }
        return deleteResponse
    }

    async getAllProducts() {
    
        const productsIds = await this.productRepository
                                                    .createQueryBuilder('product')
                                                    .getMany()

        const products = []
        let product: object
        let transactions
        for(let i = 0; i < productsIds.length; i++) {
            transactions = await this.transactionRepository
                                                      .createQueryBuilder('transaction')
                                                      .where('transaction.productId = :id', {id: productsIds[i]['id']})
                                                      .getMany()
            product = {
                id: productsIds[i]['id'],
                transactions
            }
            products.push(product)
        }
        return products
    }

    async getProduct(id: string) {
        const { id: productId } = await this.productRepository
                                        .createQueryBuilder('product')
                                        .where('product.id = :id', {id})
                                        .getOne()
        let transactions = await this.transactionRepository
                                        .createQueryBuilder('transaction')
                                        .where('transaction.productIdId = :id', {id: productId})
                                        .getMany()
        const product = {
            id: productId,
            transactions
        }
        return product
    }
}
