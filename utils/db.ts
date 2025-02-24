import Dexie, { type Table } from 'dexie';

export interface Application {
  id?: number;
  name: string;
  address: string;
  url?: string;
  status: 'pending' | 'invited' | 'viewing' | 'accepted' | 'rejected';
  pdfUrl?: string;
  createdAt: Date;
}

export class FlatManagerDB extends Dexie {
  applications!: Table<Application>;

  constructor() {
    super('FlatManagerDB');
    this.version(1).stores({
      applications: '++id, name, address, url, status, pdfUrl, createdAt',
    });
  }
}

export const db = new FlatManagerDB();
