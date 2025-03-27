import React, { useState } from "react";
import { motion } from "framer-motion";

const activityLevels = [
  { label: "Сидячий (до 4000 шагов)", value: 1.2 },
  { label: "Легкая активность (5000–7000 шагов)", value: 1.375 },
  { label: "Умеренная активность (7000–10000 шагов)", value: 1.55 },
  { label: "Высокая активность (10000–12000 шагов)", value: 1.725 },
  { label: "Очень высокая активность (12000+ шагов)", value: 1.9 },
];

export default function KcalCalculator() {
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(165);
  const [activity, setActivity] = useState(1.375);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const maintain = bmr * activity;
    const loseMin = maintain * 0.95;
    const loseMax = maintain * 0.9;

    setResult({ maintain, loseMin, loseMax });
  };

  return (
    <motion.div
      className="max-w-xl mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ fontFamily: "sans-serif", color: "#880E4F" }}
    >
      <h1 className="text-2xl font-bold text-center mb-4">Калькулятор КБЖУ</h1>
      <div className="bg-pink-100 p-4 rounded-2xl shadow-md space-y-4">
        <div>
          <label>Пол</label>
          <select
            className="w-full p-2 rounded-xl bg-pink-50"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="female">Женский</option>
            <option value="male">Мужской</option>
          </select>
        </div>
        <div>
          <label>Возраст</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(+e.target.value)}
            className="bg-pink-50 w-full p-2 rounded-xl"
          />
        </div>
        <div>
          <label>Вес (кг)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(+e.target.value)}
            className="bg-pink-50 w-full p-2 rounded-xl"
          />
        </div>
        <div>
          <label>Рост (см)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
            className="bg-pink-50 w-full p-2 rounded-xl"
          />
        </div>
        <div>
          <label>Уровень активности</label>
          <select
            className="w-full p-2 rounded-xl bg-pink-50"
            value={activity}
            onChange={(e) => setActivity(+e.target.value)}
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={calculate}
          className="w-full p-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
        >
          Рассчитать
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 bg-pink-200 p-4 rounded-xl"
          >
            <p><strong>Для поддержания веса:</strong> {Math.round(result.maintain)} ккал</p>
            <p><strong>Для похудения (мягко):</strong> {Math.round(result.loseMin)} ккал</p>
            <p><strong>Для похудения (интенсивно):</strong> {Math.round(result.loseMax)} ккал</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
