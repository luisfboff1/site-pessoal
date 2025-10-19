# Twin Development Plan
Generated: 2025-10-18
Task: Corrigir Lanyard para flutuar livremente sobre a página
Quality Level: pragmatic

## Análise Técnica

### Problemas Identificados

**1. Lanyard desaparece no scroll**
- **Causa:** Container em `position: relative` dentro de section `min-h-screen`
- **Localização:** `app/page.tsx` linha 91 (section) e `Lanyard.tsx` linha 78 (container)
- **Efeito:** Quando usuário scrolla, section sai do viewport e Lanyard desaparece junto

**2. Tamanho muito pequeno (224px)**
- **Causa:** Tamanho hardcoded em `page.tsx` linha 112
- **Efeito:** Crachá 3D muito pequeno, detalhes invisíveis
- **Necessário:** Mínimo 400-500px para boa visualização

**3. Não flutua livremente**
- **Causa:** `position: relative` + dentro de section hero
- **Efeito:** Preso ao fluxo do documento, não pode sair dos limites da section
- **z-index:** Apenas 0, muito baixo

**4. Aparece e some no primeiro load**
- **Causa:** Verificação assíncrona de assets + dynamic import SSR
- **Código:** `Lanyard.tsx` linhas 43-60 (useState 'checking' + fetch HEAD)
- **Efeito:** Flash visual durante carregamento inicial

**5. z-index inadequado**
- **Hierarquia atual:**
  - z-0: LiquidEther (fixed)
  - z-0: Lanyard (relative) ← PROBLEMA
  - z-10: Main content
  - z-20: Hero section
  - z-50: Navbar
- **Necessário:** z-40-45 (abaixo navbar, acima seções)

### Estado Atual do Código

**app/page.tsx (linhas 91-114):**
```tsx
<section className="relative min-h-screen...z-20">
  <motion.div style={{ minHeight: '224px' }}>
    {isMobile ? (
      <img src="/avatar.png" />
    ) : (
      <Lanyard width={224} height={224} />  // Dentro da section!
    )}
  </motion.div>
</section>
```

**components/Lanyard.tsx (linha 78):**
```tsx
<div className="relative z-0" style={containerStyle}>
```

### Mudanças Necessárias

1. Remover Lanyard de dentro da section hero
2. position: fixed com coordenadas top/left definidas
3. z-index: 40 (abaixo navbar z-50, acima seções z-20)
4. Tamanho: aumentar para 450px
5. pointer-events: none no container, auto no Canvas
6. Simplificar asset loading para evitar flash

## Plano de Implementação

### Arquivos a Modificar:

**1. components/Lanyard.tsx**
- Alterar linha 78: `className="relative z-0"` → `className="fixed z-40"`
- Adicionar `pointer-events-none` ao container div
- Adicionar `pointer-events-auto` ao Canvas (para manter drag)
- Simplificar lógica de asset checking (remover condições que causam flash)
- Manter funcionalidade de drag (OrbitControls)

**2. app/page.tsx**
- Remover Lanyard de dentro da section hero (linhas 91-114)
- Mover Lanyard para nível raiz do JSX (após todas sections)
- Aumentar tamanho: 224px → 450px
- Definir posição fixed: sugestão top-24 right-8 (canto superior direito)
- Remover motion.div wrapper (não necessário para fixed)

### Ordem de Implementação:

1. **Modificar components/Lanyard.tsx**
   - Alterar className para fixed + z-40
   - Adicionar pointer-events
   - Simplificar asset loading
   - Justificativa: Garantir componente funciona como overlay antes de reposicionar

2. **Modificar app/page.tsx**
   - Remover de dentro da section hero
   - Adicionar no nível raiz
   - Aumentar tamanho para 450px
   - Aplicar posição fixed (top-24 right-8)
   - Justificativa: Depende da mudança anterior para comportamento correto

### Riscos Técnicos:

**1. Conflito z-index com Navbar**
- Navbar usa z-50, Lanyard ficará z-40
- Risco: Sobreposição visual se posicionados no mesmo canto
- Mitigação: Posicionar Lanyard longe da navbar ou ajustar z-index se necessário

**2. Performance em mobile**
- 450px de componente 3D fixo pode impactar performance
- Risco: Lag em dispositivos móveis
- Mitigação: Considerar tamanho menor (300px) ou desabilitar em mobile

**3. Drag vs scroll em mobile**
- OrbitControls com drag pode conflitar com scroll nativo
- Risco: Usuário não consegue scrollar ao tocar no Lanyard
- Mitigação: Testar touch behavior e desabilitar drag em mobile se necessário

## Plano de QA (para twin-tester)

### Cenários de Teste:

**1. Visibilidade durante scroll**
- Carregar página
- Scroll até final
- VERIFICAR: Lanyard permanece visível e fixo

**2. Interação de drag**
- Clicar e arrastar crachá 3D
- VERIFICAR: Rotação funciona suavemente
- VERIFICAR: Mantém rotação ao soltar

**3. Pointer events**
- Tentar clicar em elementos "atrás" do Lanyard
- VERIFICAR: Cliques passam através do container
- VERIFICAR: Drag no Canvas ainda funciona

**4. Z-index hierarchy**
- Scroll até navbar aparecer
- VERIFICAR: Lanyard abaixo da navbar (z-40 < z-50)
- VERIFICAR: Lanyard acima das sections (z-40 > z-20)

**5. Edge Cases**
- Mobile viewport (<768px): layout não quebra
- Resize: Lanyard mantém posição fixed
- Hover: outros elementos respondem normalmente

**Visual Validation:**
- Tamanho 450px visível e legível
- Posição consistente (top-24 right-8)
- Sem flickering ou aparecer/sumir
- Animação 3D suave

## Layout Final

**Desktop:**
```
┌─────────────────────────────────────┐
│  Navbar (z-50)                 [🎯]│ ← Lanyard flutuante (z-40)
│                                     │    fixed, 450px
├─────────────────────────────────────┤
│                                     │
│  Luis Fernando Boff (z-20)          │
│  Energia Solar & Dev                │
│                                [🎯]│ ← Sempre visível
│  [CTAs]                             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Services Section              [🎯]│
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Portfolio Preview             [🎯]│ ← Scroll não afeta
│                                     │
└─────────────────────────────────────┘
```

**Mobile:**
- Avatar estático no hero (fallback)
- Lanyard desabilitado ou reduzido (performance)

## Próximo Passo

Para implementar este plano, digite: **ok**, **continue**, ou **approve**
Para cancelar, digite: **cancel** ou inicie uma nova tarefa
