import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class CacheService {
  private client;

  constructor() {
    this.client = createClient(); // Connect to Redis
    this.client.connect();
  }

  async set(key: string, value: string, ttl: number = 604800): Promise<void> { //a week in seconds
    await this.client.set(key, value, {
        EX: ttl
    }); // Set the key-value pair with an expiration of 1 hour
  }

  async get(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async reset() { 
    await this.client.flushDb();
  }
}