import React, { useState } from 'react';
import axios from 'axios';

function NameForm() {
  const [name, setName] = useState('');
  const [responseName, setResponseName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/send-name', { name });
      setResponseName(response.data.name);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
      {responseName && <p>Received back from Snowflake: {responseName}</p>}
    </form>
  );
}

export default NameForm;
