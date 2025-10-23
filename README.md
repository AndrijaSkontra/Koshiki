# Koshiki

<p align="center">
  <img src="koshiki.png" alt="Koshiki logo" />
</p>

## Description

A modern web application built with a powerful tech stack combining server-side rendering and dynamic client interactions. This project leverages NestJS for the backend framework, Handlebars for templating, HTMX for seamless dynamic content updates, TailwindCSS with DaisyUI for styling, and Supabase for authentication and database management.

## Technologies Used

### Backend & Architecture

#### NestJS
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" /></a>
</p>

[NestJS](https://nestjs.com/) is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

**How it's used in this project:**
- Provides the core application structure with modules, controllers, and services
- Handles HTTP routing and request/response management
- Integrates with Express.js as the underlying HTTP server
- Manages dependency injection for clean, testable code
- Configuration in `src/main.ts` where the app is bootstrapped and view engine is set up

### Frontend & Templating

#### Handlebars (HBS)
<p align="center">
  <a href="https://handlebarsjs.com/" target="blank"><img src="https://handlebarsjs.com/handlebars-icon.svg" width="80" alt="Handlebars Logo" /></a>
</p>

[Handlebars](https://handlebarsjs.com/) is a minimal templating engine that provides the power necessary to let you build semantic templates effectively with no frustration.

**How it's used in this project:**
- Server-side rendering of HTML templates (`.hbs` files)
- Template files located in various view directories (e.g., `src/auth/views/`, `src/dashboard/views/`, `src/main/views/`)
- Supports partials for reusable components (e.g., `layout.hbs`, `sidebar-layout.hbs`)
- Dynamic content injection using Handlebars expressions `{{variable}}`
- Helper functions for conditional rendering and loops
- Configured in `src/main.ts` with `app.setViewEngine('hbs')`

**Example template structure:**
```handlebars
<html lang='en'>
  <head>
    <title>{{title}}</title>
  </head>
  <body>
    {{> (getPartial) }}
  </body>
</html>
```

#### HTMX
<p align="center">
  <a href="https://htmx.org/" target="blank"><img src="https://htmx.org/img/htmx_logo.1.png" width="80" alt="HTMX Logo" /></a>
</p>

[HTMX](https://htmx.org/) allows you to access modern browser features directly from HTML, rather than using JavaScript. It enables dynamic, interactive web applications with minimal JavaScript code.

**How it's used in this project:**
- Loaded via script tag in the main layout: `<script src='/htmx.js'></script>`
- `hx-boost` attribute on the body tag enables progressive enhancement for navigation
- Provides seamless page transitions without full page reloads
- Allows for partial HTML updates and dynamic content loading
- Enables SPA-like experiences while maintaining server-side rendering benefits

**Key HTMX features utilized:**
- **hx-boost**: Automatically converts links and forms to AJAX requests
- **hx-get/hx-post**: Make HTTP requests directly from HTML elements
- **hx-target**: Specify where response content should be inserted
- **hx-swap**: Control how content is swapped into the page

### Styling

#### TailwindCSS
TailwindCSS is a utility-first CSS framework for rapidly building custom user interfaces.

**How it's used in this project:**
- Configured with custom build process: `npx @tailwindcss/cli -i ./tailwind/input.css -o ./public/output.css --watch`
- Provides utility classes for styling components
- Output CSS served from `/public/output.css`
- Enables responsive design with mobile-first approach

#### DaisyUI
DaisyUI is a component library built on top of TailwindCSS, providing pre-designed UI components.

**How it's used in this project:**
- Installed as a dev dependency
- Provides styled components like buttons, cards, navbars, etc.
- Maintains Tailwind's utility-first approach while offering semantic component classes

### Backend Services

#### Supabase
Supabase is an open-source Firebase alternative providing authentication, database, and real-time subscriptions.

**How it's used in this project:**
- Client and SSR packages installed: `@supabase/supabase-js` and `@supabase/ssr`
- Handles user authentication and session management
- Provides PostgreSQL database for data persistence
- Manages user credentials and secure authentication flows

## Project Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Supabase account (for authentication and database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Koshiki
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```bash
PORT=4000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Build TailwindCSS (run in a separate terminal):
```bash
npm run tailwind
```

This watches for changes and rebuilds your CSS automatically.

## Running the Application

### Development Mode

Start the NestJS application with hot-reload:
```bash
npm run start:dev
```

The application will be available at `http://localhost:4000` (or your configured PORT).

**Note**: Make sure to run `npm run tailwind` in a separate terminal to watch and compile CSS changes.

### Production Mode

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm run start:prod
```

### Available Scripts

```bash
# Development with auto-reload
npm run start:dev

# Development with debugging
npm run start:debug

# Build for production
npm run build

# Start production server
npm run start:prod

# Watch and compile TailwindCSS
npm run tailwind

# Format code with Prettier
npm run format

# Lint code
npm run lint
```

## Code Formatting

### djlint for Handlebars Templates

This project uses [djlint](https://djlint.com/) for formatting `.hbs` (Handlebars) template files. djlint is a linter and formatter for HTML template languages.

#### Installation

Install djlint globally using pip:

```bash
pip install djlint
```

Or using pipx (recommended):

```bash
pipx install djlint
```

#### Usage

Format a specific `.hbs` file:

```bash
djlint path/to/your/file.hbs --reformat
```

Format all `.hbs` files in a directory:

```bash
djlint src/ --reformat --extension=hbs
```

Check formatting without making changes:

```bash
djlint src/ --check --extension=hbs
```

Format all `.hbs` files in the project:

```bash
djlint . --reformat --extension=hbs
```

#### Common Options

- `--reformat`: Format and modify files in place
- `--check`: Check files without modifying them (useful for CI/CD)
- `--extension=hbs`: Specify file extension to process
- `--indent 2`: Set indentation to 2 spaces (default is 4)

## How the Technologies Work Together

This application follows a modern web architecture pattern:

1. **NestJS Backend**: Handles routing, business logic, and renders Handlebars templates
2. **Handlebars Templates**: Generate HTML on the server with dynamic data
3. **HTMX**: Enhances the frontend with dynamic interactions without writing JavaScript
4. **TailwindCSS + DaisyUI**: Provides styling through utility classes and pre-built components
5. **Supabase**: Manages authentication, database, and user sessions

### Request Flow Example

```
User clicks a link with hx-boost
    ↓
HTMX intercepts the click and makes an AJAX request
    ↓
NestJS controller receives the request
    ↓
Controller fetches data from Supabase
    ↓
Controller renders Handlebars template with data
    ↓
HTMX receives the HTML response
    ↓
HTMX swaps the content into the page (no full reload)
```

## Templating Architecture: The Interceptor Pattern

This project uses a custom interceptor-based templating system rather than NestJS's built-in `@Render()` decorator. This provides greater flexibility for layout selection and dynamic rendering.

### The HtmlInterceptor

The core of the templating system is the `HtmlInterceptor` located in `src/common/html.interceptor.ts`. It intercepts controller responses and wraps content in the appropriate layout.

**Key Components:**

1. **HtmlInterceptor** (`src/common/html.interceptor.ts`):
   - Processes responses from controllers decorated with `@InjectHtml()`
   - Dynamically selects layouts based on device type or explicit selection
   - Handles Handlebars compilation and partial registration

2. **Helper Functions** (`src/common/helper.ts`):
   - `koshiki(html, type, templateValues?)`: Prepares the response object for the interceptor
   - `getLayoutType(userAgent)`: Determines layout based on device (mobile vs desktop)

3. **Types** (`src/common/types.ts`):
   - `LayoutType`: `'sidebar' | 'card' | 'dock'` - Available layout options

### How the Interceptor Flow Works

```
1. Request arrives at controller
   ↓
2. AuthInterceptor validates session (if not @Public)
   ↓
3. Controller handler executes
   ↓
4. Handler returns koshiki(template, layoutType, data)
   ↓
5. HtmlInterceptor processes response:
   - Registers Handlebars helper with content data
   - Selects layout based on layoutType
   - Compiles and renders final HTML
   ↓
6. Complete HTML response sent to client
```

**Important Interceptor Logic:**

- The interceptor checks for `@InjectHtml()` decorator metadata
- It extracts `{ type, data }` from the controller response
- `data` is a unique partial name registered by `koshiki()`
- The partial contains your compiled template with injected values
- Layout selection is dynamic: sidebar (desktop), dock (mobile), or card (centered)

### Usage Example: Creating a New Page

1. **Create a controller with the interceptor decorators:**

```typescript
import { Controller, Get, Header, Headers } from '@nestjs/common';
import { InjectHtml } from '../common/inject-html.decorator';
import { koshiki, getLayoutType } from '../common/helper';
import { TemplateService } from '../template/template.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly template: TemplateService) {}

  @Get()
  @InjectHtml()  // Enables the HtmlInterceptor
  @Header('Content-Type', 'text/html')
  getExample(@Headers() headers: Headers) {
    // Determine layout based on device
    const layout = getLayoutType(headers['user-agent']);

    // Template data to inject
    const data = {
      message: 'Hello from NestJS!',
      items: ['Item 1', 'Item 2', 'Item 3']
    };

    // Load your template string (from TemplateService or inline)
    const templateHtml = `
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{{message}}</h2>
          <ul>
            {{#each items}}
              <li>{{this}}</li>
            {{/each}}
          </ul>
          <button
            hx-get="/api/data"
            hx-target="#result"
            class="btn btn-primary">
            Load Data
          </button>
          <div id="result"></div>
        </div>
      </div>
    `;

    // koshiki compiles the template with data and prepares for interceptor
    return koshiki(templateHtml, layout, data);
  }
}
```

2. **For static templates, add to TemplateService:**

In `src/template/template.service.ts`:

```typescript
@Injectable()
export class TemplateService implements OnModuleInit {
  // ... existing templates
  public examplePage: string;

  onModuleInit() {
    // ... existing template loading
    this.examplePage = fs.readFileSync(
      path.join(process.cwd(), 'src/example/views/example.hbs'),
      'utf8',
    );
  }
}
```

Then use in controller:

```typescript
@Get()
@InjectHtml()
@Header('Content-Type', 'text/html')
getExample(@Headers() headers: Headers) {
  const layout = getLayoutType(headers['user-agent']);
  return koshiki(this.template.examplePage, layout, { message: 'Hello!' });
}
```

### Layout Types Explained

- **`sidebar`**: Desktop layout with navigation sidebar (used for main dashboard)
- **`card`**: Centered card layout (used for login/auth pages)
- **`dock`**: Mobile layout with bottom navigation dock
- **Automatic selection**: Use `getLayoutType(userAgent)` to automatically choose between sidebar and dock

### Key Differences from Standard NestJS

- **No `@Render()` decorator** - Uses `@InjectHtml()` instead
- **No direct template paths** - Templates are loaded as strings via TemplateService
- **Dynamic layouts** - Layout selection happens at runtime based on device or logic
- **Helper function pattern** - `koshiki()` prepares the response for the interceptor
- **Global interceptor** - Registered once in `app.module.ts`, works everywhere

### Working with Handlebars Partials

Partials allow you to reuse template components:

```handlebars
{{!-- layout.hbs --}}
<html>
  <body>
    {{> (getPartial) }}
  </body>
</html>

{{!-- sidebar-layout.hbs --}}
<div class="drawer">
  <div class="drawer-content">
    {{> content}}
  </div>
</div>
```

### HTMX Patterns Used

```html
<!-- Progressive enhancement with hx-boost -->
<body hx-boost>
  <a href="/dashboard">Dashboard</a> <!-- Becomes AJAX request -->
</body>

<!-- Dynamic content loading -->
<button hx-get="/api/stats" hx-target="#stats">
  Refresh Stats
</button>
<div id="stats"></div>

<!-- Form submission without page reload -->
<form hx-post="/api/submit" hx-target="#response">
  <input type="text" name="data" />
  <button type="submit">Submit</button>
</form>
```

## Project Structure

```
Koshiki/
├── src/
│   ├── auth/
│   │   └── views/          # Authentication templates
│   ├── dashboard/
│   │   └── views/          # Dashboard templates
│   ├── main/
│   │   └── views/          # Main layout templates
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
├── public/                 # Static assets (CSS, JS, images)
├── tailwind/
│   └── input.css           # TailwindCSS source
├── views/                  # Compiled view templates
└── package.json
```
