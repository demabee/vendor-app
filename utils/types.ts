import { FirebaseApp } from 'firebase/app';
import { DocumentReference, DocumentSnapshot, FieldValue, Timestamp } from 'firebase/firestore';

export type OrderItem = {
  label: string
  price: number
}

export type Order = {
  id: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: Timestamp;
  status: 'pending' | 'active' | 'cancelled' | 'completed';
  profilePicture: string;
};

export type Earning = {
  id: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: Timestamp;
  status: 'paid' | 'unpaid';
  profilePicture: string;
};

interface WalletData {
  balance: number;
  threshold: number;
}

export interface WalletDocData extends WalletData {
  userId: string;
}

export type WithdrawalData = {
  userId: string;
  amount: number;
  createdAt: FieldValue;
};

export type UserData = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  createdAt: FieldValue;
}

export type UserFormType = {
  displayName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}