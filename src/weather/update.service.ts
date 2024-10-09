import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

//deleting outdated weather data from db
@Injectable()
export class UpdateService implements OnModuleInit {
    constructor(private prisma: PrismaService){}

    async onModuleInit() {
      
      setInterval(async () => {
        
        const fourHoursAgo = new Date();
        fourHoursAgo.setHours(fourHoursAgo.getHours() - 4); 

        await this.prisma.city.deleteMany({
          where: {
           updatedAt: { lt: fourHoursAgo },
          },
        });

        console.log('Deleting outdated data...');
      }, 1000 * 60 * 30); //checking for outdated data in every 30 minutes
    }
}