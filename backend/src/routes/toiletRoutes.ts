// backend/src/routes/toiletRoutes.ts
import express, { Request, Response } from 'express';
import Toilet from '../models/Toilet';
import Comment from '../models/Comment';
import UserModel from '../models/user';
import nodeGeocoder from 'node-geocoder';
import { count } from 'console';


// Google Maps Geocoding APIの設定
const options = {
    provider: 'google' as const,
    apiKey: 'AIzaSyCJYCyY49yx71ktTJXSx8H0JucZeuY-WRc', // ここにGoogle APIキーを記述
};

const geocoder = nodeGeocoder(options);

const router = express.Router();

const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};

// トイレの登録ルート
router.post('/register', isAuthenticated, async (req: Request, res: Response) => {
    const { name, address, rating, universal, initialComment } = req.body;
    try {
        const geoData = await geocoder.geocode(address);
        if (!geoData || geoData.length === 0) {
            return res.status(400).send({ message: 'Invalid address' });
        }
        const { latitude, longitude, country } = geoData[0];

        const existingToilet = await Toilet.findOne({
            lat: latitude,
            lng: longitude,
        });
        if (existingToilet) {
            return res.status(400).send({ message: 'This location is already registered' });
        }

        const user = await UserModel.findById(req.session.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // コメントがない場合でも、評価を保存する
        const initialTotalRatingsCount = 1; // 最初の登録なので評価数は1
        const initialTotalRatingScore = rating; // 初期評価スコアはそのまま最初の評価
        const initialAverageRating = rating; // 初期評価は最初の評価に等しい

        const newToilet = new Toilet({
            name,
            address,
            rating,
            universal,
            lat: latitude,
            lng: longitude,
            country,
            totalRatingsCount: initialTotalRatingsCount,
            totalRatingScore: initialTotalRatingScore,
            averageRating: initialAverageRating,
            createdBy: user._id
        });
        await newToilet.save();

        if (initialComment) {
            const newComment = new Comment({
                user: user.username,
                comment: initialComment,
                rating,
                toilet: newToilet._id
            });
            await newComment.save();
        }
        res.status(201).send({ message: 'Toilet registered successfully', newToilet });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error occurred during toilet registration:", error.message);
            res.status(500).send({ message: 'Failed to register toilet', error: error.message });
        } else {
            console.error("Unknown error occurred during toilet registration", error);
            res.status(500).send({ message: 'Failed to register toilet due to an unknown error' });
        }
    }
});

// 全てのトイレ情報を取得するルート
router.get('/', async (req: Request, res: Response) => {
    try {
        const toilets = await Toilet.find();
        res.status(200).json(toilets);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch toilets', error });
    }
});


//国別トイレ情報の取得
router.get("/country-summary", async (req: Request, res: Response) => {
    try {
        const summary = await Toilet.aggregate([
            {
                $group: {
                    _id: "$country",
                    totalToilets: { $sum: 1 },
                    accessibleToilets: { $sum: { $cond: ["$universal", 1, 0] } }
                }
            }
        ]);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch country summary', error });
    }
});

//国別のrate割合を取得
router.get("/ratings/:country",async(req:Request,res:Response)=>{
    const {country} = req.params;

    try{
        const summary = await Toilet.aggregate([
            {
                $match:{country:country}
            },
            {
                $project:{
                    roundedRating:{$round:["$averageRating", 0]}
                }
            },
            {
                $group:{
                    _id:"$roundedRating", 
                    count:{$sum:1}
                }
            },
            {
                $sort:{_id:1}
            }
        ]);
        res.status(200).json(summary);
    }catch(error){
        res.status(500).send({ message: 'Failed to fetch ratings summary for country', error });
    }
});

//評価毎の集計
router.get("/ratings-summary", async (req: Request, res: Response) => {
    try {
        const summary = await Toilet.aggregate([
            {
                $project: {
                    roundedRating: { $round: "$averageRating" } 
                }
            },
            {
                $group: {
                    _id: "$roundedRating",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);

        res.status(200).json(summary);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch ratings summary', error });
    }
});


// 特定のトイレのdetail情報を表示するルート
router.post("/details", async (req: Request, res: Response) => {
    const { ids } = req.body;
    try {
        const toilets = await Toilet.find({ _id: { $in: ids } });
        res.status(200).json(toilets);
    } catch (error) {
        console.log("Error fetching toilet details:", error);
        res.status(500).send({ message: "Error fetching toilet details" });
    }
});

// 特定のトイレ情報を取得するルート
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const toilet = await Toilet.findById(req.params.id);
        const comments = await Comment.find({ toilet: req.params.id });

        if (!toilet) {
            return res.status(404).send({ message: 'Toilet not found' });
        }

        res.status(200).json({ toilet, comments });
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch toilet', error });
    }
});

// 特定のトイレ情報を削除するルート
router.delete("/:id", isAuthenticated, async (req: Request, response: Response) => {
    const userId = req.session.userId;
    const toiletId = req.params.id;

    try {
        console.log(`User ${userId} is attempting to delete toilet ${toiletId}`);
        const toilet = await Toilet.findById(toiletId);

        if (!toilet) {
            console.error(`Toilet with ID ${toiletId} not found`);
            return response.status(404).send({ message: 'Toilet not found' });
        }
        // トイレを投稿したユーザーと削除リクエストを送信したユーザーが一致するか確認
        if (toilet.createdBy.toString() !== userId) {
            console.warn(`User ${userId} is not authorized to delete toilet ${toiletId}`);
            return response.status(403).send({ message: 'You are not authorized to delete this toilet.' });
        }

        //トイレを消去
        await Toilet.findByIdAndDelete(toiletId);
        console.log(`Toilet ${toiletId} deleted successfully`);

        //トイレに関するコメントも消去
        const { deletedCount } = await Comment.deleteMany({ toilet: toiletId });
        console.log(`${deletedCount} comments related to toilet ${toiletId} were deleted`);

        //ユーザーのお気に入りリストからも削除
        const updateResult = await UserModel.updateMany(
            {},
            { $pull: { favorites: toiletId } }
        );
        console.log(`${updateResult.modifiedCount} users had toilet ${toiletId} removed from their favorites`);
        response.status(200).send({ message: 'Toilet deleted successfully' });
    } catch (error) {
        console.error('Error deleting toilet:', error);
        response.status(500).send({ message: 'Failed to delete toilet', error });
    }
});


// //：dev環境only------------------------------

//全てのトイレ情報を消去
router.delete('/deleteAll', async (req: Request, res: Response) => {
    try {
        // 消去するidを取得
        const toiletIds = await Toilet.find({}).select('_id').exec();
        const idsToDelete = toiletIds.map(Toilet => Toilet._id);

        // 全てのトイレ情報を消去
        const result = await Toilet.deleteMany({ _id: { $in: idsToDelete } });
        // 全ての関連コメントを消去
        await Comment.deleteMany({ toilet: { $in: idsToDelete } });

        // ユーザーのお気に入りからも削除されたトイレのIDを削除
        await UserModel.updateMany(
            {},
            { $pull: { favorites: { $in: idsToDelete } } }
        );
        res.status(200).send({ message: `${result.deletedCount} toilets deleted successfully` })
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete all toilets', error });
    }
});


export default router;
