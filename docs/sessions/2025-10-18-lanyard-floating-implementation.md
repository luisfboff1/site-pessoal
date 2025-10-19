# Sessão: Lanyard Flutuante com Position Fixed

**Data:** 2025-10-18
**Workflow:** Twin Agents (analyst → planner → developer → reviewer → developer → tester → documenter)
**Iterações QA:** 2 (28/28 testes passaram na iteração final)

## Overview

Reimplementação completa do componente Lanyard 3D para flutuar livremente sobre a página usando position fixed, eliminando problemas de visibilidade, tamanho inadequado e comportamento inconsistente no primeiro load.

## Problemas Originais

1. **Visibilidade no Scroll**: Lanyard desaparecia ao scrollar (position relative dentro de section)
2. **Tamanho Inadequado**: Apenas 224px (muito pequeno para impacto visual)
3. **Confinamento**: Preso dentro da section hero, não "flutuando" livremente
4. **Flash no Load**: Aparecia e sumia no primeiro carregamento (asset checking assíncrono)
5. **Background Obstrutivo**: Section com fundo impedia efeito de flutuação

## Mudanças Implementadas

### 1. Reestruturação de Posicionamento (`app/page.tsx`)

**Antes:**
```tsx
<section className="relative">
  <Lanyard />
</section>
```

**Depois:**
```tsx
{/* Root level - fora de sections */}
{!isMobile && <Lanyard />}

{/* Tamanho responsivo via prop */}
size={viewportWidth >= 1440 ? 450 : 350}
```

### 2. Layout Fixed (`components/Lanyard.tsx`)

**Mudanças principais:**
- Container: `fixed z-40 pointer-events-none top-32 right-8`
- Canvas: `pointer-events-auto` (mantém interatividade de drag)
- z-index 40 (abaixo navbar z-50, acima conteúdo z-20)
- Asset checking removido (eliminado flash no load)

### 3. Responsividade

- **Breakpoint mobile**: 768px → 1024px (consistência com projeto)
- **Tamanho dinâmico**: 350px (<1440px), 450px (≥1440px)
- **Desktop only**: Escondido em mobile para performance

## Decisões Técnicas

### Position Fixed vs Absolute
**Escolha:** Fixed
**Razão:** Garante que Lanyard permanece visível durante scroll, flutuando sobre todo conteúdo independente da posição da página.

### z-index Hierarchy
**Valor:** 40
**Razão:** Acima de seções (z-20) mas abaixo do navbar (z-50), mantendo navegação acessível.

### Pointer Events Strategy
**Container:** `pointer-events-none`
**Canvas:** `pointer-events-auto`
**Razão:** Container não bloqueia cliques em elementos abaixo, mas Canvas mantém drag/interação 3D.

### Asset Checking Removal
**Antes:** Verificação assíncrona de `/Cargo.glb`
**Depois:** Renderização direta
**Razão:** Eliminação de flash visual no primeiro load; modelo sempre disponível em produção.

### Tamanho Responsivo
**Valores:** 350px / 450px baseado em viewport width
**Razão:** 350px para telas médias evita overflow, 450px para desktops grandes maximiza impacto visual.

## Issues Encontrados e Corrigidos

### Iteração 1 - twin-reviewer

**Issue 1: Conflito de Posicionamento**
- **Problema:** `top-24` (96px) conflitava com padding-top do hero
- **Solução:** `top-32` (128px) para espaçamento adequado

**Issue 2: Tamanho vs Viewport**
- **Problema:** Fixed 450px causava overflow em telas médias
- **Solução:** Tamanho responsivo baseado em viewport width (≥1440px)

**Issue 3: Inconsistência de Breakpoint**
- **Problema:** Mobile breakpoint 768px diferente do resto do projeto (1024px)
- **Solução:** Unificação para 1024px

### Iteração 2 - twin-tester

**Status:** 28/28 testes passaram (100%)

**Validações realizadas:**
- Visibilidade durante scroll (top, meio, bottom da página)
- Tamanho responsivo em diferentes viewports (1920px, 1366px, 1024px)
- z-index hierarchy (Lanyard abaixo de navbar, acima de conteúdo)
- Interatividade de drag mantida
- Sem flash no primeiro load
- Desktop only (hidden em mobile)
- Position fixed funcionando
- Posicionamento correto (top-right)

## Layout Final

```
┌─────────────────────────────────────┐
│ Navbar (z-50)                       │
├─────────────────────────────────┬───┤
│                                 │ L │ ← Lanyard (z-40, fixed)
│ Hero Section (z-20)             │ a │   Position: top-32 right-8
│                                 │ n │   Size: 350px/450px
│                                 │ y │   Pointer-events strategy
├─────────────────────────────────┤ a │
│ Services Section                │ r │
│                                 │ d │
│ [scroll]                        │   │ ← Permanece visível
│                                 │ ( │
│ Footer                          │ f │
│                                 │ i │
└─────────────────────────────────┴ x─┘
                                  └───┘
```

## Arquivos Modificados

1. **`app/page.tsx`**
   - Lanyard movido para root level (fora de sections)
   - Prop `size` responsiva baseada em viewport width
   - Desktop only (`!isMobile`)
   - Breakpoint atualizado: 1024px

2. **`components/Lanyard.tsx`**
   - Container: `fixed z-40 pointer-events-none top-32 right-8`
   - Canvas: `pointer-events-auto`
   - Asset checking removido
   - Aceita prop `size` dinâmico

## Resultados

- Lanyard permanece visível durante todo o scroll
- Tamanho adequado e responsivo (350-450px)
- Sem flash no primeiro load
- z-index correto (abaixo navbar, acima conteúdo)
- Drag/interação 3D mantidos
- Performance preservada (desktop only)
- 100% dos testes QA passaram na iteração final
