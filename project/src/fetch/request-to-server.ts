import {ERROR} from '../components/utils/const';

const linkToServer = 'https://10.react.pages.academy/wtw';

const enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE'
}

const enum GetRequest {
  Promo = '/promo',
  Films = '/films',
  Similar = '/similar',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login'
}

const getPromoFilm = async () => {
  const link = `${linkToServer}${GetRequest.Promo}`;
  const headers: Headers = new Headers();

  const objRequest: RequestInit = {
    method: RequestMethod.Get,
    headers: headers,
  };

  try {
    const response = await fetch(link, objRequest);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw response;
  } catch {
    return ERROR;
  }
};

const getFilmsList = async () => {
  const link = `${linkToServer}${GetRequest.Films}`;
  const headers: Headers = new Headers();

  const objRequest: RequestInit = {
    method: RequestMethod.Get,
    headers: headers,
  };

  try {
    const response = await fetch(link, objRequest);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw response;
  } catch {
    return ERROR;
  }
};

const getFilm = async (idFilm: number) => {
  const link = `${linkToServer}${GetRequest.Films}/${idFilm}`;
  const headers: Headers = new Headers();

  const objRequest: RequestInit = {
    method: RequestMethod.Get,
    headers: headers,
  };
  const response = await fetch(link, objRequest);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw response;
};

const getCommentsFilm = async (idFilm: number) => {
  const link = `${linkToServer}${GetRequest.Comments}/${idFilm}`;
  const headers: Headers = new Headers();

  const objRequest: RequestInit = {
    method: RequestMethod.Get,
    headers: headers,
  };

  try {
    const response = await fetch(link, objRequest);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw response;
  } catch {
    return ERROR;
  }
};

export {getPromoFilm, getFilmsList, getFilm, getCommentsFilm};
