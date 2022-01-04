import { common, config } from "../commons/config";
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
type HTTP_METHOD_TYPES = keyof typeof HTTP_METHODS

export const callJsonApi = async (type: HTTP_METHOD_TYPES, point: string, input: any) => {
  let param = {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    }
  };
  if (input && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype) {
    return callApi(point, param);
  };
  if (type !== 'GET') {
    param = {
      ...param,
      ...{ body: JSON.stringify(input) }
    }
  } else {
    point = `${point}?${new URLSearchParams(input).toString()}`;
  }
  
  return callApi(point, param);
}

export const callPrivateJsonApi = async (type: HTTP_METHOD_TYPES, point: string, input: any) => {
  const token  = localStorage.getItem('token');
  let param = {
    method: type,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if (input && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype) {
    return callApi(point, param);
  };
  if (type !== 'GET') {
    param = {
      ...param,
      ...{ body: JSON.stringify(input) }
    }
  } else {
    point = `${point}?${new URLSearchParams(input).toString()}`;
  }
  return callApi(point, param);
}

export const callApi = async (point: string, param: any) => {
  try {
    const result = await fetch(`${config.API_URL}${point}`, param);
    if (result.status < StatusCodes.INTERNAL_SERVER_ERROR) {
      const response = await result.json();
      if (response.statusCode && response.statusCode === StatusCodes.UNAUTHORIZED) {
        localStorage.removeItem('token');
        window.location.assign('/');
      }
      if (response.statusCode && response.statusCode > StatusCodes.MULTIPLE_CHOICES) {
        return {
          status: common.INCORRECT,
          message: getReasonPhrase(result.status),
        }
      }
  
      return response
    } else {
      return {
        status: common.INCORRECT,
        message: getReasonPhrase(result.status),
      }
    }
  } catch(e) {
    return {
      status: common.INCORRECT,
      message: 'Server error',
    }
  }
}
