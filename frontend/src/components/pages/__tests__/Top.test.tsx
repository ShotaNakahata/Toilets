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
})