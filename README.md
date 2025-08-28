# Cara Jalanin projek

1. JInstall composer + npm:
   - `composer install`
   - `npm install`

2. Duplikat file `.env.example` rename jadi `.env`.

3. Cek bagian database di file `.env`, setup nama databasenya.

4. migrasi db:
   - `php artisan migrate`

5. Generate app key:
   - `php artisan key:generate`

6. Jalanin build asset:
   - `npm run dev`

7. Jalanin server lokal:
   - `php artisan serve`

---

## Setup Email
- Buat akun di [Mailtrap](https://mailtrap.io/).
- Setup SMTP sesuai dengan akun masing-masing.

- Contoh:
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=d3b2baee13c....
MAIL_PASSWORD=9718f473..
