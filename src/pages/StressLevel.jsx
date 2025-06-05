import { useEffect, useState } from "react";
import useSerial from "../hooks/useSerial"; // Pastikan path sesuai dengan lokasi file hook

const STRESS_LEVELS = [
	{ icon: "/images/emote.png", label: "Chill Mode", color: "#4CAF50" },
	{ icon: "/images/emote.png", label: "Warm-Up", color: "#FFEB3B" },
	{ icon: "/images/emote.png", label: "Focused", color: "#FFC107" },
	{ icon: "/images/emote.png", label: "Overdrive", color: "#FF9800" },
	{ icon: "/images/emote.png", label: "Meltdown", color: "#F44336" },
];

const StressLevel = () => {
	const [levelIdx, setLevelIdx] = useState(0);
	const [score, setScore] = useState(0);
	const [bpm, setBpm] = useState(98);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		document.body.classList.add("bg-home");
		return () => {
			document.body.classList.remove("bg-home");
		};
	}, []);

	useSerial((data) => {
		const val = parseInt(data);
		if (!isNaN(val)) {
			setScore((prev) => prev + 1);
			setBpm(val);

			if (val < 60) setLevelIdx(0);
			else if (val < 80) setLevelIdx(1);
			else if (val < 100) setLevelIdx(2);
			else if (val < 120) setLevelIdx(3);
			else setLevelIdx(4);
		}
	}, () => setConnected(true));

	return (
		<div className="w-full min-h-screen flex flex-col justify-between relative overflow-hidden">
			{!connected && (
				<div className="fixed top-4 right-4 z-50">
					<button
						onClick={() => navigator.serial.requestPort().then(() => window.location.reload())}
						className="bg-red-500 text-white px-4 py-2 rounded"
					>
						Hubungkan Tombol USB
					</button>
				</div>
			)}

			<img src="/images/awan1.png" alt="Awan 1" className="absolute left-0 top-0 w-1/3 min-w-[200px] max-w-[400px] -z-20" />
			<img src="/images/componentawan1.png" alt="" className="absolute left-0 top-0 -z-10 w-full" />
			<img src="/images/componentawan3.png" alt="" className="absolute left-0 top-20 w-full -z-10" />
			<img
				src="/images/hand_phone.png"
				alt="Hand holding phone"
				className="fixed left-0 bottom-24 w-[30vw] min-w-[250px] max-w-[400px] z-20 pointer-events-none select-none"
				style={{ maxHeight: "80vh" }}
			/>
			<div className="flex flex-col items-center justify-center flex-1 pt-20 pb-10">
				<h1 className="text-white text-4xl font-bold mb-6 drop-shadow-lg">
					StressPlay
				</h1>
				<div className="w-full flex justify-center pb-10">
					<iframe
						src="https://geometrydash.io"
						width="100%"
						height="600"
						className="rounded-xl"
						title="Geometry Dash"
						style={{ maxWidth: 900, border: 'none' }}
						allowFullScreen
					/>
				</div>
				<div className="bg-white bg-opacity-90 rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center w-[350px] max-w-full">
					<div className="flex w-full justify-between items-center mb-4">
						<div className="flex flex-col items-center">
							<span className="text-lg font-bold text-gray-700">SCORE</span>
							<span className="text-4xl font-extrabold text-blue-900 bg-blue-200 px-6 py-2 rounded-lg mt-1">
								{score}
							</span>
						</div>
						<div className="border-l-2 border-gray-300 h-16 mx-4"></div>
						<div className="flex flex-col items-center">
							<span className="text-lg font-bold text-gray-700">LOADING</span>
							<span className="text-3xl font-bold text-blue-600 mt-1">
								{bpm} bpm
							</span>
						</div>
					</div>
					<div className="text-xl font-semibold text-gray-700 mt-2 mb-4">
						Stress Level :
						<span className="font-bold" style={{ color: STRESS_LEVELS[levelIdx].color }}>
							{STRESS_LEVELS[levelIdx].label}
						</span>
					</div>
				</div>
				<div className="flex gap-6 mt-10 mb-4">
					{STRESS_LEVELS.map((level, idx) => (
						<div key={level.label} className="flex flex-col items-center">
							<img
								src={level.icon}
								alt={level.label}
								className="w-10 h-10 mb-1"
								style={{
									filter: `drop-shadow(0 0 4px ${level.color})`,
								}}
							/>
							<span
								className="text-xs font-semibold"
								style={{ color: level.color }}
							>
								{level.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StressLevel;