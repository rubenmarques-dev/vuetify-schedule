import Repository from './Repository'

const resource = '/api/meetings'

export default {
    index (params) {
        return Repository.get(`${resource}`, { params })
    },
    show (id,params) {
        return Repository.get(`${resource}`, { params })
    },
    store (body) {
        return Repository.post(`${resource}`,body)
    },
}
