"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromCurrency = getFromCurrency;
exports.getCurrencyTable = getCurrencyTable;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = require("node-html-parser");
const config_1 = require("./config");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
function getFromCurrency(currency) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield axios_1.default
                .get(config_1.CURRENCIES_SRC, { httpsAgent: config_1.REQ_AGENT })
                .then(({ data }) => { var _a; return (0, utils_1.toFloat)((_a = (0, node_html_parser_1.parse)(data).getElementById(currency)) === null || _a === void 0 ? void 0 : _a.innerText); });
        }
        catch (except) {
            console.error(except);
            return Number.NaN;
        }
    });
}
function getCurrencyTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const currencyTable = {};
        try {
            return yield axios_1.default
                .get(config_1.CURRENCIES_SRC, { httpsAgent: config_1.REQ_AGENT })
                .then(({ data }) => {
                var _a;
                const docTree = (0, node_html_parser_1.parse)(data);
                for (const currency of Object.values(enums_1.Currencies)) {
                    currencyTable[currency] = (0, utils_1.toFloat)((_a = docTree.getElementById(currency)) === null || _a === void 0 ? void 0 : _a.innerText);
                }
                return currencyTable;
            });
        }
        catch (except) {
            console.error(except);
            for (const currency of Object.values(enums_1.Currencies)) {
                currencyTable[currency] = Number.NaN;
            }
            return currencyTable;
        }
    });
}
