# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Luis Fernando Boff, showcasing work in solar energy, full-stack development, and data science. The site features advanced 3D graphics, interactive animations, and modern web technologies.

## Development Commands

### Basic Commands
```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Twin Development Workflow

This project includes a sophisticated development workflow powered by specialized AI agents. These agents work together to analyze, plan, implement, review, test, and document features.

### Available Agents

Located in `.claude/agents/`:

- **twin-analyst** (`red`) - Analyzes the codebase to understand what exists and what needs to change
- **twin-planner** (`green`) - Creates focused technical implementation plans with file-by-file breakdown
- **twin-developer** (`blue`) - Implements JavaScript/TypeScript code following functional programming principles
- **twin-reviewer** (`purple`) - Reviews code for quality, security, performance, and best practices
- **twin-tester** - Performs manual QA validation using Playwright (frontend) or curl (backend)
- **twin-documenter** (`orange`) - Documents work completed during development sessions

### Workflow Command

Use the `/twin-workflow` command to execute a complete development cycle:

```bash
# Start a new feature or bug fix
/twin-workflow "add user profile settings page"

# With specific quality level
/twin-workflow "refactor authentication" --quality=balanced

# Quality levels: pragmatic (default), balanced, strict
```

The workflow operates in two phases:

#### Phase 1: Planning
- Runs `twin-analyst` to analyze the codebase
- Runs `twin-planner` to create implementation plan
- Saves plan to `twin-plan-current.md`
- **Stops and waits for approval**

#### Phase 2: Execution (after typing "ok" or "continue")
- **Development Loop** until all QA tests pass:
  1. `twin-developer` implements/fixes the code
  2. `twin-reviewer` reviews for quality and standards
  3. `twin-tester` performs manual QA validation
  4. If bugs found → back to step 1 with bug report
  5. If tests pass → proceed to documentation
- `twin-documenter` creates session documentation
- Archives plan to `twin-plans/[timestamp]-plan.md`

### Workflow Features

- **Automatic QA Loop**: Code is tested manually and bugs are sent back to developer until all tests pass
- **Frontend Testing**: Uses Playwright MCP to test features in real browser (clicks, forms, navigation)
- **Backend Testing**: Uses curl and Node.js scripts to validate APIs
- **Plan History**: Archived in `twin-plans/` directory with timestamps
- **Session Documentation**: Created in `docs/sessions/` after completion
- **Editable Plans**: You can edit `twin-plan-current.md` before approving

### Agent Principles

All agents follow these core principles:

**twin-developer** (Functional Programming):
- Only `const` declarations (no `let` or `var`)
- Pure functions and immutability
- No comments - self-documenting code with descriptive names
- No shared mutable state
- Function composition over classes

**twin-reviewer** (Quality Standards):
- Checks functional programming adherence
- Security vulnerability assessment
- Performance analysis
- UI/UX conformance (frontend projects - verifies component reuse)
- Bug fix validation against QA reports

**twin-tester** (Manual QA):
- NOT creating test files - testing real functionality
- Frontend: Uses Playwright to interact with browser
- Backend: Uses curl and scripts to test APIs
- Tests happy path, edge cases, error handling
- Reports bugs with reproduction steps and screenshots

**twin-planner** (Context-Aware):
- For frontend: Identifies existing UI components to reuse
- For backend: Follows API/service patterns
- Includes QA validation plan for twin-tester
- Focuses on what was requested - no scope creep

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router with React 19)
- **Styling**: Tailwind CSS v4 with custom theme variables
- **Animations**: Framer Motion, GSAP (@gsap/react)
- **3D Graphics**: Three.js with React Three Fiber (@react-three/fiber, @react-three/drei, @react-three/rapier)
- **UI Components**: Custom components with shadcn/ui patterns
- **TypeScript**: Strict mode enabled

### Project Structure

```
app/
├── layout.tsx              # Root layout with metadata, fonts, Google Analytics
├── page.tsx                # Main landing page (client component)
├── globals.css             # Tailwind v4 with custom theme variables
├── robots.ts               # SEO robots configuration
├── sitemap.ts              # SEO sitemap
└── portfolio/              # Portfolio category pages
    ├── desenvolvimento/    # Development projects
    ├── energia-solar/      # Solar energy projects
    └── ciencia-dados/      # Data science projects

components/
├── ui/                     # Base UI components (navbar-menu, etc.)
├── sections/               # Page sections (ServicesSection, Footer, etc.)
├── LiquidEther.tsx         # WebGL fluid simulation background
├── Lanyard.tsx             # 3D hero component
├── TechRollingGallery.tsx  # 3D tech stack carousel
├── InfiniteMenu.tsx        # Portfolio project gallery
├── EvaBot.tsx              # 3D chatbot component
├── SplitText.tsx           # GSAP text animation
├── ProfileCard.tsx         # Profile display component
└── SharedNavbar.tsx        # Shared navigation component

lib/
└── utils.ts                # Utility functions (cn for className merging)

types/
└── global.d.ts             # Type declarations for .glb, .png, meshline module

.claude/
├── commands/
│   └── twin-workflow.md    # Main workflow orchestration
└── agents/                 # Specialized AI agents
    ├── twin-analyst.md
    ├── twin-planner.md
    ├── twin-developer.md
    ├── twin-reviewer.md
    ├── twin-tester.md
    └── twin-documenter.md
