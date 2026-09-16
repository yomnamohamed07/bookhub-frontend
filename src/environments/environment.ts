// ============================================================
// 👉 ده المكان اللي تحط فيه لينك الـ Backend بتاعك (API base URL)
// غيّر السطر ده بس لما تشغّل الـ ASP.NET Core API عندك
// مثال: لو الباك شغال على بورت 5001 هيبقى:
// apiUrl: 'https://localhost:5001/api/books'
// ============================================================
export const environment = {
  production: false,
  // Same origin via Angular proxy → avoids CORS / (blocked) in the browser.
  // proxy.conf.json forwards /api to https://localhost:7258
  apiUrl: 'https://bookshub.runasp.net/api/Books'
};
