const server_link = 'https://discord.gg/cameopass';
const token = 'MTA2NDc4MDI0NTMyMTkxMjQzMQ.GSdd2G.NHJM2eJECJmom5H6BqGN0dvh_wgHLZYO9zWTQ0';

const server_id = server_link.split('/').pop();

const headers = new Headers();
headers.append("Authorization", `Bot ${token}`);

const options = {
    method: 'GET',
    headers: headers
};

fetch(`https://discord.com/api/guilds/${server_id}`, options)
    .then(response => response.json())
    .then(server => {
        const online_members = server.presences.length;
        const total_members = server.member_count;
        const ratio = (online_members / total_members) * 100;
        console.log(`Online members: ${online_members}`);
        console.log(`Total members: ${total_members}`);
        console.log(`Ratio: ${ratio}%`);
    })
    .catch(error => console.log(error));
