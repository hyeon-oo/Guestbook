import React, { useState } from 'react';

export default function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry = {
      id: Date.now(),
      name,
      message,
      createdAt: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">방명록</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600 transition"
        >
          등록하기
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-200 rounded p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{entry.name}</span>
              <span>{entry.createdAt}</span>
            </div>
            <p className="text-gray-800">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
