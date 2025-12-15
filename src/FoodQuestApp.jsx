import React, { useState, useCallback } from 'react';
import { Plus, Trash2, Settings, Home, RotateCcw } from 'lucide-react';

/* ======================================================
   CUSTOM SCREEN (MOVED OUTSIDE APP — FIXES INPUT FOCUS)
====================================================== */

const CustomScreen = ({
  foodItems,
  favorites,
  customFoodName,
  customFoodCategory,
  customFoodEmoji,
  removeMode,
  selectedForRemoval,
  setCurrentScreen,
  setRemoveMode,
  setSelectedForRemoval,
  handleFoodNameChange,
  handleCategoryChange,
  handleEmojiChange,
  addCustomFood,
  toggleFavorite,
  toggleRemovalSelection,
  removeSelectedFoods,
}) => {
 // Common savory food emojis for quick selection
  const emojiOptions = [
    '🍕', '🍔', '🌮', '🌯', '🍣', '🍝', '🍜', '🍱', 
    '🍲', '🥗', '🥪', '🍗', '🍖', '🥩', '🍤', '🦞',
    '🍛', '🥘', '🥟', '🥠', '🧆', '🥙', '🌭', '🧀',
    '🍳', '🥓', '🥞', '🥖', '🍿', '🥫', '🍚', '🍙',
    '🍢', '🥚', '🦐', '🦑', '🦀', '🐟', '🥡', '🦆',
    '🫓', '🥨', '🧈', '🥯', '🧄', '🧅', '🌶️', '🍽️'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-500 p-6">
      <button
        onClick={() => setCurrentScreen('home')}
        className="bg-white/20 backdrop-blur text-white rounded-full p-2 mb-6"
      >
        <Home size={24} />
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">Manage Foods</h2>

      <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Custom Food</h3>
        
        <input
          type="text"
          placeholder="Food name"
          value={customFoodName}
          onChange={handleFoodNameChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-3"
          autoComplete="off"
        />
        
        <input
          type="text"
          placeholder="Category"
          value={customFoodCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-3"
          autoComplete="off"
        />

        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Choose an emoji:
          </label>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-4xl bg-gray-100 rounded-lg p-3 border-2 border-gray-300">
              {customFoodEmoji || '🍽️'}
            </div>
            <input
              type="text"
              placeholder="Or type emoji"
              value={customFoodEmoji}
              onChange={handleEmojiChange}
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-2xl"
              autoComplete="off"
              maxLength="2"
            />
          </div>
          <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-lg border border-gray-200">
            {emojiOptions.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiChange({ target: { value: emoji } })}
                className={`text-3xl p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                  customFoodEmoji === emoji ? 'bg-purple-200 ring-2 ring-purple-500' : 'bg-white'
                }`}
                type="button"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={addCustomFood}
          className="w-full bg-purple-600 text-white rounded-lg py-3 font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 mb-3"
        >
          <Plus size={20} />
          Add Food
        </button>
        
        {!removeMode ? (
          <button
            onClick={() => setRemoveMode(true)}
            className="w-full bg-red-600 text-white rounded-lg py-3 font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={20} />
            Remove Foods
          </button>
        ) : (
          <div className="space-y-2">
            <button
              onClick={removeSelectedFoods}
              disabled={selectedForRemoval.length === 0}
              className="w-full bg-red-600 text-white rounded-lg py-3 font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Trash2 size={20} />
              Remove Selected ({selectedForRemoval.length})
            </button>
            <button
              onClick={() => { setRemoveMode(false); setSelectedForRemoval([]); }}
              className="w-full bg-gray-600 text-white rounded-lg py-3 font-bold hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Your Foods ({foodItems.length})
          {removeMode && <span className="text-red-600 text-sm ml-2">(Select to Remove)</span>}
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {foodItems.map(food => {
            const isFavorite = favorites.includes(food.id);
            const isSelectedForRemoval = selectedForRemoval.includes(food.id);
            
            return (
              <div
                key={food.id}
                onClick={() => removeMode ? toggleRemovalSelection(food.id) : toggleFavorite(food.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                  isSelectedForRemoval 
                    ? 'bg-red-100 border-2 border-red-500' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{food.emoji}</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{food.name}</div>
                    <div className="text-sm text-gray-600">{food.category}</div>
                  </div>
                </div>
                {removeMode ? (
                  <span className="text-2xl">
                    {isSelectedForRemoval ? '☑️' : '⬜'}
                  </span>
                ) : (
                  <span className={`text-2xl ${isFavorite ? 'opacity-100' : 'opacity-30'}`}>
                    ⭐
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FoodQuestApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedResult, setSelectedResult] = useState(null);
  const [bracketRound, setBracketRound] = useState([]);
  const [bracketHistory, setBracketHistory] = useState([]);
  const [currentMatchup, setCurrentMatchup] = useState(0);
  
 const [foodItems, setFoodItems] = useState([
  { id: 1, name: 'Pizza', category: 'Italian', emoji: '🍕' },
  { id: 2, name: 'Burger', category: 'American', emoji: '🍔' },
  { id: 3, name: 'Tacos', category: 'Mexican', emoji: '🌮' },
  { id: 4, name: 'Burrito', category: 'Mexican', emoji: '🌯' },
  { id: 5, name: 'Fried Chicken', category: 'American', emoji: '🍗' },
  { id: 6, name: 'Chicken Wings', category: 'American', emoji: '🍗' },
  { id: 7, name: 'Hot Dog', category: 'American', emoji: '🌭' },
  { id: 8, name: 'Sandwich', category: 'American', emoji: '🥪' },
  { id: 9, name: 'Grilled Cheese', category: 'American', emoji: '🧀' },
  { id: 10, name: 'Mac & Cheese', category: 'American', emoji: '🧀' },
  { id: 11, name: 'Pasta', category: 'Italian', emoji: '🍝' },
  { id: 12, name: 'Lasagna', category: 'Italian', emoji: '🍝' },
  { id: 13, name: 'Chicken Alfredo', category: 'Italian', emoji: '🍝' },
  { id: 14, name: 'Steak', category: 'American', emoji: '🥩' },
  { id: 15, name: 'BBQ Ribs', category: 'BBQ', emoji: '🍖' },
  { id: 16, name: 'Pulled Pork', category: 'BBQ', emoji: '🍖' },
  { id: 17, name: 'Meatloaf', category: 'American', emoji: '🍽️' },
  { id: 18, name: 'Sloppy Joe', category: 'American', emoji: '🥪' },
  { id: 19, name: 'Chili', category: 'Comfort', emoji: '🍲' },
  { id: 20, name: 'Soup', category: 'Comfort', emoji: '🍲' },
  { id: 21, name: 'Ramen', category: 'Japanese', emoji: '🍜' },
  { id: 22, name: 'Sushi', category: 'Japanese', emoji: '🍣' },
  { id: 23, name: 'Fried Rice', category: 'Chinese', emoji: '🍚' },
  { id: 24, name: 'Orange Chicken', category: 'Chinese', emoji: '🍗' },
  { id: 25, name: 'Lo Mein', category: 'Chinese', emoji: '🍜' },
  { id: 26, name: 'General Tso’s Chicken', category: 'Chinese', emoji: '🍗' },
  { id: 27, name: 'Pad Thai', category: 'Thai', emoji: '🍜' },
  { id: 28, name: 'Chicken Curry', category: 'Indian', emoji: '🍛' },
  { id: 29, name: 'Butter Chicken', category: 'Indian', emoji: '🍗' },
  { id: 30, name: 'Chicken Tikka Masala', category: 'Indian', emoji: '🍛' },
  { id: 31, name: 'Quesadilla', category: 'Mexican', emoji: '🧀' },
  { id: 32, name: 'Nachos', category: 'Mexican', emoji: '🧀' },
  { id: 33, name: 'Enchiladas', category: 'Mexican', emoji: '🌮' },
  { id: 34, name: 'Fajitas', category: 'Mexican', emoji: '🌮' },
  { id: 35, name: 'Tortilla Soup', category: 'Mexican', emoji: '🍲' },
  { id: 36, name: 'Caesar Salad', category: 'Healthy', emoji: '🥗' },
  { id: 37, name: 'Chicken Salad', category: 'Healthy', emoji: '🥗' },
  { id: 38, name: 'Grilled Chicken', category: 'Healthy', emoji: '🍗' },
  { id: 39, name: 'Salmon', category: 'Seafood', emoji: '🐟' },
  { id: 40, name: 'Shrimp', category: 'Seafood', emoji: '🍤' },
  { id: 41, name: 'Fish & Chips', category: 'Seafood', emoji: '🐟' },
  { id: 42, name: 'Chicken Parmesan', category: 'Italian', emoji: '🍗' },
  { id: 43, name: 'Philly Cheesesteak', category: 'American', emoji: '🥩' },
  { id: 44, name: 'Breakfast Burrito', category: 'Breakfast', emoji: '🌯' },
  { id: 45, name: 'Pancakes', category: 'Breakfast', emoji: '🥞' },
  { id: 46, name: 'Omelet', category: 'Breakfast', emoji: '🍳' },
  { id: 47, name: 'French Toast', category: 'Breakfast', emoji: '🍞' },
  { id: 48, name: 'BLT Sandwich', category: 'American', emoji: '🥪' },
  { id: 49, name: 'Chicken Nuggets', category: 'Fast Food', emoji: '🍗' },
  { id: 50, name: 'Pepperoni Pizza', category: 'Italian', emoji: '🍕' }
]);

  const [favorites, setFavorites] = useState([]);
  const [customFoodName, setCustomFoodName] = useState('');
  const [customFoodCategory, setCustomFoodCategory] = useState('');
  const [customFoodEmoji, setCustomFoodEmoji] = useState('');
  const [useFavoritesOnly, setUseFavoritesOnly] = useState(false);
  const [wheelItems, setWheelItems] = useState([]);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedForRemoval, setSelectedForRemoval] = useState([]);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedResult(null);
    
    const minSpins = 10;
    const maxSpins = 15;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomSegmentOffset = Math.random() * 360;
    const newRotation = rotation + (360 * spins) + randomSegmentOffset;
    
    const startTime = Date.now();
    const duration = 6000;
    const startRotation = rotation;
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentRotation = startRotation + (newRotation - startRotation) * easeOut;
      
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const segmentAngle = 360 / wheelItems.length;
        let normalizedRotation = currentRotation % 360;
        if (normalizedRotation < 0) normalizedRotation += 360;
        const angleAtArrow = (360 - normalizedRotation) % 360;
        const adjustedAngle = (angleAtArrow + 90) % 360;
        const selectedIndex = Math.floor(adjustedAngle / segmentAngle) % wheelItems.length;
        setSelectedResult(wheelItems[selectedIndex]);
        setSpinning(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const getAvailableFoods = () => {
    if (useFavoritesOnly) {
      return foodItems.filter(food => favorites.includes(food.id));
    }
    return foodItems;
  };

  const startWheel = (size) => {
    const availableFoods = getAvailableFoods();
    const shuffled = [...availableFoods].sort(() => Math.random() - 0.5).slice(0, Math.min(size, availableFoods.length));
    setWheelItems(shuffled);
    setSelectedResult(null);
    setCurrentScreen('wheel');
  };

  const startBracket = (size) => {
    const availableFoods = getAvailableFoods();
    const shuffled = [...availableFoods].sort(() => Math.random() - 0.5).slice(0, Math.min(size, availableFoods.length));
    setBracketRound(shuffled);
    setBracketHistory([]);
    setCurrentMatchup(0);
    setCurrentScreen('bracket');
  };

  const selectWinner = (winner) => {
    const newHistory = [...bracketHistory, winner];
    setBracketHistory(newHistory);

    if (newHistory.length === bracketRound.length / 2) {
      if (newHistory.length === 1) {
        setSelectedResult(winner);
        setBracketRound([]);
      } else {
        setBracketRound(newHistory);
        setBracketHistory([]);
        setCurrentMatchup(0);
      }
    } else {
      setCurrentMatchup(currentMatchup + 2);
    }
  };

  const quickPick = () => {
    const availableFoods = getAvailableFoods();
    const randomFood = availableFoods[Math.floor(Math.random() * availableFoods.length)];
    setSelectedResult(randomFood);
  };

  const addCustomFood = useCallback(() => {
    if (customFoodName.trim()) {
      const newFood = {
        id: Date.now(),
        name: customFoodName,
        category: customFoodCategory || 'Custom',
        emoji: customFoodEmoji || '🍽️'
      };
      setFoodItems(prev => [...prev, newFood]);
      setCustomFoodName('');
      setCustomFoodCategory('');
      setCustomFoodEmoji('');
    }
  }, [customFoodName, customFoodCategory, customFoodEmoji]);

  const handleFoodNameChange = useCallback((e) => {
    setCustomFoodName(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCustomFoodCategory(e.target.value);
  }, []);

  const handleEmojiChange = useCallback((e) => {
    setCustomFoodEmoji(e.target.value);
  }, []);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fid => fid !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const removeSelectedFoods = () => {
    setFoodItems(foodItems.filter(food => !selectedForRemoval.includes(food.id)));
    setFavorites(favorites.filter(fid => !selectedForRemoval.includes(fid)));
    setSelectedForRemoval([]);
    setRemoveMode(false);
  };

  const toggleRemovalSelection = (id) => {
    if (selectedForRemoval.includes(id)) {
      setSelectedForRemoval(selectedForRemoval.filter(rid => rid !== id));
    } else {
      setSelectedForRemoval([...selectedForRemoval, id]);
    }
  };

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 p-6 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">🍽️ FoodQuest</h1>
        <p className="text-xl text-white/90">Let's decide what to eat!</p>
      </div>

      <div className="mb-8 w-full max-w-md">
        <button
          onClick={() => setUseFavoritesOnly(!useFavoritesOnly)}
          className={`w-full ${useFavoritesOnly ? 'bg-yellow-400 text-gray-800' : 'bg-white/20 backdrop-blur text-white'} rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-between`}
        >
          <span className="flex items-center gap-2">
            <span className="text-2xl">{useFavoritesOnly ? '⭐' : '☆'}</span>
            <span className="font-bold">
              {useFavoritesOnly ? 'Using Favorites Only' : 'Use All Foods'}
            </span>
          </span>
          <span className="text-sm opacity-80">
            {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
          </span>
        </button>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => setCurrentScreen('wheelSize')}
          className="w-full bg-white text-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-between"
        >
          <span className="text-2xl">🌀</span>
          <span className="text-xl font-bold">Spin the Wheel</span>
          <span className="text-2xl">🌀</span>
        </button>

        <button
          onClick={() => setCurrentScreen('bracketSize')}
          className="w-full bg-white text-pink-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-between"
        >
          <span className="text-2xl">🏆</span>
          <span className="text-xl font-bold">Food Bracket</span>
          <span className="text-2xl">🏆</span>
        </button>

        <button
          onClick={() => { setCurrentScreen('quick'); setSelectedResult(null); }}
          className="w-full bg-white text-orange-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-between"
        >
          <span className="text-2xl">❓</span>
          <span className="text-xl font-bold">Mystery Meal</span>
          <span className="text-2xl">❓</span>
        </button>

        <button
          onClick={() => setCurrentScreen('custom')}
          className="w-full bg-white/20 backdrop-blur text-white rounded-2xl p-4 shadow-lg hover:bg-white/30 transition-all flex items-center justify-center gap-2"
        >
          <Settings size={20} />
          <span className="font-semibold">Manage Foods</span>
        </button>
      </div>
    </div>
  );

  const WheelSizeScreen = () => {
    const availableFoods = getAvailableFoods();
    const foodCount = availableFoods.length;
    const wheelOptions = [
      { size: 8, label: 'Quick Choice', emoji: '🎯' },
      { size: 12, label: 'Medium Wheel', emoji: '🎪' },
      { size: 20, label: 'Big Wheel', emoji: '🎡' },
      { size: foodCount, label: `All (${foodCount})`, emoji: '🌟', isAll: true }
    ];
    const availableOptions = wheelOptions.filter(option => option.isAll || option.size <= foodCount);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 p-6 flex flex-col">
        <button onClick={() => setCurrentScreen('home')} className="self-start bg-white/20 backdrop-blur text-white rounded-full p-2 mb-4">
          <Home size={24} />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Choose Wheel Size</h2>
          <p className="text-white/90 mb-8 text-center text-lg">
            {useFavoritesOnly ? `You have ${foodCount} favorite${foodCount !== 1 ? 's' : ''}` : 'How many foods on the wheel?'}
          </p>
          
          {availableOptions.length === 0 ? (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center max-w-md">
              <p className="text-white text-lg mb-4">You need at least 4 favorites to play the wheel!</p>
              <button onClick={() => setCurrentScreen('custom')} className="bg-white text-purple-600 rounded-full px-6 py-3 font-bold hover:shadow-xl transition-all">
                Add Favorites
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
              {availableOptions.map(option => (
                <button key={option.size} onClick={() => startWheel(option.size)} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  <div className="text-6xl mb-4">{option.emoji}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{option.isAll ? foodCount : option.size}</h3>
                  <p className="text-gray-600">{option.label}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const WheelScreen = () => {
    const segmentAngle = 360 / wheelItems.length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 p-6 flex flex-col">
        <button onClick={() => { setCurrentScreen('home'); setWheelItems([]); setSelectedResult(null); }} className="self-start bg-white/20 backdrop-blur text-white rounded-full p-2 mb-4">
          <Home size={24} />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white mb-8">Spin the Wheel!</h2>

          <div className="relative w-96 h-96 mb-8">
            <div className="absolute top-1/2 -translate-y-1/2 z-20" style={{ right: '-60px' }}>
              <svg width="50" height="70" viewBox="0 0 50 70" className="drop-shadow-2xl">
                <path d="M 0 35 L 40 10 L 40 25 L 50 25 L 50 45 L 40 45 L 40 60 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2"/>
              </svg>
            </div>

            {selectedResult && !spinning && (
              <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ right: '-60px' }}>
                <svg width="55" height="80" viewBox="0 0 55 80" className="drop-shadow-2xl animate-pulse">
                  <path d="M 0 40 L 45 10 L 45 28 L 55 28 L 55 52 L 45 52 L 45 70 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
                </svg>
              </div>
            )}

            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl" style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center center', willChange: spinning ? 'transform' : 'auto' }}>
              {wheelItems.map((food, index) => {
                const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
                const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
                const midAngle = (startAngle + endAngle) / 2;
                const x1 = 200 + 200 * Math.cos(startAngle);
                const y1 = 200 + 200 * Math.sin(startAngle);
                const x2 = 200 + 200 * Math.cos(endAngle);
                const y2 = 200 + 200 * Math.sin(endAngle);
                const largeArc = segmentAngle > 180 ? 1 : 0;
                const pathData = `M 200 200 L ${x1} ${y1} A 200 200 0 ${largeArc} 1 ${x2} ${y2} Z`;
                const textRadius = 130;
                const textX = 200 + textRadius * Math.cos(midAngle);
                const textY = 200 + textRadius * Math.sin(midAngle);
                const textRotation = (index * segmentAngle + segmentAngle / 2);
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788', '#E76F51', '#2A9D8F'];
                const color = colors[index % colors.length];

                return (
                  <g key={food.id}>
                    <path d={pathData} fill={color} stroke="white" strokeWidth="3" />
                    <g transform={`translate(${textX}, ${textY}) rotate(${textRotation})`}>
                      <text textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" dy="-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>{food.emoji}</text>
                      <text textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" dy="10" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{food.name}</text>
                    </g>
                  </g>
                );
              })}
              <circle cx="200" cy="200" r="35" fill="white" stroke="#333" strokeWidth="3" />
              <text x="200" y="200" textAnchor="middle" dy="12" fontSize="30">🍴</text>
            </svg>
          </div>

          {selectedResult && !spinning && (
            <div className="bg-white rounded-2xl p-6 shadow-xl text-center mb-4 animate-bounce">
              <div className="bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg mb-3 inline-block">⭐ WINNER! ⭐</div>
              <div className="text-6xl mb-2">{selectedResult.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedResult.name}</h3>
              <p className="text-gray-600">{selectedResult.category}</p>
            </div>
          )}

          <button onClick={spinWheel} disabled={spinning} className={`${spinning ? 'bg-gray-400' : 'bg-gradient-to-r from-yellow-400 to-orange-500'} text-white rounded-full px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all disabled:transform-none`}>
            {spinning ? 'Spinning...' : 'SPIN!'}
          </button>
        </div>
      </div>
    );
  };

  const BracketSizeScreen = () => {
    const availableFoods = getAvailableFoods();
    const foodCount = availableFoods.length;
    const bracketOptions = [
      { size: 4, label: 'Final Four', rounds: 2 },
      { size: 8, label: 'Elite Eight', rounds: 3 },
      { size: 16, label: 'Sweet Sixteen', rounds: 4 },
      { size: 32, label: 'Full Tournament', rounds: 5 }
    ];
    const availableOptions = bracketOptions.filter(option => option.size <= foodCount);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-6 flex flex-col">
        <button onClick={() => setCurrentScreen('home')} className="self-start bg-white/20 backdrop-blur text-white rounded-full p-2 mb-4"><Home size={24} /></button>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Choose Bracket Size</h2>
          <p className="text-white/90 mb-8 text-center text-lg">{useFavoritesOnly ? `You have ${foodCount} favorite${foodCount !== 1 ? 's' : ''}` : 'How many foods do you want to compete?'}</p>
          {availableOptions.length === 0 ? (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center max-w-md">
              <p className="text-white text-lg mb-4">You need at least 4 favorites to play the bracket!</p>
              <button onClick={() => setCurrentScreen('custom')} className="bg-white text-purple-600 rounded-full px-6 py-3 font-bold hover:shadow-xl transition-all">Add Favorites</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
              {availableOptions.map(option => (
                <button key={option.size} onClick={() => startBracket(option.size)} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  <div className="text-6xl mb-4">🏅</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{option.size}</h3>
                  <p className="text-gray-600">{option.label}</p>
                  <p className="text-sm text-gray-500 mt-2">{option.rounds} rounds</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const BracketScreen = () => {
    if (selectedResult && bracketRound.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl mb-8 animate-bounce">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">🏆 Champion! 🏆</h2>
              <div className="text-8xl mb-4">{selectedResult.emoji}</div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{selectedResult.name}</h3>
              <p className="text-xl text-gray-600">{selectedResult.category}</p>
            </div>
            <button onClick={() => { setSelectedResult(null); setCurrentScreen('home'); }} className="bg-white text-purple-600 rounded-full px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">Back to Home</button>
          </div>
        </div>
      );
    }

    const matchup1 = bracketRound[currentMatchup];
    const matchup2 = bracketRound[currentMatchup + 1];

    if (!matchup1 || !matchup2) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-6 flex flex-col items-center justify-center">
          <button onClick={() => { setCurrentScreen('home'); setBracketRound([]); setSelectedResult(null); }} className="bg-white text-purple-600 rounded-full px-8 py-4 text-lg font-bold shadow-xl">Back to Home</button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-6 flex flex-col">
        <button onClick={() => { setCurrentScreen('home'); setBracketRound([]); setSelectedResult(null); }} className="self-start bg-white/20 backdrop-blur text-white rounded-full p-2 mb-4"><Home size={24} /></button>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-white mb-2">Food Tournament</h2>
          <p className="text-white/90 mb-2">Round of {bracketRound.length}</p>
          <p className="text-white/80 text-sm mb-8">Matchup {bracketHistory.length + 1} of {bracketRound.length / 2}</p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
            <button onClick={() => selectWinner(matchup1)} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">{matchup1.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-800">{matchup1.name}</h3>
              <p className="text-gray-600">{matchup1.category}</p>
            </button>
            <button onClick={() => selectWinner(matchup2)} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">{matchup2.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-800">{matchup2.name}</h3>
              <p className="text-gray-600">{matchup2.category}</p>
            </button>
          </div>
          <p className="text-white/90 mt-8 text-lg">Choose your favorite! 👆</p>
        </div>
      </div>
    );
  };

  const QuickPickScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 p-6 flex flex-col relative overflow-hidden">
      <button onClick={() => { setCurrentScreen('home'); setSelectedResult(null); }} className="self-start bg-white/20 backdrop-blur text-white rounded-full p-2 mb-4 z-10"><Home size={24} /></button>
      {!selectedResult ? (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => {
              const size = Math.random() * 60 + 40;
              const rotation = Math.random() * 360;
              const top = Math.random() * 100;
              const left = Math.random() * 100;
              const opacity = Math.random() * 0.4 + 0.2;
              return (<div key={i} className="absolute text-white font-bold" style={{ fontSize: `${size}px`, transform: `rotate(${rotation}deg)`, top: `${top}%`, left: `${left}%`, opacity }}>?</div>);
            })}
          </div>
          <div className="z-10 text-center">
            <h2 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">Mystery Meal</h2>
            <p className="text-2xl text-white/90 mb-12 drop-shadow">What will you eat today?</p>
            <button onClick={quickPick} className="bg-white text-orange-600 rounded-full px-16 py-6 text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all">Let Fate Decide</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white mb-12 drop-shadow-lg">✨ Your Mystery Meal! ✨</h2>
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center mb-8 animate-bounce">
            <div className="text-8xl mb-4">{selectedResult.emoji}</div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">{selectedResult.name}</h3>
            <p className="text-xl text-gray-600">{selectedResult.category}</p>
          </div>
          <button onClick={() => setSelectedResult(null)} className="bg-white text-orange-600 rounded-full px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3">
            <RotateCcw size={24} />Try Again
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="font-sans">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'wheelSize' && <WheelSizeScreen />}
      {currentScreen === 'wheel' && <WheelScreen />}
      {currentScreen === 'bracketSize' && <BracketSizeScreen />}
      {currentScreen === 'bracket' && <BracketScreen />}
      {currentScreen === 'quick' && <QuickPickScreen />}
      {currentScreen === 'custom' && (
        <CustomScreen
          foodItems={foodItems}
          favorites={favorites}
          customFoodName={customFoodName}
          customFoodCategory={customFoodCategory}
          customFoodEmoji={customFoodEmoji}
          removeMode={removeMode}
          selectedForRemoval={selectedForRemoval}
          setCurrentScreen={setCurrentScreen}
          setRemoveMode={setRemoveMode}
          setSelectedForRemoval={setSelectedForRemoval}
          handleFoodNameChange={handleFoodNameChange}
          handleCategoryChange={handleCategoryChange}
          handleEmojiChange={handleEmojiChange}
          addCustomFood={addCustomFood}
          toggleFavorite={toggleFavorite}
          toggleRemovalSelection={toggleRemovalSelection}
          removeSelectedFoods={removeSelectedFoods}
        />
      )}
    </div>
  );
};

export default FoodQuestApp