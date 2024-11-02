import { Order } from './Order';

export class OrderQueue {
  private static _orders: Order[] = [];

  public static get(): Order[] {
    return this._orders;
  }

  public static set(orders: Order[]): void {
    this._orders = orders;
  }

  public static add(order: Order): void {
    this._orders.push(order);
  }

  public static remove(index: number): void {
    this._orders.splice(index, 1);
  }

  public static reset(): void {
    this._orders = [];
  }
}
