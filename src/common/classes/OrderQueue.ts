import { Order } from './Order';

export class OrderQueue {
  private static _orders: Order[] = [];

  public static get(): Order[] {
    return this._orders;
  }

  public static add(order: Order): void {
    this._orders.push(order);
  }

  public static remove(index: number): void {
    this._orders.splice(index, 1);
  }

  public static sortByPriority(): void {
    const sortedOrders = this._orders.sort(({ priority: a }, { priority: b }) => (a > b ? 1 : b > a ? -1 : 0));
    this._orders = sortedOrders;
  }

  public static reset(): void {
    this._orders = [];
  }
}
