import React, { useState, useEffect, useRef } from 'react';

const GridLineGame = () => {
  const [gridWidth, setGridWidth] = useState(3);
  const [gridHeight, setGridHeight] = useState(4);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState(new Set());
  const [path, setPath] = useState([{ x: 0, y: 0 }]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showTouchHint, setShowTouchHint] = useState(true);
  const [cellSize, setCellSize] = useState(100);
  const containerRef = useRef(null);
  const [showSetup, setShowSetup] = useState(true);
  const [tempWidth, setTempWidth] = useState(3);
  const [tempHeight, setTempHeight] = useState(4);
  const [rainbowActive, setRainbowActive] = useState(false);
  const rainbowTimerRef = useRef(null);

  // Calculate total possible lines
  const totalPossibleLines = gridWidth * gridHeight * 2;

  // Create a key for a line segment
  const getLineKey = (from, to) => {
    const key1 = `${from.x},${from.y}-${to.x},${to.y}`;
    const key2 = `${to.x},${to.y}-${from.x},${from.y}`;
    return [key1, key2];
  };

  // Get the destination position given a direction
  const getDestination = (pos, direction) => {
    let newX = pos.x;
    let newY = pos.y;

    switch (direction) {
      case 'up':
        newY = (pos.y - 1 + gridHeight) % gridHeight;
        break;
      case 'down':
        newY = (pos.y + 1) % gridHeight;
        break;
      case 'left':
        newX = (pos.x - 1 + gridWidth) % gridWidth;
        break;
      case 'right':
        newX = (pos.x + 1) % gridWidth;
        break;
    }

    return { x: newX, y: newY };
  };

  // Check if a move is valid
  const isValidMove = (from, to) => {
    const [key1, key2] = getLineKey(from, to);
    return !lines.has(key1) && !lines.has(key2);
  };

  // Get all possible moves from current position
  const getPossibleMoves = (pos) => {
    const moves = [];
    const directions = ['up', 'down', 'left', 'right'];

    for (const dir of directions) {
      const dest = getDestination(pos, dir);
      if (isValidMove(pos, dest)) {
        moves.push({ direction: dir, destination: dest });
      }
    }

    return moves;
  };

  // Update possible moves whenever position or lines change
  useEffect(() => {
    if (!showSetup) {
      setPossibleMoves(getPossibleMoves(currentPos));
    }
  }, [currentPos, lines, showSetup, gridWidth, gridHeight]);

  // Check game status
  useEffect(() => {
    if (!showSetup && lines.size > 0) {
      if (lines.size === totalPossibleLines) {
        setGameStatus('won');
        setRainbowActive(true);
        // Stop rainbow effect after 10 seconds
        rainbowTimerRef.current = setTimeout(() => {
          setRainbowActive(false);
        }, 10000);
      } else if (possibleMoves.length === 0 && lines.size < totalPossibleLines) {
        setGameStatus('lost');
      }
    }
  }, [lines, possibleMoves, totalPossibleLines, showSetup]);

  // Make a move
  const makeMove = (direction) => {
    if (gameStatus !== 'playing') return;

    const destination = getDestination(currentPos, direction);

    if (!isValidMove(currentPos, destination)) {
      return;
    }

    const [key1] = getLineKey(currentPos, destination);

    setLines(prev => {
      const newLines = new Set(prev);
      newLines.add(key1);
      return newLines;
    });

    setPath(prev => [...prev, destination]);
    setCurrentPos(destination);
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart || !isSwiping) return;
    e.preventDefault(); // Prevent scrolling while swiping
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !isSwiping || gameStatus !== 'playing') {
      setIsSwiping(false);
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 30;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          makeMove('right');
        } else {
          makeMove('left');
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          makeMove('down');
        } else {
          makeMove('up');
        }
      }
    }

    setTouchStart(null);
    setIsSwiping(false);
  };

  // Start a new game with selected grid size
  const startGame = () => {
    setGridWidth(tempWidth);
    setGridHeight(tempHeight);
    setCurrentPos({ x: 0, y: 0 });
    setLines(new Set());
    setPath([{ x: 0, y: 0 }]);
    setGameStatus('playing');
    setShowTouchHint(true);
    setRainbowActive(false);
    setShowSetup(false);
  };

  // Reset the game
  const resetGame = () => {
    setCurrentPos({ x: 0, y: 0 });
    setLines(new Set());
    setPath([{ x: 0, y: 0 }]);
    setGameStatus('playing');
    setShowTouchHint(true);
    setRainbowActive(false);
    setShowSetup(true);
  };

  // Calculate responsive cell size to fill most of the screen
  const calculateCellSize = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const availableWidth = window.innerWidth - 40;
    const availableHeight = window.innerHeight - 150; // Space for header and controls

    // Calculate cell size to use 95% of available space
    const targetWidth = availableWidth * 0.95;
    const targetHeight = availableHeight * 0.95;

    const maxCellWidth = Math.floor(targetWidth / gridWidth);
    const maxCellHeight = Math.floor(targetHeight / gridHeight);

    // Use the smaller dimension to ensure it fits, with generous sizing
    const newCellSize = Math.max(60, Math.min(maxCellWidth, maxCellHeight));
    setCellSize(newCellSize);
  };

  // Recalculate cell size on mount, window resize, and grid size change
  useEffect(() => {
    calculateCellSize();

    const handleResize = () => {
      calculateCellSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gridWidth, gridHeight]);

  // Hide touch hint after first move
  useEffect(() => {
    if (lines.size > 0) {
      setShowTouchHint(false);
    }
  }, [lines]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus !== 'playing' || showSetup) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          makeMove('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          makeMove('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          makeMove('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          makeMove('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus, showSetup, currentPos, lines]);

  // Get the SVG path for drawing lines
  const getSVGPath = () => {
    if (path.length < 2) return '';

    const offset = cellSize / 2;

    let pathStr = `M ${path[0].x * cellSize + offset} ${path[0].y * cellSize + offset}`;

    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1];
      const curr = path[i];

      // Check if we need to draw a wrapping line
      const xDiff = Math.abs(curr.x - prev.x);
      const yDiff = Math.abs(curr.y - prev.y);

      if (xDiff > 1 || yDiff > 1) {
        // This is a wrapping line
        if (xDiff > 1) {
          // Horizontal wrap
          if (prev.x === 0) {
            // Wrapping left
            pathStr += ` L ${-offset} ${prev.y * cellSize + offset}`;
            pathStr += ` M ${gridWidth * cellSize + offset} ${curr.y * cellSize + offset}`;
          } else {
            // Wrapping right
            pathStr += ` L ${gridWidth * cellSize + offset} ${prev.y * cellSize + offset}`;
            pathStr += ` M ${-offset} ${curr.y * cellSize + offset}`;
          }
        } else {
          // Vertical wrap
          if (prev.y === 0) {
            // Wrapping up
            pathStr += ` L ${prev.x * cellSize + offset} ${-offset}`;
            pathStr += ` M ${curr.x * cellSize + offset} ${gridHeight * cellSize + offset}`;
          } else {
            // Wrapping down
            pathStr += ` L ${prev.x * cellSize + offset} ${gridHeight * cellSize + offset}`;
            pathStr += ` M ${curr.x * cellSize + offset} ${-offset}`;
          }
        }
      }

      pathStr += ` L ${curr.x * cellSize + offset} ${curr.y * cellSize + offset}`;
    }

    return pathStr;
  };

  return (
    <div className="w-full h-screen p-4 flex flex-col" style={{ backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)' }} ref={containerRef}>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
        @keyframes rainbow {
          0% { stroke: #ff0000; }
          16.66% { stroke: #ff8800; }
          33.33% { stroke: #ffff00; }
          50% { stroke: #00ff00; }
          66.66% { stroke: #0088ff; }
          83.33% { stroke: #8800ff; }
          100% { stroke: #ff0000; }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
          50% { filter: drop-shadow(0 0 20px currentColor); }
        }
        .rainbow-path {
          animation: rainbow 2s linear infinite, glow 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="flex flex-col h-full w-full">
        <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Grid Line Game
        </h1>

        {showSetup ? (
          // Setup Screen
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="p-8 rounded-xl border-2 shadow-2xl max-w-md w-full" style={{ backgroundColor: 'var(--ifm-card-background-color)', borderColor: 'var(--ifm-color-emphasis-300)' }}>
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Grid Size</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Width: {tempWidth}</label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={tempWidth}
                    onChange={(e) => setTempWidth(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                    style={{ backgroundColor: 'var(--ifm-color-emphasis-200)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Height: {tempHeight}</label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={tempHeight}
                    onChange={(e) => setTempHeight(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                    style={{ backgroundColor: 'var(--ifm-color-emphasis-200)' }}
                  />
                </div>

                {/* Preview Grid */}
                <div className="flex justify-center py-4">
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${tempWidth}, 1fr)` }}>
                    {Array.from({ length: tempHeight * tempWidth }, (_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-sm"
                        style={{ backgroundColor: 'var(--ifm-color-emphasis-300)' }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center text-sm" style={{ color: 'var(--ifm-color-emphasis-600)' }}>
                  Grid: {tempWidth} × {tempHeight} = {tempWidth * tempHeight} squares
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                  style={{ backgroundColor: 'var(--ifm-color-primary)', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Start Game
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            {/* Status */}
            <div className="mb-4 text-center">
              {gameStatus === 'playing' && (
                <>
                  <div className="text-xl mb-2">
                    Lines: {lines.size} / {totalPossibleLines}
                  </div>
                  <button
                    onClick={resetGame}
                    className="text-sm underline"
                    style={{ color: 'var(--ifm-color-emphasis-600)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ifm-color-emphasis-800)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ifm-color-emphasis-600)'}
                  >
                    Give up
                  </button>
                </>
              )}
              {gameStatus === 'won' && (
                <div>
                  <div className="text-3xl font-bold mb-4" style={{ color: 'var(--ifm-color-success)' }}>You Win! 🎉</div>
                  <div className="text-xl mb-4">
                    Completed: {lines.size} / {totalPossibleLines} lines
                  </div>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 rounded-lg transition-colors font-semibold"
                    style={{ backgroundColor: 'var(--ifm-color-success)', color: 'white' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    New Game
                  </button>
                </div>
              )}
              {gameStatus === 'lost' && (
                <div>
                  <div className="text-3xl font-bold mb-4" style={{ color: 'var(--ifm-color-danger)' }}>Game Over - You got stuck!</div>
                  <div className="text-xl mb-4">
                    Lines: {lines.size} / {totalPossibleLines}
                  </div>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 rounded-lg transition-colors font-semibold"
                    style={{ backgroundColor: 'var(--ifm-color-danger)', color: 'white' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Game Grid */}
            <div className="flex justify-center items-center flex-1">
              <div className="relative inline-block">
                {showTouchHint && gameStatus === 'playing' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-blue-600 bg-opacity-90 text-white px-4 py-2 rounded-lg animate-pulse">
                      Swipe to move!
                    </div>
                  </div>
                )}
                <svg
                  width={gridWidth * cellSize}
                  height={gridHeight * cellSize}
                  className={`border-2 touch-none ${rainbowActive ? 'animate-pulse' : ''}`}
                  style={{
                    borderColor: 'var(--ifm-color-emphasis-300)',
                    backgroundColor: 'var(--ifm-color-emphasis-100)',
                    touchAction: 'none'
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Rainbow gradient definition */}
                  <defs>
                    <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff0000">
                        <animate attributeName="stop-color"
                          values="#ff0000;#ff8800;#ffff00;#00ff00;#0088ff;#8800ff;#ff0000"
                          dur="3s"
                          repeatCount="indefinite" />
                      </stop>
                      <stop offset="20%" stopColor="#ff8800">
                        <animate attributeName="stop-color"
                          values="#ff8800;#ffff00;#00ff00;#0088ff;#8800ff;#ff0000;#ff8800"
                          dur="3s"
                          repeatCount="indefinite" />
                      </stop>
                      <stop offset="40%" stopColor="#ffff00">
                        <animate attributeName="stop-color"
                          values="#ffff00;#00ff00;#0088ff;#8800ff;#ff0000;#ff8800;#ffff00"
                          dur="3s"
                          repeatCount="indefinite" />
                      </stop>
                      <stop offset="60%" stopColor="#00ff00">
                        <animate attributeName="stop-color"
                          values="#00ff00;#0088ff;#8800ff;#ff0000;#ff8800;#ffff00;#00ff00"
                          dur="3s"
                          repeatCount="indefinite" />
                      </stop>
                      <stop offset="80%" stopColor="#0088ff">
                        <animate attributeName="stop-color"
                          values="#0088ff;#8800ff;#ff0000;#ff8800;#ffff00;#00ff00;#0088ff"
                          dur="3s"
                          repeatCount="indefinite" />
                      </stop>
                      <stop offset="100%" stopColor="#8800ff">
                        <animate attributeName="stop-color"
                          values="#8800ff;#ff0000;#ff8800;#ffff00;#00ff00;#0088ff;#8800ff"
                          dur="3s"
                          repeatCount="indefinite" />
                      </stop>
                    </linearGradient>
                  </defs>

                  {/* Grid squares */}
                  {Array.from({ length: gridHeight }, (_, y) =>
                    Array.from({ length: gridWidth }, (_, x) => (
                      <g key={`${x}-${y}`}>
                        <rect
                          x={x * cellSize}
                          y={y * cellSize}
                          width={cellSize}
                          height={cellSize}
                          fill="none"
                          stroke="var(--ifm-color-emphasis-300)"
                          strokeWidth="1"
                        />
                        <circle
                          cx={x * cellSize + cellSize / 2}
                          cy={y * cellSize + cellSize / 2}
                          r="6"
                          fill={currentPos.x === x && currentPos.y === y ? "var(--ifm-color-primary)" : "var(--ifm-color-emphasis-400)"}
                          className={rainbowActive ? 'animate-pulse' : ''}
                        />
                      </g>
                    ))
                  )}

                  {/* Drawn path */}
                  <path
                    d={getSVGPath()}
                    fill="none"
                    stroke={rainbowActive ? 'url(#rainbow-gradient)' : 'var(--ifm-color-primary)'}
                    strokeWidth={rainbowActive ? '6' : '4'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={rainbowActive ? 'rainbow-path' : ''}
                  />

                  {/* Current position indicator */}
                  <circle
                    cx={currentPos.x * cellSize + cellSize / 2}
                    cy={currentPos.y * cellSize + cellSize / 2}
                    r="16"
                    fill="none"
                    stroke={rainbowActive ? 'url(#rainbow-gradient)' : 'var(--ifm-color-primary)'}
                    strokeWidth="4"
                    className={rainbowActive ? 'rainbow-path' : ''}
                  />

                  {/* Swipe indicator */}
                  {isSwiping && touchStart && (
                    <circle
                      cx={currentPos.x * cellSize + cellSize / 2}
                      cy={currentPos.y * cellSize + cellSize / 2}
                      r="20"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      strokeDasharray="4"
                      opacity="0.5"
                      className="animate-pulse"
                    />
                  )}
                  {/* Win celebration effects */}
                  {rainbowActive && (
                    <g>
                      {Array.from({ length: 8 }, (_, i) => (
                        <circle
                          key={`sparkle-${i}`}
                          cx={Math.random() * gridWidth * cellSize}
                          cy={Math.random() * gridHeight * cellSize}
                          r="2"
                          fill="#ffff00"
                          opacity="0"
                        >
                          <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="2s"
                            begin={`${i * 0.2}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="r"
                            values="2;6;2"
                            dur="2s"
                            begin={`${i * 0.2}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      ))}
                    </g>
                  )}
                </svg>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center text-sm" style={{ color: 'var(--ifm-color-emphasis-600)' }}>
              <p>Use arrow keys or swipe to draw through all connections. Lines wrap around edges.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridLineGame;
