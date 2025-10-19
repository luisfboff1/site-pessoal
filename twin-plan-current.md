# Twin Development Plan
Generated: 2025-10-18
Task: "Adicionar ProfileCard do React Bits convertendo de CSS puro para Tailwind CSS, mantendo TODOS os efeitos visuais (tilt, animações, glassmorphism, etc). Substituir o Lanyard no hero section pelo ProfileCard. Configurar com dados: name='Luis Fernando Boff', title='Energia Solar & Desenvolvedor Full Stack', handle='luisfboff', status='Online', avatarUrl='/avatar.png'."
Quality Level: pragmatic

## Análise Técnica

### Estado Atual
O hero section (app/page.tsx) atualmente usa uma `<div>` simples com avatar circular com border purple. O componente ProfileCard já existe em `components/ProfileCard.tsx` com funcionalidade básica de tilt 3D, mas falta os efeitos visuais avançados:
- Sem glassmorphism (backdrop-blur, backdrop-saturate)
- Sombras simples sem glow colorido
- Background sólido ao invés de semi-transparente
- Sem gradient overlays sofisticados
- Sem ring effects no avatar

### ProfileCard Original (React Bits)
Componente típico com glassmorphism inclui:
- `backdrop-filter: blur(16px) saturate(180%)`
- Background semi-transparente com alpha channel
- Box-shadow com cor violet/purple para glow
- Borders sutis com transparência
- Gradient overlays com múltiplas camadas
- Ring effects no avatar
- Transform 3D com tilt effect
- Transições suaves

### Conversão CSS → Tailwind

**Glassmorphism Effects:**
- `backdrop-filter: blur(16px)` → `backdrop-blur-2xl`
- `backdrop-filter: saturate(180%)` → `backdrop-saturate-[180%]`
- `background: rgba(17, 25, 40, 0.75)` → `bg-neutral-900/75`
- `border: 1px solid rgba(255,255,255,0.125)` → `border border-white/10`

**Shadow & Glow:**
- `box-shadow: 0 8px 32px rgba(139,92,246,0.37)` → `shadow-[0_8px_32px_0_rgba(139,92,246,0.37)]`

**Ring Effects:**
- `ring-1 ring-white/5 hover:ring-purple-500/30`

**Gradient Overlays:**
- `bg-gradient-to-br from-purple-400/20 via-purple-500/10 to-transparent`

**Avatar Enhancements:**
- `ring-4 ring-violet-500/20 ring-offset-4 ring-offset-neutral-900`
- `shadow-[0_0_30px_rgba(139,92,246,0.5)]`

## Plano de Implementação

### Arquivos a Modificar:

**1. components/ProfileCard.tsx**
- Container principal: Adicionar `backdrop-blur-2xl backdrop-saturate-[180%] bg-neutral-900/75 border border-white/10 shadow-[0_8px_32px_0_rgba(139,92,246,0.37)] ring-1 ring-white/5`
- Gradient overlay: Adicionar div com `absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent pointer-events-none`
- Avatar wrapper: Adicionar `ring-4 ring-violet-500/20 ring-offset-4 ring-offset-neutral-900 shadow-[0_0_30px_rgba(139,92,246,0.5)]`
- Status badge: Adicionar `shadow-[0_0_10px_rgba(34,197,94,0.5)]` para glow verde
- Manter tilt effect existente (perspective, rotateX/Y)

**2. app/page.tsx**
- Remover avatar simples (linhas ~87-97) com a div e Image
- Adicionar ProfileCard com props: `name="Luis Fernando Boff" title="Energia Solar & Desenvolvedor Full Stack" handle="luisfboff" status="Online" avatarUrl="/avatar.png"`
- Ajustar espaçamento: `space-y-12` → `space-y-8`
- Remover seção comentada do Lanyard (linhas ~184-187)

**3. app/globals.css** (opcional)
- Adicionar utilities `preserve-3d` e `perspective-1000` se necessário para suporte adicional ao transform 3D

### Ordem de Implementação:

1. **Modificar components/ProfileCard.tsx**
   - Adicionar todos os efeitos de glassmorphism ao container principal
   - Adicionar gradient overlay como elemento filho
   - Melhorar avatar com rings e shadow glow
   - Adicionar glow ao status badge
   - Justificativa: Implementar efeitos visuais no componente isoladamente facilita testes antes de integrar na página

2. **Modificar app/page.tsx**
   - Remover avatar simples atual
   - Adicionar ProfileCard configurado
   - Ajustar espaçamento
   - Remover Lanyard comentado
   - Justificativa: Com ProfileCard pronto, integração é apenas substituição de componente

3. **Adicionar utilities CSS se necessário**
   - Apenas se transform 3D precisar de suporte adicional
   - Justificativa: Garantir compatibilidade cross-browser

### Riscos Técnicos:

**backdrop-filter browser support**
- Risco: Safari antigo (<9.1) e alguns browsers mobile não suportam backdrop-filter
- Mitigação: Background `bg-neutral-900/75` funciona como fallback sólido mantendo legibilidade

**Performance com backdrop-blur**
- Risco: backdrop-blur é GPU-intensive, pode causar lag em dispositivos fracos
- Mitigação: ProfileCard é único na página (não múltiplas instâncias), impacto mínimo

**Tilt effect em mobile**
- Risco: Pode interferir com scroll touch
- Mitigação: Código atual já desabilita tilt em viewports < 768px

## Plano de QA (para twin-tester)

### Cenários de Teste:

**1. Verificação Visual Desktop (1920x1080)**
- Carregar página em http://localhost:3000
- ProfileCard aparece centralizado no hero
- Mover mouse sobre card → tilt 3D suave seguindo cursor
- Verificar glassmorphism: fundo blur visível, background semi-transparente
- Verificar shadow violet ao redor do card
- Verificar avatar com ring violet e glow
- Verificar badge "Online" verde com shadow

**2. Verificação Visual Mobile (375x667)**
- Redimensionar para mobile
- Glassmorphism visível (ou fallback sólido legível)
- Tilt desabilitado (não responde a touch)
- Touch não interfere com scroll
- Card responsivo e centralizado

**3. Efeitos de Glassmorphism**
- Inspecionar elemento no DevTools
- Verificar classes: `backdrop-blur-2xl`, `backdrop-saturate-[180%]`, `bg-neutral-900/75`
- Scroll página para ver conteúdo atrás do card
- Verificar blur do background funciona

**4. Sombras e Rings**
- Inspecionar ProfileCard container → shadow violet presente
- Inspecionar avatar → ring violet ao redor
- Badge "Online" → green glow presente
- Sem sombras pretas padrão

**5. Gradients e Overlays**
- Inspecionar DOM → elemento com `bg-gradient-to-br from-violet-500/10`
- Overlay com `pointer-events-none` (não bloqueia cliques)
- Gradient sutil visível no topo

**Visual Validation:**
- Glassmorphism (blur + saturate) visível
- Background semi-transparente
- Border sutil branco/transparente
- Shadow violet ao redor do card
- Avatar com ring violet e glow
- Badge status com shadow colorido
- Gradient overlay sutil
- Tilt 3D em desktop, desabilitado em mobile
- Sem lag nas animações
- Texto legível sobre blur

## Próximo Passo

Para implementar este plano, digite: **ok**, **continue**, ou **approve**
Para cancelar, digite: **cancel** ou inicie uma nova tarefa
