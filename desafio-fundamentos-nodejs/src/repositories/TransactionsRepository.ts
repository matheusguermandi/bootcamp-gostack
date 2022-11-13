import Transaction from '../models/Transaction';

interface TransactionInterface {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.value, 0);

    const outcome = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((sum, item) => sum + item.value, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(TransactionInterface: TransactionInterface): Transaction {
    const transaction = new Transaction(TransactionInterface);

    this.transactions.push(transaction);

    return transaction;

  }
}

export default TransactionsRepository;
