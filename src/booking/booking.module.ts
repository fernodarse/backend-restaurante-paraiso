import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingController } from './booking.controller';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
