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

  // 로그인 & 회원가입 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false); // ← 로그인/회원가입 전환


  // 로그인 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  // 로그인 함수
  const handleLogin = () => {
    // 간단한 로그인 처리 로직 (예: 아이디/비밀번호 확인)
    if (loginId && loginPw) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  // 회원가입
  const handleSignup = () => {
    // 회원가입 페이지로 이동하거나 모달 띄우기 등
    console.log("회원가입 클릭됨");
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

        {/* 우측 로그인 / 프로필 영역 */}
        <div className="flex items-center space-x-4">
          {/* 로그인 / 로그아웃 버튼 */}
          <button
            className="text-sm font-semibold text-indigo-600 border border-indigo-600 px-3 py-1 rounded-full hover:bg-indigo-50 transition"
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </button>

          {/* 프로필 이미지 버튼 */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40" // 임시 이미지, 실제 사용 시 사용자 이미지 경로로 교체
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>
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
                <div className="flex flex-nowrap mb-4">
                  <input
                    type="text"
                    placeholder={LABELS[formType]}
                    className="flex-grow min-w-0 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={value.replace(/(시|군)$/, "")}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition flex-shrink-0"
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

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-96 space-y-6 relative">
            <h2 className="text-2xl font-bold text-center text-indigo-600">
              {isSignupMode ? "회원가입" : "로그인"}
            </h2>

            <input
              type="text"
              placeholder="아이디"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              value={loginPw}
              onChange={(e) => setLoginPw(e.target.value)}
            />

            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-500 transition"
              onClick={isSignupMode ? handleSignup : handleLogin}
            >
              {isSignupMode ? "가입하기" : "로그인"}
            </button>

            <div className="text-center text-sm text-gray-500">
              {isSignupMode ? "이미 계정이 있나요?" : "계정이 없으신가요?"}{" "}
              <button
                className="text-indigo-600 font-semibold hover:underline"
                onClick={() => setIsSignupMode(!isSignupMode)}
              >
                {isSignupMode ? "로그인" : "회원가입"}
              </button>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowLoginModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}









    </div>
  );
}

export default GuestBookPage;
