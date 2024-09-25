import React, { Suspense } from 'react';

// 各セクションコンポーネントを遅延読み込み
const Top = React.lazy(() => import('./Top'));
const Service = React.lazy(() => import('./Service'));
const AndMore = React.lazy(() => import('./AndMore'));
const Message = React.lazy(() => import('./Message'));
const Footer = React.lazy(() => import('../layout/Footer'));
const DashboardPage = React.lazy(() => import('./DashboardPage'));

const Home: React.FC = () => {
    return (
        <div className="bg-background text-text min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <Top />
                <Service />
                <DashboardPage />
                <AndMore />
                <Message />
                <Footer />
            </Suspense>
        </div>
    );
};

export default Home;

