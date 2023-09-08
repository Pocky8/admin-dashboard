import React, { useState, useEffect } from 'react';
import Finance from './components/finance';

function App() {
  const backgroundImageUrl = 'https://cdn.discordapp.com/attachments/806018511495102484/1149392986430521545/cool3.jpg'; 

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle}>
      <Finance />
    </div>
  );
}

export default App;
