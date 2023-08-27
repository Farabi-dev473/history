import solanaWeb3 from '@solana/web3.js'
import crypto from 'node:crypto'

// Example program address and seed value
const programAddress = new solanaWeb3.PublicKey('hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk');
const seed = '254';

// Derive the PDA using the program address and seed value
const programDerivedAddress = solanaWeb3.PublicKey.findProgramAddress([Buffer.from(seed)], programAddress);

// Convert the PDA to a string for use in other Solana transactions
const pdaAddressString = programDerivedAddress.toString();

// Optional: Hash the seed value to make it more secure
const seedHash = crypto.createHash('sha256').update(seed).digest();

// Derive the PDA using the hashed seed value
const hashedDerivedAddress = solanaWeb3.PublicKey.findProgramAddress([Buffer.from(seedHash)], programAddress);
const hashedPdaAddressString = hashedDerivedAddress.toString();
