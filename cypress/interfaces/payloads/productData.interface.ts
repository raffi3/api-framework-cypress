export interface ProductDataRequestBodyPayload {
  title: string;
  description?: string;
  price?: number;
  [key: string]: any; 
}