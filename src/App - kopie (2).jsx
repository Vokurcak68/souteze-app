import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Eye, EyeOff, Lock, Unlock, Home, ArrowLeft } from 'lucide-react';

export default function SoutezeApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'password', 'task1'
  const [selectedTask, setSelectedTask] = useState(null);
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // State pro úkol 1 - Kdo kde bydlí
  const [grid, setGrid] = useState(() => {
    const initialGrid = {};
    for (let pos = 1; pos <= 5; pos++) {
      initialGrid[pos] = {
        jmeno: '',
        barva: '',
        auto: '',
        hobby: ''
      };
    }
    return initialGrid;
  });

  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [finalCode, setFinalCode] = useState('');

  const tasks = [
    { id: 1, title: "Kdo kde bydlí", description: "Logická dedukční úloha", password: "7823", status: "active" },
    { id: 2, title: "Číselná síť", description: "Matematický labyrint", password: "8288", status: "locked" },
    { id: 3, title: "Vzorce a sekvence", description: "Kód v numerologii", password: "8288", status: "locked" },
    { id: 4, title: "3D puzzle kód", description: "Prostorová logika", password: "8288", status: "locked" },
    { id: 5, title: "Železniční spoj", description: "Časová logika", password: "8288", status: "locked" }
  ];

  const options = {
    jmeno: ['Pavel', 'Jana', 'Tomáš', 'Eva', 'Milan'],
    barva: ['Červený', 'Modrý', 'Zelený', 'Žlutý', 'Bílý'],
    auto: ['BMW', 'Audi', 'Škoda', 'Ford', 'Peugeot'],
    hobby: ['Fotografování', 'Čtení', 'Sport', 'Vaření', 'Hudba']
  };

  const hints = [
    "Pavel nebydlí v modrém domě",
    "Majitel červeného auta má hobby fotografování",
    "Zelený dům je hned napravo od bílého domu",
    "Jana bydlí v pozici 3",
    "Tomáš má Škodu a bydlí v žlutém domě",
    "Eva nemá BMW ani Audi",
    "Majitel modrého domu má hobby sport",
    "Milan bydlí v pozici 1 nebo 5",
    "Červený dům je na pozici 2",
    "Ford patří osobě s hobby vaření",
    "Peugeot má majitel zeleného domu",
    "Eva má hobby čtení a nebydlí vedle Tomáše"
  ];

  const correctSolution = {
    1: { jmeno: 'Milan', barva: 'Bílý', auto: 'Audi', hobby: 'Hudba' },
    2: { jmeno: 'Pavel', barva: 'Červený', auto: 'BMW', hobby: 'Fotografování' },
    3: { jmeno: 'Jana', barva: 'Modrý', auto: 'Ford', hobby: 'Vaření' },
    4: { jmeno: 'Eva', barva: 'Zelený', auto: 'Peugeot', hobby: 'Čtení' },
    5: { jmeno: 'Tomáš', barva: 'Žlutý', auto: 'Škoda', hobby: 'Sport' }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setCurrentView('password');
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password === selectedTask.password) {
      if (selectedTask.id === 1) {
        setCurrentView('task1');
      } else {
        alert('Tento úkol ještě není implementován!');
        setCurrentView('home');
      }
    } else {
      alert('Nesprávné heslo!');
    }
    setPassword('');
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const goHome = () => {
    setCurrentView('home');
    setSelectedTask(null);
    setPassword('');
    resetGame();
  };

  // Funkce pro úkol 1 - Kdo kde bydlí
  const updateCell = (position, category, value) => {
    setGrid(prev => ({
      ...prev,
      [position]: {
        ...prev[position],
        [category]: value
      }
    }));
  };

  const checkSolution = () => {
    let isCorrect = true;
    
    for (let pos = 1; pos <= 5; pos++) {
      const current = grid[pos];
      const correct = correctSolution[pos];
      
      if (current.jmeno !== correct.jmeno || 
          current.barva !== correct.barva || 
          current.auto !== correct.auto || 
          current.hobby !== correct.hobby) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      const pavelPos = Object.keys(grid).find(pos => grid[pos].jmeno === 'Pavel');
      const janaPos = Object.keys(grid).find(pos => grid[pos].jmeno === 'Jana');
      const tomasPos = Object.keys(grid).find(pos => grid[pos].jmeno === 'Tomáš');
      const evaPos = Object.keys(grid).find(pos => grid[pos].jmeno === 'Eva');
      
      const code = `${pavelPos}${janaPos}${tomasPos}${evaPos}`;
      setFinalCode(code);
      setGameWon(true);
    }

    return isCorrect;
  };

  const resetGame = () => {
    const initialGrid = {};
    for (let pos = 1; pos <= 5; pos++) {
      initialGrid[pos] = {
        jmeno: '',
        barva: '',
        auto: '',
        hobby: ''
      };
    }
    setGrid(initialGrid);
    setGameWon(false);
    setFinalCode('');
    setShowSolution(false);
    setIsAdminMode(false);
  };

  const showCorrectSolution = () => {
    setGrid(correctSolution);
    setShowSolution(true);
    setFinalCode('2354');
  };

  const handleAdminPasswordSubmit = () => {
    if (password === '8288') {
      setIsAdminMode(true);
    } else {
      alert('Nesprávné heslo!');
    }
    setPassword('');
  };

  // ÚVODNÍ STRÁNKA
  if (currentView === 'home') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">
            🎯 LOGICKÉ SOUTĚŽE 🎯
          </h1>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Vyberte úkol a zadejte heslo pro jeho odemknutí
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className={`
                  bg-gradient-to-br p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105
                  ${task.status === 'active' 
                    ? 'from-green-100 to-green-200 border-2 border-green-300 hover:from-green-200 hover:to-green-300' 
                    : 'from-gray-100 to-gray-200 border-2 border-gray-300 hover:from-gray-200 hover:to-gray-300'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {task.id}
                  </div>
                  <Lock className={`w-5 h-5 ${task.status === 'active' ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                
                <div className={`
                  text-xs font-semibold px-3 py-1 rounded-full inline-block
                  ${task.status === 'active' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-400 text-white'
                  }
                `}>
                  {task.status === 'active' ? 'AKTIVNÍ' : 'ZAMČENO'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Instrukce:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Klikněte na úkol pro odemknutí</li>
              <li>• Zadejte správné heslo</li>
              <li>• Po vyřešení získáte čtyřmístný kód</li>
              <li>• Každý úkol má časový limit 15 minut</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // STRÁNKA PRO ZADÁNÍ HESLA
  if (currentView === 'password') {
    return (
      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-100 min-h-screen flex items-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full">
          <button
            onClick={goHome}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na úkoly
          </button>

          <div className="text-center">
            <Lock className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedTask?.title}
            </h2>
            <p className="text-gray-600 mb-6">{selectedTask?.description}</p>
            
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                placeholder="Zadejte heslo pro odemknutí"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-lg focus:border-purple-500 focus:outline-none"
                autoFocus
              />
              
              <button
                onClick={handlePasswordSubmit}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
              >
                <Unlock className="w-5 h-5" />
                Odemknout úkol
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ÚKOL 1: KDO KDE BYDLÍ
  if (currentView === 'task1') {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <Home className="w-4 h-4" />
              Domů
            </button>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              ÚKOL 1/5
            </span>
          </div>

          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-4">
            🏠 Kdo kde bydlí? 🏠
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Logická dedukční soutěž - Vyluštěte, kdo kde bydlí pomocí indicií!
          </p>

          {gameWon && (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-green-800">🎉 GRATULUJEME! 🎉</h2>
              <p className="text-green-700 text-lg">Váš čtyřmístný kód je: <span className="font-mono text-2xl bg-green-200 px-3 py-1 rounded">{finalCode}</span></p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hlavní tabulka */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Tabulka řešení</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border border-gray-400 p-2 font-semibold">POZICE</th>
                      <th className="border border-gray-400 p-2 font-semibold">1</th>
                      <th className="border border-gray-400 p-2 font-semibold">2</th>
                      <th className="border border-gray-400 p-2 font-semibold">3</th>
                      <th className="border border-gray-400 p-2 font-semibold">4</th>
                      <th className="border border-gray-400 p-2 font-semibold">5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['jmeno', 'barva', 'auto', 'hobby'].map((category) => (
                      <tr key={category}>
                        <td className="border border-gray-400 p-2 font-semibold bg-gray-100 capitalize">
                          {category === 'jmeno' ? 'JMÉNO' : 
                           category === 'barva' ? 'BARVA DOMU' : 
                           category === 'auto' ? 'AUTO' : 'HOBBY'}
                        </td>
                        {[1, 2, 3, 4, 5].map((pos) => (
                          <td key={pos} className="border border-gray-400 p-1">
                            <select
                              value={grid[pos][category]}
                              onChange={(e) => updateCell(pos, category, e.target.value)}
                              className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-indigo-300"
                            >
                              <option value="">---</option>
                              {options[category].map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Indicie */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">🔍 Indicie</h2>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-300 transition-colors"
                >
                  {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showHints ? 'Skrýt' : 'Zobrazit'}
                </button>
              </div>
              
              {showHints && (
                <div className="space-y-3">
                  {hints.map((hint, index) => (
                    <div key={index} className="bg-white p-3 rounded border border-yellow-200">
                      <span className="font-semibold text-yellow-800">#{index + 1}:</span>
                      <span className="ml-2 text-gray-700">{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Ovládací tlačítka */}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button
              onClick={checkSolution}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              <CheckCircle className="w-5 h-5" />
              Zkontrolovat řešení
            </button>
            
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Resetovat
            </button>
            
            {/* Admin sekce */}
            {!isAdminMode ? (
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAdminPasswordSubmit();
                    }
                  }}
                  placeholder="Heslo pro organizátory"
                  className="px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  onClick={handleAdminPasswordSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  <Lock className="w-4 h-4" />
                  Odemknout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Unlock className="w-5 h-5 text-green-600" />
                <button
                  onClick={showCorrectSolution}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  <Eye className="w-5 h-5" />
                  Ukázat řešení
                </button>
                <button
                  onClick={() => setIsAdminMode(false)}
                  className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm"
                >
                  Zamknout
                </button>
              </div>
            )}
          </div>

          {/* Instrukce pro kód */}
          <div className="mt-6 bg-indigo-50 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-800 mb-2">📝 Jak získat finální kód:</h3>
            <p className="text-indigo-700">
              Po správném vyřešení všech pozic najděte pozice jednotlivých osob a sestavte kód:
              <br />
              <span className="font-mono bg-indigo-100 px-2 py-1 rounded">Pavel-Jana-Tomáš-Eva</span>
            </p>
          </div>

          {/* Pravidla */}
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">⚡ Pravidla:</h3>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Každý člověk má jedinečné jméno, bydlí v jedinečně barevném domě, má jedinečné auto a hobby</li>
              <li>• Použijte všechny indicie k vyplnění tabulky</li>
              <li>• Časový limit: 15 minut</li>
              <li>• Po vyřešení získáte čtyřmístný kód</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // STRÁNKA PRO ZADÁNÍ HESLA
  return null;
}