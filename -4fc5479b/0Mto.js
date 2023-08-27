const url = 'http://nrqoodfm:pmymq2fepaw1@45.15.129.140:6260';

const regex = /^(?:http[s]?:\/\/)?([^:]+):([^@]+)@([^:/]+):(\d+)/;
const [, username, password, host, port] = regex.exec(url);

console.log('Username:', username);
console.log('Password:', password);
console.log('Host:', host);
console.log('Port:', port);
