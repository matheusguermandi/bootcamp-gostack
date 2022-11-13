import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import app from '../app';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new AppError('Transaction with this ID does not exist', 400);
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
