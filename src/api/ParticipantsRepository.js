import Repository from './Repository'

const resource = '/api/participants'

export default {
    index (params) {
        return Repository.get(`${resource}`, { params })
    },
    store (body) {
        return Repository.post(`${resource}`,body)
    },
}
