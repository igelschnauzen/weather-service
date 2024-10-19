import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

//deleting outdated weather data from db
@Injectable()
export class UpdateService implements OnModuleInit {
    constructor(private prisma: PrismaService){}

    async cleanOutdated(): Promise<void> {
      const sixHoursAgo = new Date();
      sixHoursAgo.setHours(sixHoursAgo.getHours() - 6); 
      await this.prisma.city.deleteMany({
        where: {
         updatedAt: { lt: sixHoursAgo },
        },
      });
      console.log('Deleting outdated data from db...');
    }

    async onModuleInit() {
      await this.cleanOutdated();

      setInterval(async () => {
        await this.cleanOutdated();

      }, 1000 * 60 * 30); //checking for outdated data in every 30 minutes
    }
}