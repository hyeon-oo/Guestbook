import React, { useState } from 'react';
import './index.css';

function GuestBookPage() {
  const [formType, setFormType] = useState('age');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [memo, setMemo] = useState(''); // 메모 상태 추가
  const [entries, setEntries] = useState([]);

  const LABELS = { age: '나이', region: '지역', job: '직업' };

  const addEntry = () => {
    if (!name || !value) return;
    const newEntry = {
      id: Date.now(),
      name,
      type: formType,
      value,
      memo,            // 메모도 저장
    };
    setEntries((prev) => [...prev, newEntry]);
    setName('');
    setValue('');
    setMemo('');       // 등록 후 메모 초기화
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 바 */}
      <header className="bg-green-600 text-white text-2xl font-bold text-center py-4">
        방명록
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        {/* 목록 창 */}
        <div className="lg:w-1/2 w-full p-6 border-b lg:border-b-0 lg:border-r border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">방명록 목록</h2>
          <ul className="space-y-2">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="bg-white rounded-xl shadow p-4 border border-gray-200"
              >
                <div className="font-semibold">{entry.name}</div>
                <div className="text-sm text-gray-700">
                  {LABELS[entry.type]}: {entry.value}
                </div>
                {entry.memo && (
                  <div className="mt-2 text-gray-600 whitespace-pre-wrap">{entry.memo}</div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* 입력 폼 */}
        <div className="lg:w-1/2 w-full flex justify-center items-center p-8 bg-gray-50">
          <div className="w-full max-w-md bg-white shadow-lg rounded-[30px] p-6 space-y-4 border border-gray-200">
            <h2 className="text-xl font-bold">방명록 작성</h2>

            <label className="block text-sm font-medium">입력 형식 선택</label>
            <select
              className="w-full p-2 rounded-md border border-gray-300"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
            >
              <option value="age">이름 + 나이</option>
              <option value="region">이름 + 지역</option>
              <option value="job">이름 + 직업</option>
            </select>

            <input
              type="text"
              placeholder="이름"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type={formType === 'age' ? 'number' : 'text'}
              placeholder={LABELS[formType]}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            {/* 메모 입력란 추가 */}
            <textarea
              placeholder="메모를 입력하세요 (선택사항)"
              className="w-full p-2 border border-gray-300 rounded-md resize-y"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={4}
            />

            <button
              onClick={addEntry}
              className="w-full bg-green-600 text-white py-2 rounded-[30px] hover:bg-green-500 transition"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestBookPage;
