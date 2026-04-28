let rules = [];

// 1. 저장된 데이터 불러오기 및 리스트 렌더링
chrome.storage.local.get(["adRulesArray"], (result) => {
  if (result.adRulesArray) {
    rules = result.adRulesArray;
    renderRules();
  }
});

// 2. 규칙 추가 버튼 클릭
document.getElementById("addBtn").onclick = () => {
  const url = document.getElementById("urlInput").value.trim();
  const text = document.getElementById("textInput").value.trim();

  if (url && text) {
    rules.push({ url, text });
    saveAndRender();
    document.getElementById("urlInput").value = "";
    document.getElementById("textInput").value = "";
  }
};

// 3. 리스트 화면에 그리기
function renderRules() {
  const listDiv = document.getElementById("ruleList");
  listDiv.innerHTML = "";

  rules.forEach((rule, index) => {
    const item = document.createElement("div");
    item.className = "rule-item";
    item.innerHTML = `
      <span><strong>${rule.text}</strong><br>${rule.url}</span>
      <button class="remove-btn" data-index="${index}">삭제</button>
    `;
    listDiv.appendChild(item);
  });

  // 삭제 버튼 이벤트 연결
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.onclick = (e) => {
      const index = e.target.getAttribute("data-index");
      rules.splice(index, 1);
      saveAndRender();
    };
  });
}

// 4. 저장 후 다시 그리기
function saveAndRender() {
  chrome.storage.local.set({ adRulesArray: rules }, () => {
    renderRules();
  });
}
