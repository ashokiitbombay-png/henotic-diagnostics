# AI Agent & Developer Protocol & Mandatory Rules

> [!CRITICAL]
> **MANDATORY RULE BEFORE CODE CHANGES**:
> BEFORE WRITING OR MODIFYING A SINGLE LINE OF CODE IN THIS REPOSITORY, ANY AI AGENT OR DEVELOPER **MUST READ** ALL DOCUMENTATION FILES IN THE `docs/` DIRECTORY:
> 1. `docs/project.md`
> 2. `docs/design.md`
> 3. `docs/modelcontext.md`
> 4. `docs/agent.md`
>
> FAILURE TO READ AND COMPLY WITH THESE DOCUMENTS VOIDS CODE APPROVAL AND WILL CAUSE REGRESSION ERRORS.

---

## 1. Governance & Development Rules

### Rule 1: Read Documentation First
Always inspect `docs/project.md`, `docs/design.md`, `docs/modelcontext.md`, and `docs/agent.md` to understand system constraints, color palettes, data structures, and routing rules before editing code.

### Rule 2: Standalone Static Directory Safety Guarantee
Files placed inside `public/booking-system/` (such as `public/booking-system/index.html`) are standalone single-page applications. When modifying `public/booking-system/index.html` or static assets:
- **DO NOT** alter Next.js root layout headers, logos, site footers, or App Router pages.
- **DO NOT** modify GraphQL schemas or Apollo Client setup.
- Preserve all existing booking modalities, price calculators, and WhatsApp dispatch logic.

### Rule 3: Hydration Mismatch Prevention
Never invoke window, document, or browser-only APIs directly during SSR rendering. Always wrap client-side hydration in a `mounted` state check:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
if (!mounted) return null;
```

### Rule 4: Floating Widget Collision Avoidance
Maintain explicit coordinate separation for floating buttons:
- Floating WhatsApp & Call container MUST be at `bottom-[80px] md:bottom-8 right-4 md:right-6 z-50`.
- Google Customer Reviews badge MUST remain anchored at `BOTTOM_LEFT`.

### Rule 5: Empirical Verification & Testing
Editing a file does NOT equal completing a task. You MUST run:
```bash
# 1. Type Check
npx tsc --noEmit

# 2. Production Build Check
npm run build

# 3. PSEO Regression Crawl (when applicable)
npm run test:pseo
```

---

## 2. Git & Deployment Operations

1. **Commit Messages**: Follow standard conventional commits (`feat(scope): ...`, `fix(scope): ...`, `docs: ...`).
2. **Push Branch**: Always push clean commits to `origin main`.
3. **Deployment**: Trigger Vercel production deployment via `npx vercel --prod --yes` and verify production deployment status.

---

## 3. Incident Management & Recovery
- If a build fails due to missing environment variables or external API drops (e.g. headless WordPress timeouts), ensure local fallback JSON matrices or default fallbacks handle the request gracefully.
- Never delete unit tests or mask diagnostic errors. Fix underlying contract breaks empirically.