```

### Key Architecture Patterns

#### Dynamic Imports for Performance
Heavy 3D components are dynamically imported with `{ ssr: false }` to prevent server-side rendering issues:
- `LiquidEther` - WebGL fluid simulation
- `EvaBot` - 3D robot chatbot
- `Lanyard` - 3D hero section
- `TechRollingGallery` - 3D tech carousel
- `InfiniteMenu` - Portfolio gallery

#### Client Components
Most components use `'use client'` directive due to:
- Framer Motion animations
- Three.js/WebGL rendering
- GSAP animations
- Interactive state management

#### Custom Fluid Simulation (LiquidEther)
The `LiquidEther` component implements a custom WebGL-based fluid dynamics simulation:
- Uses Three.js `WebGLRenderTarget` for GPU-accelerated physics
- Implements Navier-Stokes equations with:
  - Advection (BFECC method)
  - External force application (mouse/touch)
  - Viscous diffusion (optional)
  - Divergence calculation
  - Poisson pressure solver
  - Pressure gradient subtraction
- Features auto-demo mode with smooth takeover transitions
- Performance optimizations:
  - Intersection Observer for pause/resume
  - Resolution scaling
  - Mobile detection for reduced quality

#### Metadata & SEO
Comprehensive metadata in `app/layout.tsx`:
- Open Graph tags for social sharing
- Twitter Card configuration
- Google Analytics 4 integration (placeholder ID needs replacement)
- Structured keywords for SEO
- Robots and sitemap files

#### Styling System
- Tailwind CSS v4 with `@theme inline` configuration
- Custom CSS variables for theming
- Dark mode enabled by default (`className="dark"` on html)
- shadcn/ui component patterns
- `cn()` utility for conditional className merging

## Path Aliases

TypeScript path mapping configured in `tsconfig.json`:
```typescript
"@/*" // Maps to root directory
```

Used throughout for imports:
```typescript
import { cn } from '@/lib/utils';
import SplitText from '@/components/SplitText';
```

## Important Notes

### Google Analytics
The GA4 tracking ID in `app/layout.tsx` is a placeholder (`G-XXXXXXXXXX`). Replace with actual tracking ID before deployment.

### WebGL/Three.js Components
- Always use `dynamic()` with `{ ssr: false }` for Three.js components
- Components automatically handle cleanup in useEffect returns
- ResizeObserver and IntersectionObserver used for performance
- Mobile-specific optimizations are critical for performance

### Animation Libraries
- **Framer Motion**: Used for page transitions, scroll-based animations, hover effects
- **GSAP**: Used primarily for complex text animations (SplitText component)
- Both libraries are used together intentionally for different use cases

### Type Safety
- Custom type declarations in `types/global.d.ts` for:
  - `.glb` model files
  - `.png` image files
  - `meshline` package JSX elements
- Strict TypeScript mode enabled

### Portfolio Pages
Portfolio category pages follow a consistent pattern:
- Dynamic imports for 3D components
- Project data as arrays of objects with image, link, title, description
- `InfiniteMenu` component for displaying projects
- Shared navbar component
- Mobile-specific UI hints

## Common Tasks

### Using the Twin Workflow for Development

**For implementing new features or fixing bugs:**

1. Start the workflow:
   ```bash
   /twin-workflow "describe the task here"
   ```

2. Review the generated plan in `twin-plan-current.md`

3. **Optional**: Edit the plan file if you want to modify the approach

4. Type `ok`, `continue`, or `approve` to execute the plan

5. The workflow automatically:
   - Implements the code (twin-developer)
   - Reviews for quality (twin-reviewer)
   - Tests manually with real browser/API calls (twin-tester)
   - Fixes bugs if QA finds issues (loops back to developer)
   - Documents the session (twin-documenter)
   - Archives the plan to `twin-plans/`

**Example workflow session:**
```bash
# Start
/twin-workflow "add dark mode toggle to settings"

# [Plan is created and shown]
# [Edit twin-plan-current.md if needed]

# Continue
ok

# [Automatic execution with QA loop]
# [Session documentation created]
# [Plan archived]
```

### Adding New Components
1. Create component in appropriate folder (`components/` or `components/sections/`)
2. Use `'use client'` if using animations or browser APIs
3. For Three.js components, ensure dynamic import with `{ ssr: false }`
4. Export and import using `@/` path alias

### Adding New Portfolio Category
1. Create new folder under `app/portfolio/`
2. Create `page.tsx` following existing portfolio page patterns
3. Define project array with image, link, title, description
4. Update navbar menu items in `app/page.tsx`

### Modifying Animations
- Framer Motion: Look for `motion.*` components and their props
- GSAP: Check `SplitText.tsx` for text animations
- Custom animations: May involve Three.js shaders in `LiquidEther.tsx`

### Performance Optimization
- Use dynamic imports for heavy components
- Implement IntersectionObserver for lazy rendering
- Use ResizeObserver for responsive WebGL canvases
- Consider mobile-specific reduced quality settings for 3D graphics

## Quality Levels

When using `/twin-workflow`, you can specify quality level:

- **pragmatic** (default): Direct, working solutions without over-engineering
- **balanced**: Thoughtful abstractions with comprehensive error handling
- **strict**: Full design patterns, all edge cases, maximum reusability

Example:
```bash
/twin-workflow "add user authentication" --quality=strict
```
