# CONTACT — SPESIFIKASI PENAMBAHAN FORM & LOGIC EMAIL

> File ini adalah acuan khusus untuk **menambahkan form contact + logic pengiriman email** ke section Contact yang sudah ada. Desain visual section Contact yang sekarang (heading "Let's Work Together", social buttons GitHub/LinkedIn/Email/Instagram, badge "Open to Opportunities") **TIDAK diubah/didesain ulang** — ini murni penambahan fitur baru di bawah/berdampingan dengan elemen yang sudah ada. Mengikuti `instruksi.md` sebagai dokumen induk untuk warna, tipografi, spacing, radius.

---

## 1. KEPUTUSAN UTAMA

- **Tidak menggunakan Gmail API/OAuth2** — terlalu kompleks (perlu consent screen, refresh token, app verification) untuk kebutuhan sekadar "form → masuk ke 1 email tujuan".
- **Menggunakan Resend** sebagai service pengirim email — API key based (tanpa OAuth), gratis hingga 3.000 email/bulan, dan dibuat oleh tim yang sama dengan Vercel sehingga sangat kompatibel dengan Next.js.
- Form diproses lewat **Next.js Route Handler** (server-side), API key Resend **tidak boleh terekspos ke client**.

---

## 2. PENEMPATAN FORM

- Form ditambahkan **di bawah** deretan social buttons (GitHub/LinkedIn/Email/Instagram) yang sudah ada, sebelum badge "Open to Opportunities" — atau sebagai alternatif, badge "Open to Opportunities" dipindah ke paling bawah setelah form.
- Section Contact tetap dalam 1 komponen yang sama (`Contact.tsx`), form ditambahkan sebagai sub-komponen baru: `ContactForm.tsx`.
- Layout tetap center, max-width mengikuti container global (±1200px, tapi form sendiri dibatasi lebih sempit, mis. `max-w-xl mx-auto`, agar tidak terlalu lebar dan tetap nyaman diisi).
- Style container form: mengikuti pola card yang sudah dipakai di section lain — `bg-[var(--surface)]`, `border border-[var(--border)]`, `rounded-2xl` (16px), padding lega (`p-8`).

---

## 3. FIELD FORM

| Field             | Tipe Input | Wajib? | Validasi                                                                                                               |
| ----------------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| Nickname          | text       | Ya     | min 2 karakter                                                                                                         |
| Full Name         | text       | Ya     | min 2 karakter                                                                                                         |
| Email             | email      | Ya     | format email valid (regex/Zod `.email()`)                                                                              |
| Perihal (Subject) | text       | Ya     | min 3 karakter                                                                                                         |
| Pesan (Message)   | textarea   | Ya     | min 10 karakter (field tambahan yang disarankan, agar konteks dari pengirim lebih jelas dibanding cuma "perihal" saja) |

**Layout field:**

- Nickname & Full Name → 2 kolom sejajar di desktop (`grid grid-cols-1 md:grid-cols-2 gap-4`), stack di mobile.
- Email & Perihal → masing-masing full-width, di bawah baris pertama.
- Pesan (textarea) → full-width, `rows={5}`, paling bawah sebelum tombol submit.

---

## 4. VALIDASI (CLIENT-SIDE)

- Gunakan **React Hook Form + Zod** — konsisten dengan stack yang sudah dipakai di project TODOI, jadi tidak menambah dependency/pola baru yang asing.
- Tampilkan pesan error di bawah tiap field (`text-xs text-red-400`, atau warna error yang konsisten dengan tema — tetap gunakan warna semantic merah untuk error, jangan pakai `--accent` untuk pesan error agar tidak ambigu).
- Tombol submit disabled selama form belum valid ATAU sedang dalam proses submit (`isSubmitting`).

---

## 5. UI STATE SAAT SUBMIT

| State   | Tampilan                                                                                                                                                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Idle    | Tombol "Send Message" aktif, style solid `bg-[var(--accent)]`                                                                                                                                                                       |
| Loading | Tombol disabled, teks berubah jadi "Sending..." + spinner kecil (icon `Loader2` dari `lucide-react` dengan animasi `animate-spin`)                                                                                                  |
| Sukses  | Form disembunyikan/di-reset, tampilkan pesan sukses inline (bukan `alert()` browser): "Thanks! I'll get back to you soon." dengan icon centang (`CheckCircle2` dari lucide-react), warna hijau lembut atau `--accent`               |
| Gagal   | Tampilkan pesan error inline: "Something went wrong. Please try again or email me directly." + tetap sediakan tombol retry. Data form yang sudah diisi user **tidak boleh hilang** saat gagal kirim (jangan reset form kalau error) |

Gunakan Framer Motion (`AnimatePresence`) untuk transisi antar state (form → success message) agar tidak berubah secara tiba-tiba/kasar.

---

## 6. BACKEND — NEXT.JS ROUTE HANDLER

