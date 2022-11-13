import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository'
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionRepositorory = getCustomRepository(TransactionRepository);

    const createCategory = new CreateCategoryService();

    const categoryObject = await createCategory.execute(category);

    const balance = await transactionRepositorory.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new AppError(
        "There's not enough money on your balance to complete this transaction",
        400,
      );
    }

    const transaction = transactionRepositorory.create({
      title,
      value,
      type,
      category: categoryObject
    });

    await transactionRepositorory.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;