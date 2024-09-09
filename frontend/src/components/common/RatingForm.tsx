// import React, { useState } from 'react';
// import { Input } from '../ui/input';
// import { Textarea } from '../ui/textarea';
// import { Button } from '../ui/button';

// interface RatingFormProps {
//     onSubmit: (data: { comment: string; rating: number }) => void;
// }

// const RatingForm: React.FC<RatingFormProps> = ({ onSubmit }) => {
//     const [newComment, setNewComment] = useState<string>('');
//     const [newRating, setNewRating] = useState<number>(1);

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         onSubmit({ comment: newComment, rating: newRating });
//         setNewComment('');
//         setNewRating(1);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//                 <label className="block text-xl font-medium text-white mt-4">Rating:</label>
//                 <Input
//                     type="number"
//                     min="1"
//                     max="5"
//                     value={newRating}
//                     onChange={(e) => setNewRating(Number(e.target.value))}
//                     className="w-full mt-1"
//                 />
//             </div>
//             <div>
//                 <label className="block text-xl font-medium text-white">Comment:</label>
//                 <Textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     className="w-full mt-1"
//                 />
//             </div>
//             <Button type="submit" className=" flex justify-center w-fullmax-w-xs mx-auto text-2xlw-full border border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300 ">
//             Submit
//             </Button>
//         </form>
//     );
// };

// export default RatingForm;


import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface RatingFormProps {
    onSubmit: (data: { comment: string; rating: number }) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ onSubmit }) => {
    const [newComment, setNewComment] = useState<string>('');
    const [newRating, setNewRating] = useState<number>(1);  // デフォルトは1に設定

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ comment: newComment, rating: newRating });
        setNewComment('');
        setNewRating(1);  // フォーム送信後、初期値に戻す
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* スライダーを使ったRating選択 */}
            <div>
                <label className="block text-xl font-medium text-white mt-4">Rating: {newRating}</label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-white mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>

            {/* コメント入力欄 */}
            <div>
                <label className="block text-xl font-medium text-white">Comment:</label>
                <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full mt-1"
                />
            </div>

            {/* 送信ボタン */}
            <Button
                type="submit"
                className="flex justify-center w-full max-w-xs mx-auto text-2xl  border border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300"
            >
                Submit
            </Button>
        </form>
    );
};

export default RatingForm;
