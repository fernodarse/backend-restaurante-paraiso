import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingController } from './booking.controller';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    MailModule,
    UsersModule
  ],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
