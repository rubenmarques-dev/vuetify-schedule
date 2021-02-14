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
    update (id,body) {
        return Repository.put(`${resource}/${id}`,body)
    },
    delete (id) {
        return Repository.delete(`${resource}/${id}`)
    },
}
