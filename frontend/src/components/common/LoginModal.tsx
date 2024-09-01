import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: (email: string, password: string) => void;
    onCreateAccount: (username: string, email: string, password: string, confirmPassword: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin, onCreateAccount }) => {
    const [tabIndex, setTabIndex] = useState<string>('0');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleLogin = async () => {
        await onLogin(email, password);
        onClose();
    };

    const handleCreateAccount = async () => {
        await onCreateAccount(username, email, password, confirmPassword);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={`border-2 ${tabIndex === '0' ? 'bg-gray-100' : 'bg-gray-300'} rounded-lg shadow-lg`}> {/* 背景色を条件に応じて切り替え */}
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-black">
                        {tabIndex === '0' ? "Login" : "Create Account"}
                    </DialogTitle>
                </DialogHeader>

                <Tabs value={tabIndex} onValueChange={setTabIndex}>
                    <TabsList className="flex justify-center mb-4">
                        <TabsTrigger value="0" className="px-4 py-2 text-black bg-gray-200 rounded-l-lg">Sign In</TabsTrigger>
                        <TabsTrigger value="1" className="px-4 py-2 text-black bg-gray-200 rounded-r-lg">Create Account</TabsTrigger>
                    </TabsList>

                    <TabsContent value="0">
                        <label className="block mb-2 text-sm font-medium text-black">
                            Email
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black">
                            Password
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <DialogFooter>
                            <Button onClick={handleLogin} className="w-full py-2 px-4 border border-highlight rounded-md shadow-sm text-sm font-medium text-highlight bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Login
                            </Button>
                        </DialogFooter>
                    </TabsContent>

                    <TabsContent value="1">
                        <label className="block mb-2 text-sm font-medium text-black">
                            Username
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black">
                            Email
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black">
                            Password
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-black">
                            Confirm Password
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <DialogFooter>
                            <Button onClick={handleCreateAccount} className="w-full py-2 px-4 border border-highlight rounded-md shadow-sm text-sm font-medium text-highlight bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Create Account
                            </Button>
                        </DialogFooter>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
