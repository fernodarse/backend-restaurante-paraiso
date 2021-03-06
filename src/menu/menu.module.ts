import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { MenuService } from './menu.service';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
