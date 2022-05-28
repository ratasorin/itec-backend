import { IsDateString, IsNotEmpty } from 'class-validator';

export class Timeframe {
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  end: string;
}
