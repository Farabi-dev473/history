"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseProgram_instances, _BaseProgram_getInitialSearchData, _BaseProgram_getTransactionType, _BaseProgram_getProgramDataFromAccounts, _BaseProgram_getTransactionPrice, _BaseProgram_getSeller, _BaseProgram_getOwner, _BaseProgram_handleMint, _BaseProgram_handleSale, _BaseProgram_handleList, _BaseProgram_handleDelist, _BaseProgram_handleTransfer, _BaseProgram_handleTxType;
Object.defineProperty(exports, "__esModule", { value: true });
var borsh_1 = require("borsh");
var bs58_1 = require("bs58");
var programs_js_1 = require("./src/programs.js");
var constants_js_1 = require("./src/constants.js");
var node_fs_1 = require("node:fs");
var web3_js_1 = require("@solana/web3.js");
var Primitive = /** @class */ (function () {
    function Primitive(args) {
        this.buyerPrice = args.buyerPrice;
    }
    return Primitive;
}());
var BaseProgram = /** @class */ (function () {
    function BaseProgram(transaction) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        _BaseProgram_instances.add(this);
        this.transaction = transaction;
        this.logMessageJson = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.meta) === null || _a === void 0 ? void 0 : _a.logMessages;
        this.transactionType = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getTransactionType).call(this);
        this.programData = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getProgramDataFromAccounts).call(this);
        this.transactionId = (_b = transaction === null || transaction === void 0 ? void 0 : transaction.transaction) === null || _b === void 0 ? void 0 : _b.signatures[0];
        // default data
        this.seller = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getSeller).call(this);
        this.owner = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getOwner).call(this);
        this.buyer = (_h = (_g = (_f = (_e = (_d = (_c = transaction === null || transaction === void 0 ? void 0 : transaction.meta) === null || _c === void 0 ? void 0 : _c.innerInstructions) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.instructions.find(function (e) { var _a, _b; return (_b = (_a = e === null || e === void 0 ? void 0 : e.parsed) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.source; })) === null || _f === void 0 ? void 0 : _f.parsed) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.source;
        this.amount =
            ((_q = (_p = (_o = (_m = (_l = (_k = (_j = transaction === null || transaction === void 0 ? void 0 : transaction.meta) === null || _j === void 0 ? void 0 : _j.innerInstructions) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.instructions) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.parsed) === null || _p === void 0 ? void 0 : _p.info) === null || _q === void 0 ? void 0 : _q.lamports) / 1000000000;
        this.mintAddress = (_t = (_s = (_r = transaction === null || transaction === void 0 ? void 0 : transaction.meta) === null || _r === void 0 ? void 0 : _r.preTokenBalances) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.mint;
    }
    Object.defineProperty(BaseProgram.prototype, "parsedData", {
        get: function () {
            var _a;
            return {
                slug: (_a = this.programData) === null || _a === void 0 ? void 0 : _a.slug,
                txType: this.transactionType,
                seller: this.seller,
                owner: this.owner,
                buyer: this.buyer,
                amount: this.amount,
                mintAddress: this.mintAddress,
                txId: this.transactionId,
            };
        },
        enumerable: false,
        configurable: true
    });
    BaseProgram.prototype.isProgram = function (targetSlug) {
        var _a;
        return ((_a = this.programData) === null || _a === void 0 ? void 0 : _a.slug.toLowerCase()) === targetSlug.toLowerCase();
    };
    BaseProgram.prototype.parse = function () {
        var _a, _b, _c;
        if (!this.transaction ||
            ((_a = this.transaction) === null || _a === void 0 ? void 0 : _a.err) ||
            ((_c = (_b = this.transaction) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.err))
            return null;
        __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_handleTxType).call(this);
    };
    return BaseProgram;
}());
_BaseProgram_instances = new WeakSet(), _BaseProgram_getInitialSearchData = function _BaseProgram_getInitialSearchData() {
    var _a, _b, _c, _d;
    var logMessages = (_a = this.logMessageJson) === null || _a === void 0 ? void 0 : _a.join('\n');
    var instructions = new Set((_d = (_c = (_b = this.transaction) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.innerInstructions) === null || _d === void 0 ? void 0 : _d.map(function (inner) {
        var _a;
        return (_a = inner === null || inner === void 0 ? void 0 : inner.instructions) === null || _a === void 0 ? void 0 : _a.map(function (instruction) { var _a, _b; return (_b = (_a = instruction === null || instruction === void 0 ? void 0 : instruction.parsed) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.trim(); });
    }).flat());
    return {
        logMessages: logMessages,
        instructions: instructions,
    };
}, _BaseProgram_getTransactionType = function _BaseProgram_getTransactionType() {
    var _a = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getInitialSearchData).call(this), instructions = _a.instructions, logMessages = _a.logMessages;
    var isMint = (instructions === null || instructions === void 0 ? void 0 : instructions.has('initializeMint')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: MintNft')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: InitializeMint'));
    if (isMint)
        return 'Mint';
    var isList = (((logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: Sell')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: List item'))) &&
        !(logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: ExecuteSale'))) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Init instruction')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: DepositNftToPair')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: SellNftToLiquidityPair')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: TokenList')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: DepositNft'));
    if (isList)
        return 'List';
    var isSale = ((instructions === null || instructions === void 0 ? void 0 : instructions.has('createAccount')) &&
        (instructions === null || instructions === void 0 ? void 0 : instructions.has('transfer')) &&
        (instructions === null || instructions === void 0 ? void 0 : instructions.has('closeAccount')) &&
        !(logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: Sell'))) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: ExecuteSale')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Buy instruction')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: Buy')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: BuyNftFromPair'));
    if (isSale)
        return 'Sale';
    var isUpdateList = logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: Update listing');
    // NOTE: return this as List before final data returning to the client
    if (isUpdateList)
        return 'UpdateList';
    var isDelist = (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: Cancel')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: CancelSell')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Sale cancelled by seller')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: Cancel listing')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Delist instruction')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Program log: Instruction: WithdrawNftFromPair'));
    if (isDelist)
        return 'Delist';
    var isTransfer = 
    // https://solana.fm/tx/65d5DnRjE9VHd1YHqXjueXE3r2BfKi1cbTfe2bmDrBZrrcVHcL3a6ckRLqZSfS4isAzXZzYXK2YEUxSu7zTuFrrU?cluster=mainnet-qn1
    (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: TransferChecked')) ||
        (logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: Transfer'));
    if (isTransfer)
        return 'Transfer';
    var isBurn = logMessages === null || logMessages === void 0 ? void 0 : logMessages.includes('Instruction: Burn');
    if (isBurn)
        return 'Burn';
}, _BaseProgram_getProgramDataFromAccounts = function _BaseProgram_getProgramDataFromAccounts() {
    var _a, _b, _c, _d;
    var accounts = new Set((_d = (_c = (_b = (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.transaction) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.accountKeys) === null || _d === void 0 ? void 0 : _d.map(function (e) { return e.pubkey; }));
    if (accounts.has(constants_js_1.PROGRAM_IDS.MAGICEDEN_V2)) {
        return {
            slug: 'MagicEdenV2',
            programId: constants_js_1.PROGRAM_IDS.MAGICEDEN_V2,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.MAGICEDEN_V2],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.CORALCUBE)) {
        return {
            slug: 'CoralCube',
            programId: constants_js_1.PROGRAM_IDS.AUCTIONHOUSE,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.AUCTIONHOUSE],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.CORALCUBE_AUCTIONHOUSE_2)) {
        return {
            slug: 'CoralCube',
            programId: constants_js_1.PROGRAM_IDS.CORALCUBE_AUCTIONHOUSE_2,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.CORALCUBE_AUCTIONHOUSE_2],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.OPENSEA)) {
        return {
            slug: 'OpenSea',
            programId: constants_js_1.PROGRAM_IDS.AUCTIONHOUSE,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.AUCTIONHOUSE],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.SOLANART)) {
        return {
            slug: 'Solanart',
            programId: constants_js_1.PROGRAM_IDS.SOLANART,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.SOLANART],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.YAWWW)) {
        return {
            slug: 'yawww',
            programId: constants_js_1.PROGRAM_IDS.YAWWW,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.YAWWW],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.HYPERSPACE)) {
        return {
            slug: 'HyperSpace',
            programId: constants_js_1.PROGRAM_IDS.HYPERSPACE,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.HYPERSPACE],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.SOLSEA)) {
        return {
            slug: 'solsea',
            programId: constants_js_1.PROGRAM_IDS.SOLSEA,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.SOLSEA],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.SOLSEA_2)) {
        return {
            slug: 'solsea',
            programId: constants_js_1.PROGRAM_IDS.SOLSEA_2,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.SOLSEA_2],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.HADESWAP)) {
        return {
            slug: 'hadeswap',
            programId: constants_js_1.PROGRAM_IDS.HADESWAP,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.HADESWAP],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.EXCHANGE_ART)) {
        return {
            slug: 'exchange-art',
            programId: constants_js_1.PROGRAM_IDS.EXCHANGE_ART,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.EXCHANGE_ART],
        };
    }
    if (accounts.has(constants_js_1.PROGRAM_IDS.TENSOR)) {
        return {
            slug: 'tensor',
            programId: constants_js_1.PROGRAM_IDS.TENSOR,
            programData: programs_js_1.default[constants_js_1.PROGRAM_IDS.TENSOR],
        };
    }
}, _BaseProgram_getTransactionPrice = function _BaseProgram_getTransactionPrice() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var programParser = (_b = (_a = this.programData) === null || _a === void 0 ? void 0 : _a.programData) === null || _b === void 0 ? void 0 : _b.actions[this.transactionType];
    var txData = this.transaction.transaction.message.instructions
        .filter(function (e) { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.accounts) === null || _a === void 0 ? void 0 : _a.length) && e.data && e.programId; })
        .sort(function (a, b) {
        var _a, _b, _c;
        var aLength = (_a = a === null || a === void 0 ? void 0 : a.accounts) === null || _a === void 0 ? void 0 : _a.length;
        var bLength = (_b = b === null || b === void 0 ? void 0 : b.accounts) === null || _b === void 0 ? void 0 : _b.length;
        var slug = (_c = _this.programData) === null || _c === void 0 ? void 0 : _c.slug.toLowerCase();
        if (slug === 'opensea' ||
            slug === 'coralcube' ||
            slug === 'exchange-art')
            return bLength - aLength;
        return aLength - bLength;
    })[0];
    var txId = this.transaction.transaction.signatures[0].substring(0, 16);
    var buyerPrice = null;
    if (((_c = this.programData) === null || _c === void 0 ? void 0 : _c.slug) === 'hadeswap' &&
        this.transactionType === 'List') {
        buyerPrice =
            ((_g = (_f = (_e = (_d = this.transaction) === null || _d === void 0 ? void 0 : _d.meta) === null || _e === void 0 ? void 0 : _e.innerInstructions[0]) === null || _f === void 0 ? void 0 : _f.instructions) === null || _g === void 0 ? void 0 : _g.reduce(function (pre, cur) {
                var _a, _b, _c;
                if (((_a = cur === null || cur === void 0 ? void 0 : cur.parsed) === null || _a === void 0 ? void 0 : _a.type) === 'transfer') {
                    return (((_c = (_b = cur === null || cur === void 0 ? void 0 : cur.parsed) === null || _b === void 0 ? void 0 : _b.info) === null || _c === void 0 ? void 0 : _c.lamports) || 0) + pre;
                }
                return pre;
            }, 0)) || 0;
    }
    else if (((_h = this.programData) === null || _h === void 0 ? void 0 : _h.slug) === 'exchange-art' &&
        this.transactionType === 'Sale') {
        buyerPrice =
            ((_m = (_l = (_k = (_j = this.transaction) === null || _j === void 0 ? void 0 : _j.meta) === null || _k === void 0 ? void 0 : _k.innerInstructions[1]) === null || _l === void 0 ? void 0 : _l.instructions) === null || _m === void 0 ? void 0 : _m.reduce(function (pre, cur) {
                var _a, _b, _c;
                if (((_a = cur === null || cur === void 0 ? void 0 : cur.parsed) === null || _a === void 0 ? void 0 : _a.type) === 'transfer') {
                    return (((_c = (_b = cur === null || cur === void 0 ? void 0 : cur.parsed) === null || _b === void 0 ? void 0 : _b.info) === null || _c === void 0 ? void 0 : _c.lamports) || 0) + pre;
                }
                return pre;
            }, 0)) || 0;
    }
    else {
        if (this.mintAddress && (programParser === null || programParser === void 0 ? void 0 : programParser.schemaFields)) {
            var schema = new Map([
                [
                    Primitive,
                    {
                        kind: 'struct',
                        fields: programParser.schemaFields,
                    },
                ],
            ]);
            try {
                buyerPrice = (0, borsh_1.deserializeUnchecked)(schema, Primitive, Buffer.from(bs58_1.default.decode(txData.data))).buyerPrice.toNumber();
            }
            catch (e) {
                // console.log(e);
                console.log(txId, this.transactionType, txData);
            }
        }
    }
    return {
        txId: txId,
        slug: (_o = this.programData) === null || _o === void 0 ? void 0 : _o.slug,
        txType: this.transactionType,
        mintAddress: this.mintAddress,
        data: txData.data,
        price: buyerPrice / 1000000000,
    };
}, _BaseProgram_getSeller = function _BaseProgram_getSeller() {
    var _a, _b, _c, _d, _e;
    var lastInstruction = (_e = (_d = (_c = (_b = (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions) === null || _c === void 0 ? void 0 : _c.at(-1)) === null || _d === void 0 ? void 0 : _d.instructions) === null || _e === void 0 ? void 0 : _e.at(-1);
    return (lastInstruction &&
        lastInstruction.program === 'spl-token' &&
        lastInstruction.parsed.type === 'closeAccount' &&
        lastInstruction.parsed.info.destination);
}, _BaseProgram_getOwner = function _BaseProgram_getOwner() {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.postTokenBalances) === null || _c === void 0 ? void 0 : _c.find(function (account) { var _a; return ((_a = account === null || account === void 0 ? void 0 : account.uiTokenAmount) === null || _a === void 0 ? void 0 : _a.amount) === '1'; })) === null || _d === void 0 ? void 0 : _d.owner;
}, _BaseProgram_handleMint = function _BaseProgram_handleMint() {
    var instruction;
    var inner = this.transaction.meta.innerInstructions.find(function (innerIns) {
        return innerIns.instructions.some(function (ins) { return ins.parsed; });
    });
    instruction = inner === null || inner === void 0 ? void 0 : inner.instructions.find(function (ins) { var _a, _b; return ((_b = (_a = ins === null || ins === void 0 ? void 0 : ins.parsed) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.authorityType) === 'mintTokens'; });
    if (!instruction)
        instruction = this.transaction.transaction.message.instructions.find(function (ins) { var _a; return ((_a = ins === null || ins === void 0 ? void 0 : ins.parsed) === null || _a === void 0 ? void 0 : _a.type) === 'initializeMint'; });
    if (instruction) {
        this.mintAddress = instruction.parsed.info.mint;
    }
}, _BaseProgram_handleSale = function _BaseProgram_handleSale() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    if (this.isProgram('yawww')) {
        var mostCoinReceiver = (_e = (_d = (_c = (_b = (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.instructions.filter(function (instruction) {
            var _a;
            return ((_a = instruction === null || instruction === void 0 ? void 0 : instruction.parsed) === null || _a === void 0 ? void 0 : _a.type) === 'transfer' &&
                (instruction === null || instruction === void 0 ? void 0 : instruction.programId) === '11111111111111111111111111111111';
        }).sort(function (a, b) {
            var _a, _b, _c, _d, _e, _f;
            return ((_c = (_b = (_a = b === null || b === void 0 ? void 0 : b.instruction) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.info) === null || _c === void 0 ? void 0 : _c.lamports) -
                ((_f = (_e = (_d = a === null || a === void 0 ? void 0 : a.instruction) === null || _d === void 0 ? void 0 : _d.parsed) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.lamports);
        })) === null || _e === void 0 ? void 0 : _e[0];
        this.seller = (_g = (_f = mostCoinReceiver === null || mostCoinReceiver === void 0 ? void 0 : mostCoinReceiver.parsed) === null || _f === void 0 ? void 0 : _f.info) === null || _g === void 0 ? void 0 : _g.destination;
    }
    // https://solscan.io/tx/md3WkiawtZ37o3SXzbCH4sqX4KYRgob5RsndHKrMaA3RkLb9ngpxzKue2jFWwmUqDsVQJycj5mPUk9336FVfJkw
    // event: sale, amount: 19, seller: BWhQ6EiFUSz3tvh4e4S2BrSLtbvzgdBpPNbza2ra3zc6, buyer: 73NKzhW8RMimaRYZaySeFMWZKiaXU81PMdU8FN6YLdw5
    if (this.isProgram('hyperspace')) {
        var transferRaw = (_o = (_m = (_l = (_k = (_j = (_h = this.transaction) === null || _h === void 0 ? void 0 : _h.meta) === null || _j === void 0 ? void 0 : _j.innerInstructions) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.instructions) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.parsed;
        if ((transferRaw === null || transferRaw === void 0 ? void 0 : transferRaw.type) === 'transfer' && ((_p = transferRaw === null || transferRaw === void 0 ? void 0 : transferRaw.info) === null || _p === void 0 ? void 0 : _p.lamports)) {
            this.amount = ((_q = transferRaw === null || transferRaw === void 0 ? void 0 : transferRaw.info) === null || _q === void 0 ? void 0 : _q.lamports) / 1000000000;
            this.seller = (_r = transferRaw === null || transferRaw === void 0 ? void 0 : transferRaw.info) === null || _r === void 0 ? void 0 : _r.destination;
            this.buyer = (_s = transferRaw === null || transferRaw === void 0 ? void 0 : transferRaw.info) === null || _s === void 0 ? void 0 : _s.source;
            return;
        }
    }
    if (this.isProgram('hyperspace') ||
        this.isProgram('coralcube') ||
        this.isProgram('opensea')) {
        this.seller = (_t = this.transaction.meta.postTokenBalances.find(function (account) { return account.uiTokenAmount.amount === '0'; })) === null || _t === void 0 ? void 0 : _t.owner;
    }
    if (this.isProgram('hadeswap')) {
        this.seller =
            (_w = (_v = (_u = this.transaction) === null || _u === void 0 ? void 0 : _u.transaction.message) === null || _v === void 0 ? void 0 : _v.instructions[0]) === null || _w === void 0 ? void 0 : _w.accounts[1];
    }
    var amountRaw = (_y = (_x = this.logMessageJson
        .find(function (e) { return e.includes('"price"'); })) === null || _x === void 0 ? void 0 : _x.split('log:')) === null || _y === void 0 ? void 0 : _y.at(-1);
    if (amountRaw) {
        this.amount = amountRaw && ((_z = JSON.parse(amountRaw)) === null || _z === void 0 ? void 0 : _z.price) / 1000000000;
    }
    else {
        this.amount = (_0 = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getTransactionPrice).call(this)) === null || _0 === void 0 ? void 0 : _0.price;
    }
}, _BaseProgram_handleList = function _BaseProgram_handleList() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    var amountRaw = (_b = (_a = this.logMessageJson
        .find(function (e) { return e.includes('"price"'); })) === null || _a === void 0 ? void 0 : _a.split('log:')) === null || _b === void 0 ? void 0 : _b.at(-1);
    if (amountRaw) {
        this.amount = amountRaw && ((_c = JSON.parse(amountRaw)) === null || _c === void 0 ? void 0 : _c.price) / 1000000000;
    }
    else {
        this.amount = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getTransactionPrice).call(this).price;
    }
    if (this.isProgram('solanart') ||
        this.isProgram('yawww') ||
        this.isProgram('exchange-art')) {
        this.seller = (_d = this.transaction.meta.postTokenBalances.find(function (e) { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.uiTokenAmount) === null || _a === void 0 ? void 0 : _a.amount) === '0'; })) === null || _d === void 0 ? void 0 : _d.owner;
    }
    if (this.isProgram('coralcube') ||
        this.isProgram('opensea') ||
        this.isProgram('hyperspace')) {
        this.seller =
            (_k = (_j = (_h = (_g = (_f = (_e = this.transaction) === null || _e === void 0 ? void 0 : _e.meta) === null || _f === void 0 ? void 0 : _f.innerInstructions) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.instructions[0]) === null || _j === void 0 ? void 0 : _j.parsed) === null || _k === void 0 ? void 0 : _k.info.owner;
    }
    if (!this.seller) {
        this.seller =
            (_r = (_q = (_p = (_o = (_m = (_l = this.transaction) === null || _l === void 0 ? void 0 : _l.meta) === null || _m === void 0 ? void 0 : _m.innerInstructions) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.instructions[0]) === null || _q === void 0 ? void 0 : _q.parsed) === null || _r === void 0 ? void 0 : _r.info.source;
    }
    if (!this.seller) {
        // probably we missed the data from innerInstructions, let's find it from the first account
        this.seller =
            (_x = (_w = (_v = (_u = (_t = (_s = this.transaction) === null || _s === void 0 ? void 0 : _s.transaction) === null || _t === void 0 ? void 0 : _t.message) === null || _u === void 0 ? void 0 : _u.instructions) === null || _v === void 0 ? void 0 : _v[0]) === null || _w === void 0 ? void 0 : _w.accounts) === null || _x === void 0 ? void 0 : _x[0];
    }
    this.buyer = null;
}, _BaseProgram_handleDelist = function _BaseProgram_handleDelist() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    this.amount = (_a = __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_getTransactionPrice).call(this)) === null || _a === void 0 ? void 0 : _a.price;
    if (!this.seller) {
        this.seller =
            ((_h = (_g = (_f = (_e = (_d = (_c = (_b = this.transaction) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.innerInstructions) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.instructions[0]) === null || _f === void 0 ? void 0 : _f.parsed) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.newAuthority) ||
                ((_m = (_l = (_k = (_j = this.transaction) === null || _j === void 0 ? void 0 : _j.meta) === null || _k === void 0 ? void 0 : _k.preTokenBalances) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.owner);
    }
    if (!this.seller && this.isProgram('MagicEdenV2')) {
        this.seller = (_t = (_s = (_r = (_q = (_p = (_o = this.transaction) === null || _o === void 0 ? void 0 : _o.transaction) === null || _p === void 0 ? void 0 : _p.message) === null || _q === void 0 ? void 0 : _q.instructions) === null || _r === void 0 ? void 0 : _r.find(function (instruction) {
            return instruction.programId ===
                'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K';
        })) === null || _s === void 0 ? void 0 : _s.accounts) === null || _t === void 0 ? void 0 : _t[0];
    }
    if (!this.seller)
        console.log(['Error seller on delist', this.transactionId]);
    this.buyer = null;
}, _BaseProgram_handleTransfer = function _BaseProgram_handleTransfer() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    this.seller = (_d = (_c = (_b = (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.preTokenBalances) === null || _c === void 0 ? void 0 : _c.find(function (account) { var _a; return ((_a = account === null || account === void 0 ? void 0 : account.uiTokenAmount) === null || _a === void 0 ? void 0 : _a.amount) === '1'; })) === null || _d === void 0 ? void 0 : _d.owner;
    this.buyer = (_h = (_g = (_f = (_e = this.transaction) === null || _e === void 0 ? void 0 : _e.meta) === null || _f === void 0 ? void 0 : _f.postTokenBalances) === null || _g === void 0 ? void 0 : _g.find(function (account) { var _a; return ((_a = account === null || account === void 0 ? void 0 : account.uiTokenAmount) === null || _a === void 0 ? void 0 : _a.amount) === '1'; })) === null || _h === void 0 ? void 0 : _h.owner;
}, _BaseProgram_handleTxType = function _BaseProgram_handleTxType() {
    // get different type of transactions
    // handle based on the types
    switch (this.transactionType) {
        case 'Mint':
            __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_handleMint).call(this);
            break;
        case 'Sale':
            __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_handleSale).call(this);
            break;
        case 'List':
            __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_handleList).call(this);
            break;
        case 'Delist':
            __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_handleDelist).call(this);
            break;
        case 'Transfer':
            __classPrivateFieldGet(this, _BaseProgram_instances, "m", _BaseProgram_handleTransfer).call(this);
    }
};
// getProgramId
// matchPrograms
// switch programs
// solanart extends baseprogram
// coralcube extends auctionhouse extends baseprogram
// opensea extends auctionhouse extends baseprogram
// yawww extends baseprogram
// magiceden extends baseprogram
// default baseprogram
exports.default = BaseProgram;
var getTransactionIds = function () {
    return Object.keys(JSON.parse(node_fs_1.default.readFileSync('./src/db.json', 'utf8')));
};
function singleTransactionParser(transaction) {
    try {
        var txClone = JSON.parse(JSON.stringify(transaction));
        var baseProgram = new BaseProgram(txClone);
        baseProgram.parse();
        return baseProgram.parsedData;
    }
    catch (e) {
        console.log([transaction.transaction.signatures[0], e]);
    }
}
var getTransaction = function (txId) { return __awaiter(void 0, void 0, void 0, function () {
    var connection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connection = new web3_js_1.default.Connection(web3_js_1.default.clusterApiUrl("mainnet-beta"));
                return [4 /*yield*/, connection.getParsedTransaction(txId, { maxSupportedTransactionVersion: 0 })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var main = function () {
    getTransactionIds().forEach(function (txId) { return __awaiter(void 0, void 0, void 0, function () {
        var tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTransaction(txId)];
                case 1:
                    tx = _a.sent();
                    singleTransactionParser(tx);
                    return [2 /*return*/];
            }
        });
    }); });
};
main();
