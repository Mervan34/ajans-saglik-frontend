export enum RequestType {
  BUY = 'BUY',
  SELL = 'SELL',
  INFO = 'INFO'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  CONTACTED = 'CONTACTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ContactRequest {
  id?: number;
  name: string;
  email: string;
  phone: string;
  requestType: RequestType;
  message: string;
  productId?: number;
  productTitle?: string;
  status?: RequestStatus;
  createdAt?: Date;
}

export const REQUEST_TYPE_NAMES: { [key in RequestType]: string } = {
  [RequestType.BUY]: 'Satın Alma',
  [RequestType.SELL]: 'Satış',
  [RequestType.INFO]: 'Bilgi Talebi'
};