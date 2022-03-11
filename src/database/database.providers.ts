
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://maksim:8u2upvDe0W1dp945@cluster0-mjkka.mongodb.net/backEndGallery'),
  },
];