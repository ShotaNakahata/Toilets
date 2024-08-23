import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface RatingFormProps {
    onSubmit: (data: { comment: string; rating: number }) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ onSubmit }) => {
    const [newComment, setNewComment] = useState<string>('');
    const [newRating, setNewRating] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ comment: newComment, rating: newRating });
        setNewComment('');
        setNewRating(1);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xl font-medium text-white mt-4">Rating:</label>
                <Input
                    type="number"
                    min="1"
                    max="5"
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full mt-1"
                />
            </div>
            <div>
                <label className="block text-xl font-medium text-white">Comment:</label>
                <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full mt-1"
                />
            </div>
            <Button type="submit" className=" flex justify-center w-fullmax-w-xs mx-auto text-2xlw-full border border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300 ">
            Submit
            </Button>
        </form>
    );
};

export default RatingForm;
