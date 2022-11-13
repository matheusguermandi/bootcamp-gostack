import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionInterface {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(TransactionInterface: TransactionInterface): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (
      TransactionInterface.type === 'outcome' &&
      TransactionInterface.value > balance.total
    ) {
      throw new Error('Not enough money');
    }

    return this.transactionsRepository.create(TransactionInterface);
  }
}

export default CreateTransactionService;
