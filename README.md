# The Shelf — Bookstore Frontend (Angular 17)

واجهة إدارة كتب للمكتبة. صفحتين: **Catalog** (عرض الكل) و **Add/Edit Book** (إضافة/تعديل).

## التشغيل

```bash
npm install
npm start
```

هيفتح على `http://localhost:4200`.

## 👉 ربط الباك إند (أهم خطوة)

في ملف:
```
src/environments/environment.ts
```
غيّر السطر ده لعنوان الـ API بتاعك:
```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api/books'   // <-- غيّر البورت/العنوان هنا
};
```
لازم الباك يكون بالشكل ده (RESTful, base path `/api/books`):

| Method | Route              | الوظيفة                     |
|--------|---------------------|------------------------------|
| GET    | `/api/books`         | كل الكتب                     |
| GET    | `/api/books/{id}`     | كتاب واحد                    |
| POST   | `/api/books`          | إضافة كتاب                   |
| PUT    | `/api/books/{id}`     | تعديل كتاب                   |
| DELETE | `/api/books/{id}`     | حذف كتاب                     |

شكل الـ JSON اللي الفرونت بيبعته/بيستناه:
```json
{
  "id": 1,
  "title": "string",
  "author": "string",
  "isbn": "string",
  "category": "string",
  "availableCopies": 0
}
```

### CORS
لازم الباك يسمح بالـ origin بتاع الفرونت `http://localhost:4200`، وإلا الطلبات هتترفض من المتصفح. في ASP.NET Core:
```csharp
builder.Services.AddCors(o => o.AddPolicy("AllowFrontend", p =>
    p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));
// ...
app.UseCors("AllowFrontend");
```

### ISBN مكرر (409 Conflict)
الفرونت متجهز يستقبل `409 Conflict` من الباك لو الـ ISBN مكرر، ويعرض رسالة تحت حقل ISBN مباشرة. لو الباك بيرجع Status code تاني، عدّل الشرط في:
```
src/app/components/book-form/book-form.component.ts → onSubmit()
```

## الفاليديشن الموجودة في الفرونت (Client-side)
- Title: مطلوب.
- ISBN: مطلوب (والتحقق من التكرار بيحصل من رد السيرفر).
- Available Copies: مينفعش يكون رقم سالب.

## هيكل المشروع
```
src/app/
 ├── models/book.model.ts          # شكل الـ Book
 ├── services/book.service.ts      # كل نداءات الـ API
 ├── components/book-list/         # صفحة الكتالوج
 └── components/book-form/         # صفحة الإضافة/التعديل
src/environments/environment.ts    # 👈 لينك الباك هنا
```
