import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE:
            //If campsite.id is already included in favorites array, then return state with no changes.//
            if (state.includes(action.payload)){
                return state;
            //If campsite.id is NOT included in favorites array, then return state with changes using concat. (aka. make copy of array with new changes included without mutating the original array).//
            } //else//
            return state.concat(action.payload);
            
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(favorite => favorite !== action.payload);

        default: 
            return state;
    }
}
