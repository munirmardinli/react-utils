# ⚛️ React Utils

A collection of essential React hooks, state management utilities, and helper functions for modern React applications.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Version](https://img.shields.io/github/package-json/v/munirmardinli/react-utils?color=green&label=version)](https://github.com/munirmardinli/react-utils)
[![TypeScript](https://img.shields.io/badge/lang-typescript-3178C6.svg)](https://www.typescriptlang.org/)
[![Docs](https://img.shields.io/badge/docs-typedoc-blueviolet.svg)](https://munirmardinli.github.io/react-utils//)
[![GitHub Issues](https://img.shields.io/github/issues/munirmardinli/react-utils)](https://github.com/munirmardinli/react-utils/issues)
[![GitHub Stars](https://img.shields.io/github/stars/munirmardinli/react-utils)](https://github.com/munirmardinli/react-utils/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/munirmardinli/react-utils)](https://github.com/munirmardinli/react-utils/network/members)

<a href="https://www.buymeacoffee.com/munirmardinli" target="_blank">
  <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=munirmardinli&button_colour=40DCA5&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" />
</a>

## ✨ Features

- **🚀 State Management**: Pre-configured Zustand stores
- **🔄 Custom Hooks**: Reusable React logic
- **🛡️ Type Safety**: Full TypeScript support
- **🌐 SSR Compatible**: Works with Next.js, Remix

## 📦 Installation

```bash
npm install @munirmardinli_org/react-utils
# or
yarn add @munirmardinli_org/react-utils
# or
pnpm add @munirmardinli_org/react-utils
```

## 🏗️ Project Structure

```txt
src/
├── hooks/          # Custom React hooks (useAuth, useBreakpoint, etc.)
│   ├── useAuthHook.ts
│   ├── useBreakpoint.ts
│   ├── useLanguageEffect.ts
│   ├── usePostRequest.ts
│   ├── useThemeFromCookies.ts
├── stores/
│   ├── changeLanguageStore.ts
│   ├── changeModeStore.ts
│   └── selectedLanguageMenuStore.ts
│   └── snackbarStore.ts
│   └── useCookieStore.ts
├── utils/          # Helper functions
│   └── globals.ts
├── types.d.ts      # Type declarations
└── index.ts        # Public API exports
```

## 🔌 Available Stores

1. `🎨 useThemeStore`

   Manages application theme with persistence.

   **Features**:

   - Light/dark mode
   - High contrast mode support
   - Synchronization with CSS variables

   ```tsx
   const { mode, toggleMode } = useThemeStore();

   // Example usage
   <button onClick={toggleMode}>
     Switch to {mode === "light" ? "dark" : "light"} mode
   </button>;
   ```

2. `🌐 useLanguageStore`

   Handles multilingual support with:

   - Language persistence
   - Automatic cookie management
   - Theme synchronization

   ```tsx
   const { languageSelected, setLanguage } = useChangeLanguageStore();
   ```

3. `💬 useSnackStore`

   Global notification system.

   - 4 severity levels `(error | warning | success | info)`
   - Auto-dismissal timer
   - Actionable snackbars

   ```tsx
   const { setSnack } = useSnackStore();

   // Basic usage
   setSnack("Profile updated!", "success");

   // With action
   setSnack({
     message: "File deleted",
     severity: "warning",
     action: { label: "Undo", onClick: handleUndo },
   });
   ```

4. `useCookieStore`

   Secure authentication token management.

   ```tsx
   const { authToken, setAuthToken, removeAuthToken } = useCookieStore();

   // Login flow
   const handleLogin = async () => {
     const token = await authService.login();
     setAuthToken(token);
   };

   // Logout
   const handleLogout = () => {
     removeAuthToken();
   };
   ```

5. `useChangeLanguageStore`

   Handles multilingual support with automatic persistence.

   **Features**

   - Language preference cookies
   - LocalStorage fallback
   - DevTools integration

  ```tsx
  const { languageSelected, setLanguage } = useChangeLanguageStore();

  <select value={languageSelected} onChange={(e) => setLanguage(e.target.value)}>
    <option value="en">English</option>
    <option value="fr">Français</option>
  </select>;
  ```

## 🌀 Core Hooks

### useLanguageEffect()

Handles language selection persistence by:

- Fetching translation files from API when language changes
- Synchronizing language preference with cookies
- Restoring language preference from cookies on initial load

```tsx
// Basic usage:
useLanguageEffect();

// With store access:
const { languageSelected } = useChangeLanguageStore();
useLanguageEffect();
```

### useThemeFromCookies()

Manages theme synchronization by:

- Reading theme preferences from cookies on initial load
- Applying theme settings to both state manager and DOM
- Supporting both color mode (light/dark) and high contrast mode

```tsx
// Basic usage:
useThemeFromCookies();

// With store access:
const { mode } = useThemeStore();
useThemeFromCookies();
```

### useBreakpoint()

Responsive design helper with TypeScript support.

```tsx
const { isMobile, current } = useBreakpoint();

return (
  <div className={isMobile ? "mobile-layout" : "desktop-layout"}>
    Current breakpoint: {current}
  </div>
);
```

**Return Type:**

```ts
type BreakpointResult {
  isMobile: boolean;    // width < 768px
  isTablet: boolean;    // 768px ≤ width < 1024px
  isDesktop: boolean;   // width ≥ 1024px
  current: 'mobile' | 'tablet' | 'desktop'; // Current breakpoint
}
```

### useAuthHook()

JWT authentication with automatic token validation.

```tsx
const { user, isLoading } = useAuthHook();

if (isLoading) return <Spinner />;
if (!user) return <LoginPage />;

return <WelcomeBanner name={user.name} />;
```

**Features:**

- Token expiration checks
- Custom user type support via generics
- Loading/error states

### usePost()

Type-safe POST requests with built-in state.

```tsx
// With auto-execution
const { data } = usePost<User>({
  path: "/api/users",
  body: { name: "Alice" },
});

// Manual execution
const { sendPostRequest } = usePost<Product>();
const handleSubmit = () =>
  sendPostRequest({ path: "/products", body: product });
```

## ⚙️ Configuration

Set environment variables for cookie settings:

```dotenv
COOKIE_MAX_AGE=2592000  # 30 days
COOKIE_PATH=/           # Accessible site-wide
COOKIE_SAME_SITE=lax    # CSRF protection
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License

**MIT License** © [Munir Mardinli](https://linktr.ee/munirmardinli)

<details>
<summary>Full License Text</summary>

```text
MIT License

Copyright (c) 2025 Munir Mardinli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

</details>
