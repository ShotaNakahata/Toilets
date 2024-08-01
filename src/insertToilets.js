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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var Toilet_1 = require("./models/Toilet");
var user_1 = require("./models/user");
dotenv.config();
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(function () {
    console.log('MongoDBに接続されました');
    insertToilets();
})
    .catch(function (err) {
    console.error('MongoDB接続エラー:', err);
});
var insertToilets = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, toiletsData, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne()];
            case 1:
                user = _a.sent();
                if (!user) {
                    console.error('ユーザーが見つかりません');
                    mongoose_1.default.connection.close();
                    return [2 /*return*/];
                }
                toiletsData = [
                    {
                        id: 1,
                        name: "梅田スカイビルトイレ",
                        address: "大阪府大阪市北区大深町1-1",
                        rating: 5,
                        comment: "最上階にある絶景を眺めながら利用できる。",
                        universal: false,
                    },
                    {
                        id: 2,
                        name: "グランフロント大阪トイレ",
                        address: "大阪府大阪市北区大深町3-1",
                        rating: 4,
                        comment: "清潔で広々としており、デザインも洗練されている。",
                        universal: true,
                    },
                    {
                        id: 3,
                        name: "大阪駅中央トイレ",
                        address: "大阪府大阪市北区梅田3-1-1",
                        rating: 4,
                        comment: "アクセスが良く、利用しやすい。混雑時は少し待つことも。",
                        universal: false,
                    },
                    {
                        id: 4,
                        name: "ヨドバシ梅田トイレ",
                        address: "大阪府大阪市北区大深町1-1 ヨドバシ梅田タワー",
                        rating: 3,
                        comment: "買い物客で賑わっているが、掃除が行き届いている。",
                        universal: true
                    },
                    {
                        id: 5,
                        name: "梅田地下街トイレ",
                        address: "大阪府大阪市北区梅田地下",
                        rating: 3,
                        comment: "便利だが、ピークタイムは混雑することも。",
                        universal: true,
                    },
                    {
                        id: 6,
                        name: "阪急梅田駅トイレ",
                        address: "大阪府大阪市北区角田町8-47",
                        rating: 4,
                        comment: "駅内にあり、清潔感がある。",
                        universal: false,
                    },
                    {
                        id: 7,
                        name: "梅田芸術劇場トイレ",
                        address: "大阪府大阪市北区茶屋町19-1",
                        rating: 5,
                        comment: "文化施設内にあるため、非常に綺麗。",
                        universal: true,
                    },
                    {
                        id: 8,
                        name: "NU茶屋町トイレ",
                        address: "大阪府大阪市北区茶屋町10-12",
                        rating: 4,
                        comment: "ショッピングモール内にあるため、快適に利用可能。",
                        universal: false,
                    },
                    {
                        id: 9,
                        name: "大阪梅田ツインタワーズ・サウストイレ",
                        address: "大阪府大阪市北区中崎西2-1-2",
                        rating: 4,
                        comment: "ビジネス街に位置しており、清潔で静か。",
                        universal: true,
                    },
                    {
                        id: 10,
                        name: "梅田ロフトトイレ",
                        address: "大阪府大阪市北区茶屋町16-7",
                        rating: 3,
                        comment: "ショッピング中に便利な場所にあるが、土日は混む。",
                        universal: false,
                    },
                ];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, Toilet_1.default.insertMany(toiletsData)];
            case 3:
                _a.sent();
                console.log('トイレデータが正常に挿入されました');
                return [3 /*break*/, 6];
            case 4:
                err_1 = _a.sent();
                if (err_1 instanceof Error) {
                    console.error('トイレデータの挿入エラー:', err_1.message);
                }
                else {
                    console.error('未知のエラーが発生しました');
                }
                return [3 /*break*/, 6];
            case 5:
                mongoose_1.default.connection.close();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