### 6.1 Setup Resend

```bash
npm install resend
```

Environment variable (`.env.local`, JANGAN commit ke git — pastikan sudah ada di `.gitignore`):

```
RESEND_API_KEY=your_api_key_here
CONTACT_EMAIL_TO=akmalhard21@gmail.com
```

### 6.2 Struktur Route Handler

```
app/
  api/
    contact/
      route.ts     → menerima POST request dari form
```

### 6.3 Logic yang harus diimplementasikan di `route.ts`

1. Terima body request (nickname, fullName, email, subject, message).
2. Validasi ulang di server-side (jangan hanya andalkan validasi client — pakai skema Zod yang sama, di-share lewat file `lib/validations/contact.ts` agar tidak duplikasi logic).
3. Panggil Resend API untuk mengirim email:
   - **To:** `process.env.CONTACT_EMAIL_TO`
   - **From:** gunakan domain terverifikasi Resend, atau default `onboarding@resend.dev` jika belum setup custom domain
   - **Reply-To:** email milik pengirim (dari field form) — ini penting, agar saat Akmal klik "Reply" di Gmail, otomatis membalas ke pengirim, bukan ke alamat noreply Resend
   - **Subject:** gabungan perihal dari form, contoh: `[Portfolio Contact] {subject}`
   - **Body:** tampilkan semua field secara rapi (nickname, full name, email, pesan) dalam format HTML sederhana
4. Tangani error (mis. Resend API gagal/limit habis) dengan try-catch, kembalikan response JSON `{ success: false }` beserta status code sesuai (`500`).
5. Kembalikan response sukses `{ success: true }` dengan status `200` jika email berhasil terkirim.

### 6.4 Rate Limiting (disarankan, mencegah spam)

- Tambahkan pembatasan sederhana: maksimal 1 submit per (misal) 60 detik dari IP/browser yang sama, bisa memakai cara sederhana seperti `Map` in-memory di server (cukup untuk skala portofolio, tidak perlu Redis/database khusus) atau tambahkan honeypot field tersembunyi untuk mendeteksi bot.

---

## 7. WARNA (sesuai palet existing, TIDAK ADA WARNA BARU)

| Elemen               | Dark mode                                                                                | Light mode                |
| -------------------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| Card form background | `--jet-black`                                                                            | `--surface`               |
| Border card & input  | `--dark-teal`                                                                            | `--border`                |
| Input background     | `--ink-black`                                                                            | `--background`            |
| Label teks           | `--dark-teal-2`                                                                          | `--text-secondary`        |
| Tombol submit        | `--accent` bg, teks putih                                                                | `--accent` bg, teks putih |
| Pesan sukses         | `--accent` atau hijau lembut (pilih salah satu, konsisten)                               | sama                      |
| Pesan error          | merah semantic standar (bukan dari palet existing, karena butuh makna universal "error") | sama                      |

---

## 8. STRUKTUR FILE & KODE

```
components/
  sections/
    Contact.tsx           → section yang sudah ada, tambahkan <ContactForm /> di dalamnya
  ui/
    ContactForm.tsx        → komponen form baru
app/
  api/
    contact/
      route.ts              → route handler pengirim email via Resend
lib/
  validations/
    contact.ts              → skema Zod, dipakai bersama client & server
```

---

## 9. HAL YANG PERLU DISIAPKAN USER (BUKAN TUGAS AGENT CODING)

- [ ] Daftar akun di [resend.com](https://resend.com), generate API key
- [ ] Isi `.env.local` dengan `RESEND_API_KEY` dan `CONTACT_EMAIL_TO`
- [ ] (Opsional, untuk hasil lebih profesional) Verifikasi custom domain di Resend agar email "From" tidak memakai `onboarding@resend.dev`, melainkan domain milik sendiri (misal `contact@namadomainkamu.com`) — butuh domain aktif terlebih dahulu

---

## 10. CHECKLIST DEFINITION OF DONE

- [ ] Desain section Contact yang sudah ada (heading, social buttons, badge) TIDAK berubah
- [ ] Form baru berisi 5 field: Nickname, Full Name, Email, Perihal, Pesan
- [ ] Validasi client-side (React Hook Form + Zod) dan server-side (skema sama, tidak duplikasi logic)
- [ ] Email masuk ke Gmail Akmal dengan Reply-To otomatis ke email pengirim
- [ ] State loading, sukses, dan error masing-masing punya tampilan jelas, transisi halus (Framer Motion)
- [ ] Data form tidak hilang saat submit gagal
- [ ] API key Resend tersimpan di `.env.local`, tidak pernah ter-commit ke git, tidak terekspos ke client-side
- [ ] Ada mekanisme sederhana anti-spam (honeypot field atau rate limit dasar)
- [ ] Semua warna form memakai CSS variable dari `instruksi.md`, kecuali warna error yang memakai warna semantic standar
