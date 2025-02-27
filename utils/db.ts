import Dexie, { type Table } from 'dexie';

export interface Application {
  id?: number;
  name: string;
  address: string;
  images: { url: string; caption: string }[];
  size: number;
  netRent: number;
  totalRent: number;
  rooms: number;
  exposeUrl?: string;
  status: 'pending' | 'invited' | 'viewing' | 'accepted' | 'rejected';
  exposePdf?: string;
  createdAt: Date;
}

export class FlatManagerDB extends Dexie {
  applications!: Table<Application>;

  constructor() {
    super('FlatManagerDB');
    this.version(1).stores({
      applications: '++id, name, address, size, netRent, totalRent, rooms, exposeUrl, status, createdAt',
    });
  }
}

export const db = new FlatManagerDB();
