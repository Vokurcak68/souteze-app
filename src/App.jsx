import React, { useState } from 'react';
import { CheckCircle, RotateCcw, Eye, EyeOff, Lock, Unlock, Home, ArrowLeft } from 'lucide-react';

export default function SoutezeApp() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTask, setSelectedTask] = useState(null);
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // State pro výsledky úkolů
  const [userAnswers, setUserAnswers] = useState({
    task1: '',
    task2: '',
    task3: '',
    task4: ''
  });

  // State pro úkol 1 - Kdo kde bydlí
  const [grid, setGrid] = useState(() => {
    const initialGrid = {};
    for (let pos = 1; pos <= 5; pos++) {
      initialGrid[pos] = { jmeno: '', barva: '', auto: '', hobby: '' };
    }
    return initialGrid;
  });
  const [showHints, setShowHints] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [finalCode, setFinalCode] = useState('');

  // State pro úkol 2 - Mini Sudoku
  const [sudokuGrid, setSudokuGrid] = useState([
    [0, 2, 0, 4],
    [3, 0, 0, 0],
    [0, 0, 0, 1], 
    [4, 0, 2, 0]
  ]);
  const [task2Won, setTask2Won] = useState(false);
  const [task2Code, setTask2Code] = useState('');

  // State pro úkol 3 - Vzorce
  const [sequences, setSequences] = useState({
    A: { value: '', correct: 42 },
    B: { value: '', correct: 13 },
    C: { value: '', correct: 23 },
    D: { value: '', correct: 36 }
  });
  const [task3Won, setTask3Won] = useState(false);
  const [hintPassword, setHintPassword] = useState('');
  const [showSequenceHints, setShowSequenceHints] = useState(false);

  // State pro úkol 5 - Přehřátý Server
  const [serverCode, setServerCode] = useState(['', '', '', '']);
  const [task5Won, setTask5Won] = useState(false);

  // Správné odpovědi pro všechny úkoly
  const correctAnswers = {
    task1: '2354',
    task2: '1443', 
    task3: '2341',
    task4: '5678'
  };

  const tasks = [
    { id: 1, title: "Kdo kde bydlí", description: "Logická dedukční úloha", password: "7823", status: "active" },
    { id: 2, title: "Mini Sudoku", description: "4×4 číselná logika", password: "9156", status: "active" },
    { id: 3, title: "Vzorce a sekvence", description: "Kód v numerologii", password: "4792", status: "active" },
    { id: 4, title: "3D puzzle kód", description: "Prostorová logika", password: "3648", status: "active" },
    { id: 5, title: "Operace: Přehřátý Server", description: "IT záchranná mise", password: "5937", status: "active" }
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

  const serverClues = [
    "Kód má čtyři unikátní číslice. Jejich součet je 13.",
    "Žádná číslice v kódu není prvočíslo (tj. nepoužil jsem 2, 3, 5, ani 7).",
    "Třetí číslice je počet vrstev v původním (čtyřvrstvém) modelu TCP/IP.",
    "Poslední číslice je 'exit code' skriptu, který proběhl úspěšně.",
    "Nejvyšší číslice z celého kódu je na druhé pozici."
  ];

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setCurrentView('password');
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password === selectedTask.password) {
      setCurrentView(`task${selectedTask.id}`);
    } else {
      alert('Nesprávné heslo!');
    }
    setPassword('');
  };

  const goHome = () => {
    setCurrentView('home');
    setSelectedTask(null);
    setPassword('');
  };

  // Funkce pro úkol 1
  const updateCell = (position, category, value) => {
    setGrid(prev => ({
      ...prev,
      [position]: { ...prev[position], [category]: value }
    }));
  };

  const checkSolution = () => {
    if (userAnswers.task1 === '') {
      alert('Nejdříve zadejte váš čtyřmístný kód!');
      return;
    }
    
    if (userAnswers.task1 === correctAnswers.task1) {
      setFinalCode(userAnswers.task1);
      setGameWon(true);
    } else {
      alert('Nesprávný kód! Zkuste to znovu.');
    }
  };

  const resetGame = () => {
    const initialGrid = {};
    for (let pos = 1; pos <= 5; pos++) {
      initialGrid[pos] = { jmeno: '', barva: '', auto: '', hobby: '' };
    }
    setGrid(initialGrid);
    setGameWon(false);
    setFinalCode('');
    setIsAdminMode(false);
    setUserAnswers(prev => ({...prev, task1: ''}));
  };

  const showCorrectSolution = () => {
    const correctSolution = {
      1: { jmeno: 'Milan', barva: 'Bílý', auto: 'Audi', hobby: 'Hudba' },
      2: { jmeno: 'Pavel', barva: 'Červený', auto: 'BMW', hobby: 'Fotografování' },
      3: { jmeno: 'Jana', barva: 'Modrý', auto: 'Ford', hobby: 'Vaření' },
      4: { jmeno: 'Eva', barva: 'Zelený', auto: 'Peugeot', hobby: 'Čtení' },
      5: { jmeno: 'Tomáš', barva: 'Žlutý', auto: 'Škoda', hobby: 'Sport' }
    };
    setGrid(correctSolution);
    setFinalCode('2354');
  };

  // Funkce pro úkol 2 - Mini Sudoku
  const updateSudokuCell = (row, col, value) => {
    const newGrid = sudokuGrid.map(r => [...r]);
    newGrid[row][col] = parseInt(value) || 0;
    setSudokuGrid(newGrid);
  };

  const checkSudoku = () => {
    if (userAnswers.task2 === '') {
      alert('Nejdříve zadejte váš čtyřmístný kód!');
      return;
    }
    
    if (userAnswers.task2 === correctAnswers.task2) {
      setTask2Code(userAnswers.task2);
      setTask2Won(true);
    } else {
      alert('Nesprávný kód! Zkontrolujte své řešení sudoku.');
    }
  };

  const resetSudoku = () => {
    setSudokuGrid([
      [0, 2, 0, 4],
      [3, 0, 0, 0],
      [0, 0, 0, 1], 
      [4, 0, 2, 0]
    ]);
    setTask2Won(false);
    setTask2Code('');
    setUserAnswers(prev => ({...prev, task2: ''}));
  };

  const isSudokuPrefilled = (row, col) => {
    const prefilled = [
      [false, true, false, true],
      [true, false, false, false],
      [false, false, false, true],
      [true, false, true, false]
    ];
    return prefilled[row][col];
  };

  // Funkce pro úkol 5 - Přehřátý Server
  const updateServerCode = (position, value) => {
    const newCode = [...serverCode];
    newCode[position] = value;
    setServerCode(newCode);
  };

  const checkServerCode = () => {
    const codeString = serverCode.join('');
    if (codeString === '1840') {
      setTask5Won(true);
    } else {
      alert('Nesprávný kód! Server se stále přehřívá... 🔥');
    }
  };

  const resetServerCode = () => {
    setServerCode(['', '', '', '']);
    setTask5Won(false);
  };

  // ÚVODNÍ STRÁNKA
  if (currentView === 'home') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">🎯 LOGICKÉ SOUTĚŽE 🎯</h1>
          <p className="text-center text-gray-600 mb-8 text-lg">Vyberte úkol a zadejte heslo pro jeho odemknutí</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div key={task.id} onClick={() => handleTaskClick(task)}
                   className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 hover:from-green-200 hover:to-green-300 p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">{task.id}</div>
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block">AKTIVNÍ</div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Instrukce:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Klikněte na úkol pro odemknutí</li>
              <li>• Zadejte správné heslo</li>
              <li>• Vyřešte úkol a zadejte finální kód</li>
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
          <button onClick={goHome} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-4 h-4" /> Zpět na úkoly
          </button>
          <div className="text-center">
            <Lock className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTask?.title}</h2>
            <p className="text-gray-600 mb-6">{selectedTask?.description}</p>
            <div className="space-y-4">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                     placeholder="Zadejte heslo pro odemknutí"
                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-lg focus:border-purple-500 focus:outline-none" autoFocus />
              <button onClick={handlePasswordSubmit} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg">
                <Unlock className="w-5 h-5" /> Odemknout úkol
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
            <button onClick={goHome} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <Home className="w-4 h-4" /> Domů
            </button>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">ÚKOL 1/5</span>
          </div>

          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-4">🏠 Kdo kde bydlí? 🏠</h1>
          
          {gameWon && (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-green-800">🎉 GRATULUJEME! 🎉</h2>
              <p className="text-green-700 text-lg">Váš čtyřmístný kód je: <span className="font-mono text-2xl bg-green-200 px-3 py-1 rounded">{finalCode}</span></p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Tabulka řešení</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border border-gray-400 p-2 font-semibold">POZICE</th>
                      {[1,2,3,4,5].map(i => <th key={i} className="border border-gray-400 p-2 font-semibold">{i}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {['jmeno', 'barva', 'auto', 'hobby'].map((category) => (
                      <tr key={category}>
                        <td className="border border-gray-400 p-2 font-semibold bg-gray-100">
                          {category === 'jmeno' ? 'JMÉNO' : category === 'barva' ? 'BARVA DOMU' : category === 'auto' ? 'AUTO' : 'HOBBY'}
                        </td>
                        {[1,2,3,4,5].map((pos) => (
                          <td key={pos} className="border border-gray-400 p-1">
                            <select value={grid[pos][category]} onChange={(e) => updateCell(pos, category, e.target.value)} className="w-full p-1 text-sm border rounded">
                              <option value="">---</option>
                              {options[category].map((option) => <option key={option} value={option}>{option}</option>)}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">🔍 Indicie</h2>
                <button onClick={() => setShowHints(!showHints)} className="flex items-center gap-2 px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-300">
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

          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg">
              <span className="text-indigo-800 font-semibold">Váš kód:</span>
              <input
                type="text"
                value={userAnswers.task1}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[0-9]{0,4}$/.test(val)) {
                    setUserAnswers(prev => ({...prev, task1: val}));
                  }
                }}
                className="w-20 px-2 py-1 border-2 border-indigo-300 rounded text-center font-mono text-lg"
                placeholder="1234"
                maxLength="4"
              />
              <button onClick={checkSolution} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                <CheckCircle className="w-4 h-4" /> Kontrola
              </button>
            </div>
            
            <button onClick={resetGame} className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <RotateCcw className="w-5 h-5" /> Resetovat
            </button>
            
            {!isAdminMode ? (
              <div className="flex items-center gap-2">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin heslo" className="px-3 py-2 border rounded-lg text-sm" />
                <button onClick={() => { if (password === '8288') { setIsAdminMode(true); setPassword(''); } else alert('Špatné heslo!'); }} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                  <Lock className="w-4 h-4" /> Admin
                </button>
              </div>
            ) : (
              <button onClick={showCorrectSolution} className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                <Eye className="w-5 h-5" /> Ukázat řešení
              </button>
            )}
          </div>

          <div className="mt-6 bg-indigo-50 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-800 mb-2">📝 Jak získat finální kód:</h3>
            <p className="text-indigo-700">
              Po správném vyřešení všech pozic najděte pozice jednotlivých osob a sestavte kód:
              <br />
              <span className="font-mono bg-indigo-100 px-2 py-1 rounded">Pavel-Jana-Tomáš-Eva</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ÚKOL 2: MINI SUDOKU
  if (currentView === 'task2') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-teal-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={goHome} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <Home className="w-4 h-4" /> Domů
            </button>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">ÚKOL 2/5</span>
          </div>

          <h1 className="text-3xl font-bold text-center text-teal-800 mb-4">🔢 Mini Sudoku 🔢</h1>
          
          {task2Won && (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-green-800">🎉 GRATULUJEME! 🎉</h2>
              <p className="text-green-700 text-lg">Váš kód je: <span className="font-mono text-2xl bg-green-200 px-3 py-1 rounded">{task2Code}</span></p>
            </div>
          )}

          <div className="flex justify-center mb-6">
            <div className="bg-gray-50 p-6 rounded-lg border-4 border-teal-300">
              <div className="grid grid-cols-4 gap-1 w-fit">
                {sudokuGrid.map((row, rowIndex) => 
                  row.map((cell, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} 
                         className={`w-16 h-16 border-2 flex items-center justify-center text-xl font-bold
                           ${(rowIndex < 2 && colIndex < 2) || (rowIndex >= 2 && colIndex >= 2) ? 'bg-blue-50 border-blue-300' : 'bg-yellow-50 border-yellow-300'}
                           ${isSudokuPrefilled(rowIndex, colIndex) ? 'bg-gray-200' : 'bg-white'}
                         `}>
                      {isSudokuPrefilled(rowIndex, colIndex) ? (
                        <span className="text-gray-800">{cell}</span>
                      ) : (
                        <input type="text" value={cell === 0 ? '' : cell}
                               onChange={(e) => {
                                 const val = e.target.value;
                                 if (val === '' || /^[1-4]$/.test(val)) {
                                   updateSudokuCell(rowIndex, colIndex, val);
                                 }
                               }}
                               className="w-full h-full text-center text-xl font-bold bg-transparent border-none outline-none focus:bg-green-100" maxLength="1" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Pravidla Mini Sudoku:</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Každý řádek musí obsahovat čísla 1-4</li>
                <li>• Každý sloupec musí obsahovat čísla 1-4</li>
                <li>• Každý 2×2 čtverec musí obsahovat 1-4</li>
                <li>• Šedá pole nelze měnit</li>
              </ul>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-4">
              <h3 className="font-semibold text-teal-800 mb-2">🎯 Jak získat kód:</h3>
              <p className="text-teal-700 text-sm">
                Po vyřešení sudoku se váš čtyřmístný kód skládá z čísel na hlavní úhlopříčce (zleva nahoře doprava dolů).
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <div className="flex items-center gap-2 bg-teal-50 p-3 rounded-lg">
              <span className="text-teal-800 font-semibold">Váš kód:</span>
              <input
                type="text"
                value={userAnswers.task2}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[0-9]{0,4}$/.test(val)) {
                    setUserAnswers(prev => ({...prev, task2: val}));
                  }
                }}
                className="w-20 px-2 py-1 border-2 border-teal-300 rounded text-center font-mono text-lg"
                placeholder="1234"
                maxLength="4"
              />
              <button onClick={checkSudoku} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                <CheckCircle className="w-4 h-4" /> Kontrola
              </button>
            </div>
            
            <button onClick={resetSudoku} className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <RotateCcw className="w-5 h-5" /> Resetovat
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ÚKOL 3: VZORCE A SEKVENCE
  if (currentView === 'task3') {
    const sequenceData = {
      A: { sequence: [2, 6, 12, 20, 30], hint: "n × (n+1)", correct: 42 },
      B: { sequence: [1, 1, 2, 3, 5, 8], hint: "Součet dvou předchozích", correct: 13 },
      C: { sequence: [3, 7, 11, 15, 19], hint: "Stále +4", correct: 23 },
      D: { sequence: [1, 4, 9, 16, 25], hint: "Druhé mocniny", correct: 36 }
    };

    const checkSequences = () => {
      if (userAnswers.task3 === '') {
        alert('Nejdříve zadejte váš čtyřmístný kód!');
        return;
      }
      
      if (userAnswers.task3 === correctAnswers.task3) {
        setTask3Won(true);
      } else {
        alert('Nesprávný kód! Zkontrolujte výpočet sekvencí.');
      }
    };

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={goHome} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <Home className="w-4 h-4" /> Domů
            </button>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">ÚKOL 3/5</span>
          </div>

          <h1 className="text-3xl font-bold text-center text-purple-800 mb-4">🧮 Vzorce a sekvence 🧮</h1>

          {task3Won && (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-green-800">🎉 GRATULUJEME! 🎉</h2>
              <p className="text-green-700 text-lg">Váš kód je: <span className="font-mono text-2xl bg-green-200 px-3 py-1 rounded">{userAnswers.task3}</span></p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(sequenceData).map(([key, data]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Sekvence {key}</h3>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {data.sequence.map((num, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono">{num}</span>
                  ))}
                  <span className="text-xl">→</span>
                  <input type="number" value={sequences[key].value} onChange={(e) => setSequences(prev => ({...prev, [key]: {...prev[key], value: e.target.value}}))} 
                         className="w-16 px-2 py-1 border rounded text-center font-mono" placeholder="?" />
                </div>
                {showSequenceHints && (
                  <p className="text-sm text-gray-600 italic">Nápověda: {data.hint}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-4">
            {!showSequenceHints ? (
              <div className="flex items-center justify-center gap-2">
                <input
                  type="password"
                  value={hintPassword}
                  onChange={(e) => setHintPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (hintPassword === '8288') {
                        setShowSequenceHints(true);
                        setHintPassword('');
                      } else {
                        alert('Nesprávné heslo!');
                      }
                    }
                  }}
                  placeholder="Heslo pro nápovědy"
                  className="px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  onClick={() => {
                    if (hintPassword === '8288') {
                      setShowSequenceHints(true);
                      setHintPassword('');
                    } else {
                      alert('Nesprávné heslo!');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Zobrazit nápovědy
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSequenceHints(false)}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-yellow-200 rounded-md hover:bg-yellow-300 transition-colors"
              >
                <EyeOff className="w-4 h-4" />
                Skrýt nápovědy
              </button>
            )}
          </div>

          <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-4 bg-purple-50 p-4 rounded-lg mb-4">
              <span className="text-purple-800 font-semibold">Váš finální kód:</span>
              <input
                type="text"
                value={userAnswers.task3}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[0-9]{0,4}$/.test(val)) {
                    setUserAnswers(prev => ({...prev, task3: val}));
                  }
                }}
                className="w-20 px-2 py-1 border-2 border-purple-300 rounded text-center font-mono text-lg"
                placeholder="1234"
                maxLength="4"
              />
              <button onClick={checkSequences} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                <CheckCircle className="w-4 h-4 inline mr-1" /> Kontrola
              </button>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">🔢 Instrukce:</h3>
            <p className="text-purple-700 text-sm">
              Najděte chybějící čísla v každé sekvenci. Pak je seřaďte podle velikosti a kód bude pořadí původních sekvencí.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ÚKOL 4: 3D PUZZLE
  if (currentView === 'task4') {
    const checkTask4 = () => {
      if (userAnswers.task4 === '') {
        alert('Nejdříve zadejte váš čtyřmístný kód!');
        return;
      }
      
      if (userAnswers.task4 === correctAnswers.task4) {
        alert('🎉 Správně! Úkol splněn!');
      } else {
        alert('Nesprávný kód! Zkontrolujte sestavení kostek.');
      }
    };

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={goHome} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <Home className="w-4 h-4" /> Domů
            </button>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">ÚKOL 4/5</span>
          </div>

          <h1 className="text-3xl font-bold text-center text-orange-800 mb-4">🧊 3D Puzzle kód 🧊</h1>

          <div className="text-center text-gray-600 mb-6">
            <p className="text-lg">Tento úkol vyžaduje fyzické kostky s čísly na stěnách.</p>
            <p className="text-sm mt-2">Sestavte kostky podle pravidel a najděte kód na dotykových plochách!</p>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-orange-800 mb-4">📐 Pravidla sestavení:</h3>
            <ul className="text-orange-700 text-sm space-y-2">
              <li>• Sestavte 8 kostek do konstrukce 2×2×2</li>
              <li>• <strong>Součet vrchních stran = 24</strong></li>
              <li>• <strong>Součet předních stran = 18</strong></li>
              <li>• <strong>Součet pravých stran = 21</strong></li>
              <li>• Žádná dvě stejná čísla se nedotýkají</li>
            </ul>
            
            <div className="mt-6 p-4 bg-white rounded border-2 border-orange-300">
              <h4 className="font-semibold text-orange-800 mb-2">🎯 Jak najít kód:</h4>
              <p className="text-orange-700 text-sm">
                Když je konstrukce správná, uvnitř kostky jsou 4 dotykové plochy (tam kde se kostky dotýkají). 
                Čísla na těchto plochách tvoří váš čtyřmístný kód.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-4 bg-orange-50 p-4 rounded-lg mb-4">
              <span className="text-orange-800 font-semibold">Váš finální kód:</span>
              <input
                type="text"
                value={userAnswers.task4}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[0-9]{0,4}$/.test(val)) {
                    setUserAnswers(prev => ({...prev, task4: val}));
                  }
                }}
                className="w-20 px-2 py-1 border-2 border-orange-300 rounded text-center font-mono text-lg"
                placeholder="1234"
                maxLength="4"
              />
              <button onClick={checkTask4} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                <CheckCircle className="w-4 h-4 inline mr-1" /> Kontrola
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ÚKOL 5: OPERACE PŘEHŘÁTÝ SERVER
  if (currentView === 'task5') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-red-50 to-orange-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={goHome} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <Home className="w-4 h-4" /> Domů
            </button>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">ÚKOL 5/5 - URGENTNÍ!</span>
          </div>

          <h1 className="text-3xl font-bold text-center text-red-800 mb-4">🔥 Operace: Přehřátý Server 🔥</h1>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <h3 className="font-semibold text-red-800 mb-2">🚨 KRITICKÁ SITUACE:</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              Je sobota ráno a server KRAKEN-01 se začíná přehřívat! Chladicí systém selhal a teplota nebezpečně stoupá. 
              Jediný člověk se znalostí kódu ke dveřím - sysadmin Karel - je na rybách v Norsku bez signálu. 
              Nechal vám ale na stole vzkaz s nápovědou...
            </p>
          </div>

          {task5Won && (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-green-800">🎉 SERVER ZACHRÁNĚN! 🎉</h2>
              <p className="text-green-700 text-lg">Správný kód: <span className="font-mono text-2xl bg-green-200 px-3 py-1 rounded">1840</span></p>
              <p className="text-green-600 text-sm mt-2">Teplota serveru se vrátila k normálu. Výborná práce! 👏</p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">🔐 Zadejte záchranný kód</h2>
              
              <div className="flex justify-center gap-3 mb-6">
                {serverCode.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^[0-9]$/.test(val)) {
                        updateServerCode(index, val);
                      }
                    }}
                    className="w-16 h-16 text-2xl font-bold text-center border-3 border-red-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none"
                    maxLength="1"
                    placeholder="?"
                  />
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={checkServerCode}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold text-lg shadow-lg"
                >
                  🚨 AKTIVOVAT KÓD 🚨
                </button>
              </div>

              <div className="mt-4 text-center">
                <button onClick={resetServerCode} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm">
                  <RotateCcw className="w-4 h-4 inline mr-1" /> Reset
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">📝 Karlův vzkaz</h2>
              
              <div className="bg-white p-4 rounded border shadow-sm font-mono text-sm">
                <div className="text-center mb-4 text-yellow-800 font-bold">
                  "Kdyby něco hořelo, tady máš nápovědu. Snad ti to dojde." - Karel
                </div>
                
                <div className="space-y-3 text-gray-700">
                  {serverClues.map((clue, index) => (
                    <div key={index} className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <span className="font-bold text-yellow-800">#{index + 1}:</span>
                      <span className="ml-2">{clue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-300">
            <h3 className="font-semibold text-orange-800 mb-2 text-center">🧠 Logický postup řešení:</h3>
            <ol className="text-orange-700 text-sm space-y-1">
              <li><strong>1.</strong> Zjistěte, které číslice můžete použít (neprvočísla)</li>
              <li><strong>2.</strong> Najděte kombinaci se součtem 13</li>
              <li><strong>3.</strong> Určete třetí číslici (TCP/IP vrstvy)</li>
              <li><strong>4.</strong> Určete čtvrtou číslici (úspěšný exit code)</li>
              <li><strong>5.</strong> Umístěte největší číslici na druhou pozici</li>
            </ol>
          </div>

          <div className="mt-4 bg-red-100 rounded-lg p-3 text-center animate-pulse">
            <p className="text-red-800 font-semibold">⏰ Teplota serveru: 78°C a stoupá!</p>
            <p className="text-red-600 text-sm">Kritická teplota: 85°C</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}