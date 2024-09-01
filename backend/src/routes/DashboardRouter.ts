// src/routes/DashboardRouter.ts
import express,{Request,Response} from "express"
import UserModel from "../../src/models/user"
import Toilet from "../../src/models/Toilet"


const router = express.Router();

//合計user数を取得
router.get("/user-count",async(req:Request ,res:Response)=>{
    try{
        const count = await UserModel.countDocuments();
        res.status(200).send({count});
    }catch(error){
        console.error('Error fetching user count', error);
        res.status(500).send({message: 'ユーザー数の取得に失敗しました。'});
    }
});

//合計トイレ数を取得
router.get("/toilet-count",async(req:Request ,res:Response)=>{
    try{
        const count = await Toilet.countDocuments();
        res.status(200).send({count});
    }catch(error){
        console.error('Error fetching toilet count', error);
        res.status(500).send({message: 'トイレ数の取得に失敗しました。'});
    }
});

// Universalトイレの数を取得
router.get("/universal-toilet-count", async (req: Request, res: Response) => {
    try {
        const count = await Toilet.countDocuments({ universal: true });
        res.status(200).send({ count });
    } catch (error) {
        console.error('Error fetching universal toilet count', error);
        res.status(500).send({ message: 'Universalトイレ数の取得に失敗しました。' });
    }
});

export default router;