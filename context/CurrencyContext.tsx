import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'EUR' | 'XAF' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    toggleCurrency: () => void;
    setCurrency: (currency: Currency) => void;
    formatPrice: (prices: { EUR: number, USD: number, XAF: number } | undefined) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CFA_ZONES = [
    'Africa/Abidjan', 'Africa/Dakar', 'Africa/Bamako', 'Africa/Ouagadougou', 'Africa/Niamey',
    'Africa/Porto-Novo', 'Africa/Lome', 'Africa/Ndjamena', 'Africa/Bangui', 'Africa/Brazzaville',
    'Africa/Libreville', 'Africa/Douala', 'Africa/Yaounde', 'Africa/Malabo'
];

const EU_ZONES = [
    'Europe/Paris', 'Europe/Berlin', 'Europe/Brussels', 'Europe/Madrid', 'Europe/Rome',
    'Europe/Amsterdam', 'Europe/Vienna', 'Europe/Lisbon', 'Europe/Athens', 'Europe/Dublin',
    'Europe/Helsinki', 'Europe/Luxembourg'
];

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrencyState] = useState<Currency>('EUR');

    useEffect(() => {
        // Enforce Auto-Detection Logic on Mount
        // We do NOT load from localStorage anymore to enforce "Geographic Intelligence"

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (CFA_ZONES.includes(timeZone)) {
            setCurrencyState('XAF');
        } else if (EU_ZONES.includes(timeZone)) {
            setCurrencyState('EUR');
        } else {
            console.log(`Detected Zone: ${timeZone} -> Defaulting to USD`);
            setCurrencyState('USD');
        }
    }, []);

    // No setCurrency or toggleCurrency exposed to UI
    const setCurrency = (newCurrency: Currency) => {
        console.warn("Manual currency setting is disabled.");
    };

    const toggleCurrency = () => {
        console.warn("Manual currency toggling is disabled.");
    };

    const formatPrice = (prices: { EUR: number, USD: number, XAF: number } | undefined): string => {
        if (!prices) return "Sur Devis";

        switch (currency) {
            case 'EUR':
                return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prices.EUR);
            case 'XAF':
                return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(prices.XAF).replace('FCFA', 'FCFA');
            case 'USD':
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(prices.USD);
            default:
                return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prices.EUR);
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
