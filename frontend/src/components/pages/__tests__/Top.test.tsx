// frontend/src/components/pages/__tests__/Top.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Top from "../Top"

describe("Top Page", () => {
    beforeEach(() => {
        render(
            <Router>
                <Top />
            </Router>
        );
    })
    test('renders the main title', () => {
        // メインタイトルが正しく表示されているかを確認
        const mainTitle = screen.getByText(/Where is My Restroom\?\?/i);
        expect(mainTitle).toBeInTheDocument();
    });

    test('renders the explanation paragraphs', () => {
        // 説明文が正しく表示されているかを確認
        const firstParagraph = screen.getByText(/This website allows you to easily find nearby Restrooms/i);
        const secondParagraph = screen.getByText(/Accessible options are also available/i);
        expect(firstParagraph).toBeInTheDocument()
        expect(secondParagraph).toBeInTheDocument()
    });

    test('renders the navigation links', () => {
        // 各リンクが正しいURLに向いているかを確認
        const viewAllLink = screen.getByText("View All Restroom List");
        const mapLink = screen.getByText("View Restroom Using The Map");
        const viewAllregisterLink = screen.getByText("Register a New Restroom");
        const dashboardLink = screen.getByText("Check the Dashboard");

        expect(viewAllLink.closest("a")).toHaveAttribute("href", '/FilterSearchToile');
        expect(mapLink.closest("a")).toHaveAttribute("href", '/Map');
        expect(viewAllregisterLink.closest("a")).toHaveAttribute("href", '/RegistrationRestroom');
        expect(dashboardLink.closest("a")).toHaveAttribute("href", '#dashboard');

    });

    test('renders the images with correct alt text and src attributes', () => {
        // 画像要素を alt テキストで取得
        const RestroomListImg = screen.getByAltText('RestroomListImg');
        const TheMapImg = screen.getByAltText('TheMapImg');
        const RegisterImg = screen.getByAltText('RegisterImg');
        const DashboardImg = screen.getByAltText('DashboardImg');

        // 1. altテキストが正しいか確認
        expect(RestroomListImg).toBeInTheDocument();
        expect(TheMapImg).toBeInTheDocument();
        expect(RegisterImg).toBeInTheDocument();
        expect(DashboardImg).toBeInTheDocument();

        // 2. 画像のsrc属性が正しいか確認
        expect(RestroomListImg).toHaveAttribute('src', '/images/IconSearch.png');
        expect(TheMapImg).toHaveAttribute('src', '/images/IconMap.png');
        expect(RegisterImg).toHaveAttribute('src', '/images/IconFound.png');
        expect(DashboardImg).toHaveAttribute('src', '/images/IconRate.png');

        // 3. 画像が可視であるか確認（実際にページ上で表示されているか）
        expect(RestroomListImg).toBeVisible();
        expect(TheMapImg).toBeVisible();
        expect(RegisterImg).toBeVisible();
        expect(DashboardImg).toBeVisible();
    });
})