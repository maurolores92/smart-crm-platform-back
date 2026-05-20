import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { SeedModule } from './seeders/seeders.module';
import { DatabaseModule } from 'src/database/database.module';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    SeedModule,
    UsersModule,
    RoleModule,
    LeadsModule


  ],
})
export class AppModule {

}