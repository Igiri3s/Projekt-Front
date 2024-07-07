import React, { useState, useEffect } from 'react';
import '../csski/banana.css';

const Banana = () => {
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(300);
    const [pointsPerClick, setPointsPerClick] = useState(1);
    const [pointsPerSecond, setPointsPerSecond] = useState(0);
    const [purchasedUpgrades, setPurchasedUpgrades] = useState([]);
    const [upgradeCounts, setUpgradeCounts] = useState({});
    const [upgrades, setUpgrades] = useState([
        { id: 1, name: '1 Banan', cost: 10, effect: 1, type: 'click' },
        { id: 2, name: '10 Bananów', cost: 50, effect: 10, type: 'click' },
        { id: 3, name: '50 Bananów', cost: 150, effect: 50, type: 'click' },
        { id: 4, name: '10 Bananów na sekunde', cost: 200, effect: 10, type: 'automatic', interval: 1000 },
        { id: 5, name: '50 Bananów na sekunde', cost: 1000, effect: 50, type: 'automatic', interval: 1000 }
    ]);

    useEffect(() => {
        const intervalIds = purchasedUpgrades
            .map(upgrade => {
                return setInterval(() => {
                    setCount(prevCount => prevCount + upgrade.effect);
                }, upgrade.interval);
            });

        return () => {
            intervalIds.forEach(id => clearInterval(id));
        };
    }, [purchasedUpgrades]);

    const handleClick = () => {
        setCount(count + pointsPerClick);
        setSize(size => size + 10);
        setTimeout(() => {
            setSize(size => size - 10);
        }, 100);
    };

    const handleUpgrade = (upgrade) => {
        if (count >= upgrade.cost) {
            setCount(count - upgrade.cost);
            if (upgrade.type === 'click') {
                setPointsPerClick(prevPoints => prevPoints + upgrade.effect);
            } else if (upgrade.type === 'automatic') {
                setPointsPerSecond(prevPoints => prevPoints + upgrade.effect);
                setPurchasedUpgrades(prevUpgrades => [...prevUpgrades, upgrade]);
            }
            setUpgradeCounts(prevCounts => ({
                ...prevCounts,
                [upgrade.id]: (prevCounts[upgrade.id] || 0) + 1
            }));
        }
    };

    return (
        <div className="banana-container">
            <div className="header-section">
                <h1>Projekt zaliczeniowy</h1>
                <p>Punkty: {count}</p>
                <p>Banany na sekundę: {pointsPerSecond}</p>
            </div>
            <div className="content-section">
                <div className="banana-section">
                    <img
                        src="/banana.png"
                        alt="Banana"
                        className="banana"
                        style={{ width: `${size}px`, height: `${size}px` }}
                        onClick={handleClick}
                    />
                </div>
                <div className="upgrades-section">
                    <h2>Ulepszenia</h2>
                    <div className="upgrades">
                        {upgrades.map(upgrade => (
                            <button
                                key={upgrade.id}
                                onClick={() => handleUpgrade(upgrade)}
                                disabled={count < upgrade.cost}
                            >
                                {upgrade.name} (Koszt: {upgrade.cost} punktów) -
                                <span className="upgrade-count"> Kupiono: {upgradeCounts[upgrade.id] || 0}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banana;
