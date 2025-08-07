export function renderFromJson(jsonPath, targetSelector, templateFn, insertPosition = 'beforeend') {
  return fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error(`데이터 로드 실패: ${jsonPath}`);
      return response.json();
    })
    .then(data => {
      const target = document.querySelector(targetSelector);
      if (!target) return;

      data.forEach(el => {
        const html = templateFn(el);
        target.insertAdjacentHTML(insertPosition, html);
      });

      return true; 
    })
    .catch(err => {
      console.error(`렌더링 실패: ${err.message}`);
      return false;
    });
}
