import faker from 'faker';
import {Comment} from '../types/comment';
import {Film} from '../types/film';
import {User} from '../types/user';

const ID_MAX_COUNT = 10;
const RATING_MAX_COUNT = 10;
const DESCRIPTION_MAX_COUNT = 160;
const STARRING_MAX_COUNT = 4;
const RUNTIME_MAX_COUNT = 199;
const SCORE_MAX_COUNT = 999;
const RELEASED_DATE_START = 1960;
const RELEASED_DATE_MAX = 62;
const FAKE_ARRAY_LENGTH = 16;
const FAKE_GENRES_LENGTH = 10;

const generateRandomName = () => `${faker.name.firstName()} ${faker.name.lastName()}`;

export const makeFakeUser = (): User => ({
  id: faker.datatype.number(ID_MAX_COUNT),
  email: faker.internet.email(),
  name: generateRandomName(),
  avatarUrl: faker.internet.avatar(),
  token: faker.lorem.word(),
});

export const makeFakeFilmComment = (id?: number): Comment => ({
  comment: faker.lorem.paragraph(DESCRIPTION_MAX_COUNT),
  date: faker.date.past().toString(),
  id: id ?? faker.datatype.number(ID_MAX_COUNT),
  rating: faker.datatype.number(RATING_MAX_COUNT),
  user: {
    id: id ?? faker.datatype.number(ID_MAX_COUNT),
    name: generateRandomName(),
  },
});

export const makeFakeFilm = (id?: number): Film => ({
  id: id ?? faker.datatype.number(ID_MAX_COUNT),
  name: faker.name.title(),
  posterImage: faker.image.imageUrl(),
  previewImage: faker.image.imageUrl(),
  backgroundImage: faker.image.imageUrl(),
  backgroundColor: faker.internet.color(),
  videoLink: faker.internet.url(),
  previewVideoLink: faker.internet.url(),
  description: faker.lorem.paragraph(DESCRIPTION_MAX_COUNT),
  rating: faker.datatype.number(RATING_MAX_COUNT),
  scoresCount: faker.datatype.number(SCORE_MAX_COUNT),
  director: generateRandomName(),
  starring: faker.datatype.array(STARRING_MAX_COUNT).map(() => generateRandomName()),
  runTime: faker.datatype.number(RUNTIME_MAX_COUNT),
  genre: faker.name.title(),
  released: RELEASED_DATE_START + faker.datatype.number(RELEASED_DATE_MAX),
  isFavorite: faker.datatype.boolean(),
} as Film);

export const makeFakeFilms = (): Film[] => new Array(FAKE_ARRAY_LENGTH).fill(null).map((item, index) => makeFakeFilm(++index));
export const makeFakeComments = (): Comment[] => new Array(FAKE_ARRAY_LENGTH).fill(null).map((item, index) => makeFakeFilmComment(++index));
export const makeFakeGenres = (): string[] => faker.datatype.array(FAKE_GENRES_LENGTH).map(() => faker.name.title());
