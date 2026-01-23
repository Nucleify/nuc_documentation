# Zmienne środowiskowe

Nucleify używa zmiennych środowiskowych do konfiguracji. Skopiuj `.env.example` do `.env` i skonfiguruj.

## Wymagane zmienne

| Zmienna | Opis | Przykład |
|---------|------|----------|
| `APP_URL` | URL aplikacji | `http://localhost:8000` |
| `APP_ENV` | Środowisko | `local`, `production` |
| `APP_KEY` | Klucz szyfrowania Laravel | `base64:...` |
| `DB_CONNECTION` | Sterownik bazy danych | `mysql`, `pgsql`, `sqlite` |
| `DB_DATABASE` | Nazwa bazy danych | `nucleify` |

## Zmienne frontend

| Zmienna | Opis | Domyślnie |
|---------|------|-----------|
| `API_URL` | URL endpointu API | `${APP_URL}/api` |
| `SSR` | Włącz server-side rendering | `true` |

## SSR i Prerendering

```env
SSR=true
PRERENDER_ROUTES=/,/home,/docs
PRERENDER_CRAWL_LINKS=true
PRERENDER_IGNORE=/admin,/login
```

| Zmienna | Opis |
|---------|------|
| `SSR` | Włącz/wyłącz SSR |
| `PRERENDER_ROUTES` | Trasy do prerenderowania (przecinek) |
| `PRERENDER_CRAWL_LINKS` | Auto-odkrywanie linków podczas prerender |
| `PRERENDER_IGNORE` | Trasy do pominięcia podczas prerender |

## Baza danych

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nucleify
DB_USERNAME=root
DB_PASSWORD=secret
```

## Mail

```env
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## Cache i sesja

```env
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

Na produkcji rozważ użycie `redis` dla cache, sesji i kolejki.

## Przykład `.env`

```env
APP_NAME=Nucleify
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

API_URL=http://localhost:8000/api
SSR=true

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nucleify
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

