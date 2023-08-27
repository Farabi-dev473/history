import Store from "data-store";
import {join} from 'node:path'

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})
const getMintAddress = (txId) => {

}