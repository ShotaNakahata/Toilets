import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const ContactForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/contact/SendEmail`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ email, subject, message }),
            });
            if (response.ok) {
                setDialogTitle("Contact Submission Successful");
                setDialogMessage("Your message has been successfully sent. Thank you for contacting us.");
            } else {
                setDialogTitle("Submission Error");
                setDialogMessage("An error occurred while sending your message. Please try again.");
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setDialogTitle("Submission Error");
            setDialogMessage("An error occurred while sending your message. Please try again.");
        } finally {
            setDialogOpen(true);
        }
    };

    return (
        <div className="p-12 bg-background rounded-lg shadow-white max-w-lg mx-auto">
            <div className="text-center text-3xl font-bold mb-8 text-white">
                Send Us a Message
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-lg text-white"
                />

                <Input
                    type="text"
                    placeholder="Subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="text-lg text-white"
                />

                <Textarea
                    placeholder="Your message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="text-lg text-white"
                />

                <Button type="submit" className="text-lg p-3 text-white  border-2  border-white hover:bg-white hover:text-gray-800">Send Message</Button>
            </form>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
                        <DialogDescription className="text-lg">{dialogMessage}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setDialogOpen(false)} className="text-lg">Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactForm;
