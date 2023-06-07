import React, { useState } from 'react';
import './App.css';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  const calculateAge = () => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    const diffTime = Math.abs(today - birthDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365);
    const diffMonths = Math.floor(diffDays / 30) % 12;
    const remainingDays = diffDays % 30;

    setAge({
      years: diffYears,
      months: diffMonths,
      days: remainingDays,
    });

    const nextBirthday = new Date(today.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const daysLeft = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    setDaysLeft(daysLeft);
  };

  return (
    <div className="App">
      <div className="container" style={{marginTop:"100px"}}>
        <h1 className="title">Age Calculator</h1>
        <div className="input-container">
          <label htmlFor="birth-date">Enter your birth date:</label>
          <input
            type="date"
            id="birth-date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <button className="calculate-btn"style={{marginTop:"30px"}} onClick={calculateAge}>
          Calculate Age
        </button>
        {age !== null && (
          <div className="result-container" style={{marginTop:"100px"}}>
            <p className="result">{`Your age is ${age.years} years, ${age.months} months, and ${age.days} days.`}</p>
            <p className="result">{`Days left for next birthday: ${daysLeft}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
