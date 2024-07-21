import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price1 = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price2 = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price1 / price2
    const upper_bound = 1 + 0.05
    const lower_bound = 1 - 0.05
    const trigger = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined
    return {
      price_abc: price1,
      price_def: price2,
      ratio: ratio,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_alert: trigger,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
    }
  }
}
