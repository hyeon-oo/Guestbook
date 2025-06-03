import React, { useState } from "react";
import "./index.css";

function GuestBookPage() {
  const [formType, setFormType] = useState("age");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [memo, setMemo] = useState("");
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null); // 수정 중인 항목 id
  const [showRegionSelector, setShowRegionSelector] = useState(false); // 시/군 선택 UI 상태

  const LABELS = { age: "나이", region: "지역", job: "직업" };

  // 새 항목 추가 또는 기존 항목 수정 저장
  const saveEntry = () => {
    if (!name || !value) return;

    if (editId === null) {
      // 새 항목 추가
      const newEntry = {
        id: Date.now(),
        name,
        type: formType,
        value,
        memo,
      };
      setEntries((prev) => [newEntry, ...prev]);
    } else {
      // 수정 중인 항목 업데이트
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editId
            ? { ...entry, name, type: formType, value, memo }
            : entry
        )
      );
    }
    clearForm();
  };

  // 항목 삭제
  const deleteEntry = () => {
    if (editId === null) return;
    setEntries((prev) => prev.filter((entry) => entry.id !== editId));
    clearForm();
  };

  // 입력폼 초기화
  const clearForm = () => {
    setName("");
    setValue("");
    setMemo("");
    setFormType("age");
    setEditId(null);
    setShowRegionSelector(false);
  };

  // 목록 클릭 시 입력폼에 항목 불러오기
  const handleEntryClick = (entry) => {
    setEditId(entry.id);
    setName(entry.name);
    setFormType(entry.type);
    setValue(entry.value);
    setMemo(entry.memo);
    setShowRegionSelector(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-indigo-600 via-white-600 to-white-700"
      style={{ zoom: 1.25 }}
    >
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">

        <h1 className="text-2xl font-extrabold text-indigo-600 font-ClimateCrisis">
          GUESTBOOK
        </h1>


        <div className="text-gray-400 font-medium"></div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 입력 폼 */}
          <section className="lg:w-1/3 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {editId === null ? "방명록 작성" : "방명록 수정"}
            </h2>

            <label className="block text-sm font-semibold mb-1 text-gray-600">
              이렇게 남길게요
            </label>
            <select
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formType}
              onChange={(e) => {
                setFormType(e.target.value);
                setValue("");
                setShowRegionSelector(false);
              }}
            >
              <option value="age">나이로 남길게요.</option>
              <option value="region">거주지로 남길게요.</option>
              <option value="job">직업으로 남길게요.</option>
            </select>

            <input
              type="text"
              placeholder="이름"
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* value 입력칸 및 시/군 선택 버튼 */}
            {formType === "region" ? (
              <>
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder={LABELS[formType]}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={value.replace(/(시|군)$/, "")}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-4 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-500 transition"
                    onClick={() => setShowRegionSelector((v) => !v)}
                  >
                    선택
                  </button>
                </div>
                {showRegionSelector && (
                  <div className="mb-4 space-x-4">
                    <button
                      type="button"
                      className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => {
                        setValue((v) => v.replace(/(시|군)$/, "") + "시");
                        setShowRegionSelector(false);
                      }}
                    >
                      시
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => {
                        setValue((v) => v.replace(/(시|군)$/, "") + "군");
                        setShowRegionSelector(false);
                      }}
                    >
                      군
                    </button>
                  </div>
                )}
              </>
            ) : (
              <input
                type={formType === "age" ? "number" : "text"}
                placeholder={LABELS[formType]}
                min={formType === "age" ? 0 : undefined}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}

            <textarea
              placeholder="말하고 싶은 이야기를 써주세요"
              rows={4}
              maxLength={300} // 글자 수(300자) 제한 추가
              className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <p className="text-sm text-gray-400 text-right relative -top-8">
              {memo.length} / 300자
            </p>

            <div className="flex space-x-4">
              {editId !== null && (
                <button
                  onClick={deleteEntry}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-500 transition duration-300"
                >
                  삭제
                </button>
              )}
              <button
                onClick={saveEntry}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition duration-300"
              >
                {editId === null ? "등록하기" : "수정 완료"}
              </button>
            </div>
            {editId !== null && (
              <button
                onClick={clearForm}
                className="mt-4 w-full text-indigo-600 font-semibold hover:underline"
              >
                돌아가기
              </button>
            )}
          </section>

          {/* 목록 창 */}
          <section
            className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-8 overflow-y-auto max-h-[540px]"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              목록
            </h2>

            {entries.length === 0 ? (
              <p className="text-gray-300 italic">아직 이야기가 없어요.</p>
            ) : (
              <ul className="space-y-6">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    onClick={() => handleEntryClick(entry)}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-indigo-700 text-lg">
                        {entry.name}
                      </h3>
                      <span className="text-sm text-gray-500 font-semibold">
                        {LABELS[entry.type]}:{" "}
                        {entry.type === "age"
                          ? `${entry.value}세`
                          : entry.value}
                      </span>
                    </div>
                    {entry.memo && (
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {entry.memo}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-gray-300 py-1 mt-40 border-t border-gray-300 text-xs">
        ©2025 GuestBook By Hyeon-o
      </footer>
    </div>
  );
}

export default GuestBookPage;
