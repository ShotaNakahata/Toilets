import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Toilet from './models/Toilet';
import User from './models/user';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('MongoDBに接続されました');
        insertToilets();
    })
    .catch((err: unknown) => {
        console.error('MongoDB接続エラー:', err);
    });

const insertToilets = async () => {
    const user = await User.findOne(); // 既存のユーザーを取得

    if (!user) {
        console.error('ユーザーが見つかりません');
        mongoose.connection.close();
        return;
    }

    const toiletsData = [
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

    try {
        await Toilet.insertMany(toiletsData);
        console.log('トイレデータが正常に挿入されました');
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('トイレデータの挿入エラー:', err.message);
        } else {
            console.error('未知のエラーが発生しました');
        }
    } finally {
        mongoose.connection.close();
    }
};
