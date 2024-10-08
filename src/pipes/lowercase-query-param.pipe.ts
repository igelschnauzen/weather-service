import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ToponimicNamePipe implements PipeTransform {
 transform(value: string, metadata: any): string {
    //capitalize the first letter, all the rest to lower case
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
 }
}