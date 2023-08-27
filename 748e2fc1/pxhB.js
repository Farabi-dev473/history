import anchor  from '@project-serum/anchor'
import solana from'@solana/web3.js'


async function main() {
  const connection = new solana.Connection(solana.clusterApiUrl('mainnet-beta'))
  const keypair = anchor.web3.Keypair.generate()
  const wallet = new anchor.Wallet(keypair)
  const provider = new anchor.AnchorProvider(connection, wallet)
  const candyMachineV2Program = new solana.PublicKey('HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8');
  const idl = await anchor.Program.fetchIdl(candyMachineV2Program, provider);
  const program = new anchor.Program(idl, candyMachineV2Program, provider);
  const accounts = await program.account.candyMachine.fetch('9tQLFyLeaUwQ1PN2YDiFztZDxu4KT6px8CBYEapkshAD')
  console.log(accounts)
}
main()