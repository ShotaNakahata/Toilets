import React from 'react';
import Top from './Top';
import Service from './Service';
import AndMore from './AndMore';
import Message from './Message';
import Footer from '../layout/Footer';
import DashboardPage from './DashboardPage';

const Home: React.FC = () => {
    return (
        <div className="bg-background text-text min-h-screen">
            {/* それぞれのセクションコンポーネントを順番に表示 */}
            <Top />
            <Service />
            <DashboardPage />
            <AndMore />
            <Message />
            <Footer />
        </div>
    );
};

export default Home;

