import * as users from '@/store/modules/users.js'
import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        modules: {
            users
        }
    })
}
export default createStore
