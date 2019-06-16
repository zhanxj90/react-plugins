/*
 * 封装redux中的createdStore函数
 * 内部有三个方法：
 * 1、dispatch
 * 2、getState
 * 3、subscribe
 *  
 * */

export const createStore = (reducer)=>{
    let eventList = [];
    let state;
    let getState = () => state;
    const initAction = {
        type:"@@redux/INIT"
    }

    let dispatche = (action=initAction) => {
        state = reducer(state,action)
        eventList.forEach(cb => {cb()})
    }

    let subscribe = (cb) => {
        eventList.push(cb)
    }
    dispatche()
    return {
        getState,
        dispatche,
        subscribe
    }
}



/**
 * 封装combinReducers
 * 
 * combinReducers({
 *  a,
 *  b
 * })
 * 
 * a,b == reducer
 * 
 * return (){}
 * 
 * store = (){}
 * 
 */
export const combinReducers = (obj) => {
    let newState = {};
    return (state,action)=>{
        for (key in obj) {
            newState[key] = obj[key](state[key],action)
        }
        return newState;
    }
}
