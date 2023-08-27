import Store from 'data-store'

const store = new Store({path: process.cwd() + '/db.json'})
export default store