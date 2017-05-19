/**
 * Created by Андрей on 19.05.2017.
 */

export default (state = [], action) => {
    console.log(action);
    return Object.assign(...state, {
        city: {},
        temp: {},
        humidity: {}
    })
};