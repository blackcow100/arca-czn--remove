// 확장 프로그램 설치 또는 업데이트 시 실행
chrome.runtime.onInstalled.addListener(() => {
  const defaultRules = [
    { url: "https://arca.live/b/nightmare", text: "카장연 멀티" },
    { url: "https://arca.live/b/epic7", text: "에장연" },
    { url: "https://arca.live/b/chaoszeronightmare", text: "카장연" },
  ];

  // 이미 설정된 값이 없는 경우에만 기본값 세팅 (사용자 설정 보호)
  chrome.storage.local.get(["adRulesArray"], (result) => {
    if (!result.adRulesArray) {
      chrome.storage.local.set({ adRulesArray: defaultRules }, () => {
        console.log("기본 광고 필터 규칙이 설정되었습니다.");
      });
    }
  });
});
