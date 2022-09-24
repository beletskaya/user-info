import {createStore} from 'vuex'
import instance from "../components/api/axios_instance";

export default createStore({
    state: {
        loginName: localStorage.getItem('data-login'),
        favoritesToDo: localStorage.getItem('data-favorites'),
        toDoList: null,
        info: null,
        filterStatus: 'all',
        filterUser: 'allUsers',
        textTitle: ''
    },
    getters: {
        filterList(state) {
            switch(state.filterStatus) {
                case 'all':
                    return state.toDoList;
                case 'completed':
                    return state.toDoList.filter(t => t.completed);
                case 'uncompleted':
                    return state.toDoList.filter(t => !t.completed);
                case 'favorites':
                    return state.toDoList.filter(t => t.favorites);
                default:
                    return state.toDoList
            }
        },
        filterUsers(state, getters) {
            if(state.filterUser !== 'allUsers'){
                return getters.filterList.filter(t => t.userId === state.filterUser)
            }
            return getters.filterList
        },
        filterInputTitle(state, getters) {
            if(state.textTitle.length) {
                return getters.filterUsers.filter(t => t.title.includes(state.textTitle))
            }
            return getters.filterUsers
        }
    },
    mutations: {
        CHANGE_LOCALSTORAGE_NAME(state, payload) {
            localStorage.setItem('data-login', JSON.stringify(payload))
            state.loginName = payload
        },
        GET_USER_INFO(state, payload) {
            if(state.loginName) {
                state.info =  payload.filter( (item) => item.name.replace(/[^A-Za-z]/g, '') === state.loginName.replace(/[^A-Za-z]/g, ''))
            }
        },
        GET_LIST(state, payload) {
            state.toDoList = payload
            if(state.favoritesToDo) {
                let arrFavorites = JSON.parse(state.favoritesToDo)
                state.toDoList = [...state.toDoList, ...arrFavorites]
            }
        },
        CHANGE_STATUS(state, payload) {
            state.filterStatus = payload
        },
        CHANGE_USER_ID(state, payload) {
            state.filterUser = payload
        },
        CHANGE_INPUT_TITLE(state, payload) {
            state.textTitle = payload
        },
        ADD_NEW_LIST(state, payload) {
            state.toDoList.push(payload)
        },
        ADD_FAVORITES_LOCALSTORAGE(state, payload) {
            if( !state.favoritesToDo ) {
                localStorage.setItem('data-favorites', JSON.stringify(payload))
                state.favoritesToDo = localStorage.getItem('data-favorites')
            } else {
                let currentFavorites = [JSON.parse(state.favoritesToDo)];
                currentFavorites.push(payload)
                localStorage.setItem('data-favorites', JSON.stringify(currentFavorites))
            }
        }
    },
    actions: {
        getUsers(context) {
            try {
                return instance({
                    url: '/users',
                    method: 'GET'
                }).then((data) => {
                    let result = data.data
                    context.commit('GET_USER_INFO',result)
                    return data.data
                })
            } catch (error) {
                console.error(error)
            }
        },
        getToDoList(context) {
            try {
                return instance({
                    url: '/todos',
                    method: 'GET'
                }).then((data) => {
                    context.commit('GET_LIST', data.data)
                })
            } catch (error) {
                console.error(error)
            }
        },
        postList(context, item) {
            try {
                return instance({
                    url: '/todos',
                    method: 'POST',
                    data: JSON.stringify(item)
                }).then((response) => {
                    let result = response.data;
                    let objKeys = Object.keys(result)
                    let objValue = JSON.parse(objKeys[0])

                    let objData = {
                        'id' : result.id,
                        'userId' : objValue.userId,
                        'title' : objValue.title,
                        'favorites' : true,
                        'completed' : false
                    }
                    context.commit('ADD_NEW_LIST', objData);
                    context.commit('ADD_FAVORITES_LOCALSTORAGE', objData);
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
})
