import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { Favorite } from './pokemon/favorite.entity';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379
          },
        }),
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'favorites.db',
      entities: [Favorite],
      synchronize: true
    }),
    PokemonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
