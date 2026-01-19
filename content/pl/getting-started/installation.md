# Instalacja

## Gotowe w Mniej niż 5 Minut

Nucleify został zaprojektowany z myślą o natychmiastowej produktywności. Jedną komendą otrzymasz w pełni skonfigurowane środowisko deweloperskie - z backendem Laravel, frontendem Nuxt i bazą danych.

---

## Wymagania

Przed instalacją upewnij się, że masz:

| Wymaganie | Wersja | Komenda sprawdzająca |
|-----------|--------|---------------------|
| **Docker** | Najnowsza | `docker --version` |
| **Docker Compose** | Najnowsza | `docker compose version` |
| **Node.js** | 20.x+ | `node --version` |
| **Composer** | 2.x | `composer --version` |
| **Git** | Najnowsza | `git --version` |

---

## Instalacja Jedną Komendą

### 1. Sklonuj Repozytorium

```bash
git clone https://github.com/Nucleify/Nucleify.git
cd Nucleify
```

### 2. Uruchom Magiczną Komendę

```bash
make
```

**To wszystko!** ☕ Napij się kawy, podczas gdy Nucleify:

- Kopiuje konfigurację środowiska
- Instaluje zależności PHP przez Composer
- Instaluje zależności Node.js przez npm
- Konfiguruje hooki Git z Husky
- Buduje i uruchamia kontenery Docker
- Wykonuje migracje i seedery bazy danych

---

## Co Robi Komenda make?

Pod spodem komenda `make` wykonuje:

```bash
cp .env.docker.example .env                   # Konfiguracja środowiska
composer install                              # Zależności PHP
npm install                                   # Zależności Node.js
npm run prepare:husky                         # Hooki Git
./vendor/bin/sail up --build -d               # Kontenery Docker
./vendor/bin/sail art migrate:fresh --seed    # Baza danych
```

---

## Dostęp do Aplikacji

Po zakończeniu konfiguracji aplikacja jest gotowa:

| Usługa | URL |
|--------|-----|
| **Frontend (Nuxt)** | `http://localhost:3000` |
| **Backend (Laravel)** | `http://localhost` |
| **Baza danych (MySQL)** | `http://localhost:3306` |

---

## Instalacja Manualna (Alternatywa)

Jeśli wolisz nie używać Dockera:

### 1. Zainstaluj Zależności

```bash
composer install
npm install
```

### 2. Skonfiguruj Środowisko

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Konfiguracja Bazy Danych

Skonfiguruj bazę danych w `.env`, następnie:

```bash
php artisan migrate:fresh --seed
```

### 4. Uruchom Serwery Deweloperskie

```bash
# Terminal 1: Laravel
php artisan serve

# Terminal 2: Nuxt
npm run dev
```

---

## Rozwiązywanie Problemów

### Problemy z Dockerem

Jeśli kontenery nie uruchamiają się:

```bash
docker compose down -v
make
```

### Problemy z Uprawnieniami (Linux/Mac)

```bash
sudo chown -R $USER:$USER .
```

### Konflikty Portów

Jeśli porty 80, 3000 lub 3306 są zajęte, zaktualizuj `docker-compose.yml` lub zatrzymaj konfliktujące usługi.

---

## Następne Kroki

🎉 **Gratulacje!** Jesteś gotowy do budowania.

1. **[Szybki Start](/pl/docs/getting-started/quick-start)** - Stwórz swój pierwszy moduł
2. **[Przegląd Modułów](/pl/docs/modules/overview)** - Poznaj dostępne moduły
3. **[Architektura](/pl/docs/architecture/overview)** - Zrozum projektowanie systemu


