import React, { createContext, useContext, useState, useEffect } from 'react';
import { waitForDataLoad, isPortfolioDataLoaded } from './portfolio';

const PortfolioDataContext = createContext();

export const usePortfolioData = () => {
    const context = useContext(PortfolioDataContext);
    if (!context) {
        throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
    }
    return context;
};

export const PortfolioDataProvider = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(isPortfolioDataLoaded());
    const [loading, setLoading] = useState(!isPortfolioDataLoaded());

    useEffect(() => {
        const loadData = async () => {
            if (!isLoaded) {
                setLoading(true);
                try {
                    await waitForDataLoad();
                    setIsLoaded(true);
                } catch (error) {
                    console.error('Failed to load portfolio data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadData();
    }, [isLoaded]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 2s linear infinite'
                }}></div>
                <p style={{ marginTop: '20px', fontSize: '16px', color: '#666' }}>
                    Loading Portfolio Data...
                </p>
                <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    return (
        <PortfolioDataContext.Provider value={{ isLoaded }}>
            {children}
        </PortfolioDataContext.Provider>
    );
};
