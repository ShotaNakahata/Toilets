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

    test('renders the explanation paragraphs',()=>{
        // 説明文が正しく表示されているかを確認
        const firstParagraph = screen.getByText(/This website allows you to easily find nearby Restrooms/i);
        const secondParagraph = screen.getByText(/Accessible options are also available/i);
        expect(firstParagraph).toBeInTheDocument()
        expect(secondParagraph).toBeInTheDocument()
    });

    test('renders the navigation links',()=>{
        // 各リンクが正しいURLに向いているかを確認
        const viewAllLink = screen.getByText("View All Restroom List");
        const mapLink = screen.getByText("View Restroom Using The Map");
        const viewAllregisterLink = screen.getByText("Register a New Restroom");
        const dashboardLink = screen.getByText("Check the Dashboard");

        expect(viewAllLink.closest("a")).toHaveAttribute("href",'/FilterSearchToile');
        expect(mapLink.closest("a")).toHaveAttribute("href",'/Map');
        expect(viewAllregisterLink.closest("a")).toHaveAttribute("href",'/RegistrationRestroom');
        expect(dashboardLink.closest("a")).toHaveAttribute("href",'#dashboard');
        
    });
})