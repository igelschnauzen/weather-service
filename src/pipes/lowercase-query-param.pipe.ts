import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class LowercaseQueryParamPipe implements PipeTransform {
 transform(value: string, metadata: any): string {
  return value.toLowerCase();
 }
}