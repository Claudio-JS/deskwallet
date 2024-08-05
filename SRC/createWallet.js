
//npm init -y

//comando para instalar as dependecias
//npm install bip39 bip32@2.0.6 bitcoinjs-lib --save

//criar uma carteira SRC
//dentro da carteira cria o arquivo createWallet.js

//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet 

//derivacao de carteiras HD
const path = `m/49'/1'/0'/0`

//criando o mnmonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)


//criando uma conta -par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)


let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Gerada")
console.log("Endereco: ", btcAddress)
console.log("Chave Privada: ", node.toWIF())
console.log("Seed: ", mnemonic)



//senha btc748596