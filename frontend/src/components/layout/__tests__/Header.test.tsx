// frontend/src/components/layout/__tests__/Header.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import Header from '../Header';

jest.mock("../../../context/UserContext.tsx", () => ({
    useUser: jest.fn(),
}));

describe("Heder Component", () => {
    const mockUseUser = useUser as jest.Mock;   

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render correct elements when user is not logged in', () => {
        //未loginの場合
        mockUseUser.mockReturnValue({ user: null });

        render(
            <Router>
                <Header />
            </Router>
        );

        //ロゴが表示されることを確認
        expect(screen.getByAltText("Logo")).toBeInTheDocument();

        // "Welcome Guest" テキストが表示されていることを確認
        expect(screen.getByText("Welcome Guest")).toBeInTheDocument();

        // "Login" リンクが表示されていることを確認
        expect(screen.getByText("Login")).toBeInTheDocument();

        // ナビゲーションリンクが表示されていることを確認
        expect(screen.getByText("Map")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
        expect(screen.getByText("MyPage")).toBeInTheDocument();
    });

    test('should render correct elements when user is logged in', () => {
        //login状態のモック
        mockUseUser.mockReturnValue({
            user: { username: "TestUser" },
        });
        render(
            <Router>
                <Header />
            </Router>
        );
        // "Welcome TestUser" テキストが表示されていることを確認
        expect(screen.getByText('Welcome TestUser')).toBeInTheDocument();
        // "Logout" ボタンが表示されていることを確認
        expect(screen.getByText("Logout")).toBeInTheDocument();
        // ナビゲーションリンクが表示されていることを確認
        expect(screen.getByText('Map')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('MyPage')).toBeInTheDocument();
    });

});



