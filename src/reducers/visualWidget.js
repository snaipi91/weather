/**
 * Created by Андрей on 23.05.2017.
 */

export default (state = [], action) => {
    return Object.assign(...state, {
        errors: {},
        collection: {}
    })
};