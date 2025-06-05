import { useEffect, useState } from "react";
import Button from "../components/Button";

const GamePage = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        document.body.classList.add('bg-home');
        return () => {
            document.body.classList.remove('bg-home');
        };
    }, []);

    const games = [
        {
            name: 'Dino Offline',
            image: '/images/dinooffline.png',
            url: 'https://www.crazygames.co.id/game/chrome-dino',
        },
        {
            name: 'Flappy Bird',
            image: '/images/flappybird.png',
            url: 'https://flappybird.io/',
        },
        {
            name: 'Geometry Dash',
            image: '/images/geometry.png',
            url: 'https://geometrydash.io/',
        },
    ];

    const handlePlay = () => {
        if (selectedGame) {
            window.open(selectedGame.url, '_blank');
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-center flex-col items-center">
                {/* Title */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-center">
                    <h1 className="text-[#344054] text-4xl sm:text-5xl lg:text-6xl font-bold">
                        Choose The Game
                    </h1>
                    <img
                        src="/images/gamepad.png"
                        alt="Gamepad Icon"
                        className="w-12 sm:w-16"
                    />
                </div>

                {/* Game Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 w-full max-w-4xl z-30">
                    {games.map((game, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedGame(game)}
                            className={`cursor-pointer w-full aspect-square max-w-[180px] mx-auto rounded-xl border 
                                ${
                                    selectedGame?.name === game.name
                                        ? 'border-blue-500 ring-4 ring-blue-400'
                                        : 'border-white'
                                } 
                                border-opacity-35 bg-white bg-opacity-10 overflow-hidden group 
                                drop-shadow-xl relative hover:scale-95 transition-all duration-500`}
                        >
                            <div
                                style={{ backgroundImage: `url('${game.image}')` }}
                                className={`w-full h-full bg-cover bg-center absolute 
                                    ${
                                        selectedGame?.name === game.name
                                            ? 'scale-125'
                                            : 'group-hover:scale-125'
                                    } 
                                    transition-all duration-500`}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Play Button */}
                <div className="mt-10 z-30">
                    <Button onClick={handlePlay} disabled={!selectedGame}>
                        {selectedGame ? `Play ${selectedGame.name}` : "Play"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
