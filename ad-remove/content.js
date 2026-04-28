function transformAds() {
  chrome.storage.local.get(["adRulesArray"], (result) => {
    const activeRules = result.adRulesArray || defaultRules;

    const adLinks = document.querySelectorAll("a.vrow.notice-service");

    adLinks.forEach((link) => {
      const matchedRule = activeRules.find((rule) => link.href.startsWith(rule.url));

      if (matchedRule) {
        if (link.getAttribute("data-ad-customized") === matchedRule.text) return;

        link.removeAttribute("href");
        link.style.cursor = "default";
        link.onclick = (e) => e.preventDefault();

        const textElement = link.querySelector("#textad");
        if (textElement) {
          textElement.innerText = matchedRule.text;
        }
        link.setAttribute("data-ad-customized", matchedRule.text);
      }
    });
  });
}

// 초기화 및 관찰 로직은 이전과 동일
const observer = new MutationObserver(() => transformAds());
observer.observe(document.body, { childList: true, subtree: true });
transformAds();
