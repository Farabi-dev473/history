import Store from "data-store";

const store = new Store({path: process.cwd() + '/src/db.json'});

export default store