import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../comun/comun';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

      case ActionTypes.ADD_COMENTARIO:
        action.payload.id = state.comentarios.length
        state.comentarios.push(action.payload)
        
        axios.put(baseUrl + 'comentarios/' +  action.payload.id + '.json', action.payload)
        .then(response => {
            window.location.assign('/');
        })
        return {...state, errMess: null, comentarios: state.comentarios};
  
    default:
      return state;
  }
};