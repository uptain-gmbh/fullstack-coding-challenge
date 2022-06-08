import React from 'react';

import './JournalApp.css';
import WriteToJournal from './components/WriteToJournal.js';
import ShowJournal from './components/ShowJournal.js';

function JournalApp() {
  return (
    <div className="JournalApp">
            <WriteToJournal/>
            <ShowJournal/>
        </div>
  );
}

export default JournalApp;
