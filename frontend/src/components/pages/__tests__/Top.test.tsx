// frontend/src/components/pages/__tests__/Top.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Top from "../Top"

describe("Top Page",()=>{
    test('renders the main title',()=>{
        render(
            <Router>
                <Top/>
            </Router>
        );
        // メインタイトルが正しく表示されているかを確認
        const mainTitle = screen.getByText(/Where is My Restroom\?\?/i);
        expect(mainTitle).toBeInTheDocument();
    })
})