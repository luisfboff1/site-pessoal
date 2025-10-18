# 🤖 Twin Development Workflow - Setup Completo

## ✅ Status da Instalação

Todos os componentes do Twin Development Workflow foram instalados com sucesso!

### 📦 O que foi instalado:

#### 1. Agentes Locais (neste projeto)
```
.claude/agents/
├── twin-analyst.md      # 🔴 Análise técnica do código
├── twin-planner.md      # 🟢 Planejamento de implementação
├── twin-developer.md    # 🔵 Desenvolvimento funcional
├── twin-reviewer.md     # 🟣 Revisão de qualidade
├── twin-tester.md       # ⚪ QA manual com Playwright
└── twin-documenter.md   # 🟠 Documentação de sessões
```

#### 2. Agentes Globais (todos os projetos)
```
%APPDATA%\claude-code\agents\
├── twin-analyst.md
├── twin-planner.md
├── twin-developer.md
├── twin-reviewer.md
├── twin-tester.md
└── twin-documenter.md
```

#### 3. Comando Workflow
```
.claude/commands/twin-workflow.md        # Local
%APPDATA%\claude-code\commands\twin-workflow.md  # Global
```

#### 4. Playwright MCP
```
%APPDATA%\claude-code\mcp.json
└── Configurado com @executeautomation/playwright-mcp-server
```

---

## 🚀 Como Usar AGORA

### 1. **REINICIE o Claude Code**
⚠️ **IMPORTANTE:** Feche e abra o Claude Code para carregar:
- Playwright MCP
- Agentes Twin
- Comando /twin-workflow

### 2. Verifique a instalação:
```bash
/context
# Deve mostrar ferramentas mcp__playwright__*
```

### 3. Execute seu primeiro workflow:
```bash
# Certifique-se que o dev server está rodando
npm run dev

# Em outra janela/terminal do Claude Code
/twin-workflow "adicionar botão de voltar ao topo"
```

### 4. Fluxo de trabalho:
1. **Twin Workflow cria o plano** → salvo em `twin-plan-current.md`
2. **Você revisa** → edita se necessário
3. **Digite "ok"** → implementação automática começa
4. **Loop automático:**
   - Developer implementa
   - Reviewer revisa
   - Tester testa visualmente no navegador
   - Se bugs → volta pro Developer
   - Repete até passar todos os testes
5. **Documenter** → cria documentação da sessão
6. **Plano arquivado** → em `twin-plans/`

---

## 📁 Arquivos Criados

### Documentação:
- ✅ `CLAUDE.md` - Documentação principal do projeto + Twin Workflow
- ✅ `.claude/PLAYWRIGHT_MCP_SETUP.md` - Guia do Playwright MCP
- ✅ `.claude/GLOBAL_AGENTS_SETUP.md` - Como usar em outros projetos
- ✅ `TWIN_AGENTS_README.md` - Este arquivo

### Scripts de Instalação:
- ✅ `install-twin-agents.ps1` - Script Windows PowerShell
- ✅ `install-twin-agents.sh` - Script Linux/macOS Bash

### Backups:
- ✅ `CLAUDE.md.backup` - Backup da documentação anterior

---

## 🎯 Usar em Novos Projetos

### Opção 1: Script Automático (Windows)
```powershell
# Copie install-twin-agents.ps1 para o novo projeto
.\install-twin-agents.ps1
```

### Opção 2: Script Automático (Linux/macOS)
```bash
# Copie install-twin-agents.sh para o novo projeto
chmod +x install-twin-agents.sh
./install-twin-agents.sh
```

### Opção 3: Manual
```powershell
# Criar estrutura
mkdir .claude\agents
mkdir .claude\commands

# Copiar dos globais
copy %APPDATA%\claude-code\agents\*.md .claude\agents\
copy %APPDATA%\claude-code\commands\*.md .claude\commands\

# Copiar documentação
copy CLAUDE.md novo-projeto\
```

---

## 🧪 Níveis de Qualidade

```bash
# Pragmatic (padrão) - Rápido e direto
/twin-workflow "adicionar validação de email"

# Balanced - Equilíbrio entre qualidade e velocidade
/twin-workflow "criar sistema de notificações" --quality=balanced

# Strict - Máxima qualidade e edge cases
/twin-workflow "implementar autenticação" --quality=strict
```

---

## 🎨 Recursos dos Agentes

### Twin Developer (Programação Funcional)
- ✅ Apenas `const` (nunca `let` ou `var`)
- ✅ Funções puras e imutabilidade
- ✅ Código auto-explicativo (sem comentários)
- ✅ Composição de funções

### Twin Reviewer (Qualidade)
- ✅ Valida programação funcional
- ✅ Análise de segurança
- ✅ Otimização de performance
- ✅ Conformidade UI/UX (verifica reuso de componentes)

### Twin Tester (QA Manual)
- ✅ **Frontend:** Abre navegador real com Playwright
  - Clica botões e links
  - Preenche formulários
  - Testa navegação
  - Captura screenshots de bugs
- ✅ **Backend:** Testa APIs com curl
  - Valida endpoints
  - Checa status codes
  - Testa edge cases
  - Verifica validações

### Twin Planner (Context-Aware)
- ✅ **Frontend:** Lista componentes UI disponíveis para reutilizar
- ✅ **Backend:** Identifica padrões de API/serviços existentes
- ✅ Cria plano de validação QA
- ✅ Evita scope creep

---

## 📊 Estrutura de Arquivos do Workflow

```
projeto/
├── twin-plan-current.md          # Plano ativo (temporário)
├── twin-plans/                   # Histórico de planos
│   ├── 2025-01-19-14-30-plan.md
│   └── 2025-01-19-16-45-plan.md
└── docs/sessions/                # Documentação de sessões
    └── [documentação gerada]
```

---

## 🔧 Troubleshooting

### Playwright MCP não aparece após reiniciar:

1. Verifique o arquivo de configuração:
   ```powershell
   cat %APPDATA%\claude-code\mcp.json
   ```

2. Verifique instalação:
   ```bash
   npm list -g @executeautomation/playwright-mcp-server
   ```

3. Reinstale se necessário:
   ```bash
   npm install -g @executeautomation/playwright-mcp-server --force
   ```

### Agentes não aparecem em /help:

1. Verifique que os arquivos existem:
   ```powershell
   dir .claude\agents
   dir .claude\commands
   ```

2. Verifique frontmatter dos arquivos (deve ter `---` no início)

3. Reinicie o Claude Code

### Workflow não executa testes visuais:

1. Certifique-se que o dev server está rodando:
   ```bash
   npm run dev
   ```

2. Verifique se Playwright MCP está ativo:
   ```bash
   /context
   # Procure por mcp__playwright__*
   ```

---

## 📚 Documentação Completa

Leia os arquivos de documentação para mais detalhes:

- **CLAUDE.md** - Visão geral do projeto e Twin Workflow
- **.claude/PLAYWRIGHT_MCP_SETUP.md** - Setup do Playwright MCP
- **.claude/GLOBAL_AGENTS_SETUP.md** - Usar em outros projetos

---

## 🎯 Exemplo Completo de Uso

```bash
# 1. Iniciar servidor (terminal 1)
npm run dev

# 2. Abrir Claude Code (terminal 2)
# No Claude Code:

# 3. Executar workflow
/twin-workflow "adicionar modo escuro ao portfólio"

# 4. Aguardar plano ser criado
# [twin-analyst analisa o código...]
# [twin-planner cria plano detalhado...]
# [Plano salvo em twin-plan-current.md]

# 5. Revisar plano (opcional)
# Edite twin-plan-current.md se quiser mudar algo

# 6. Aprovar e executar
ok

# 7. Workflow automático:
# [twin-developer implementa modo escuro]
# [twin-reviewer revisa o código]
# [twin-tester abre navegador e testa visualmente]
# [Se bugs encontrados → volta pro developer]
# [Loop até tudo funcionar]
# [twin-documenter cria documentação]
# [Plano arquivado]

# 8. Resultado:
# ✅ Modo escuro implementado
# ✅ Código revisado e testado
# ✅ Bugs corrigidos
# ✅ Documentação criada
# ✅ Pronto para commit!
```

---

## 🌟 Próximos Passos

1. **Reinicie o Claude Code** agora! ← Mais importante
2. Execute `/context` para verificar Playwright MCP
3. Teste o workflow com uma tarefa simples
4. Explore os arquivos de documentação
5. Use em outros projetos com os scripts de instalação

---

## 💡 Dicas

- Use `--quality=pragmatic` para protótipos rápidos
- Use `--quality=strict` para código de produção
- Edite `twin-plan-current.md` antes de aprovar se quiser ajustar o plano
- O `twin-tester` testa VISUALMENTE - é QA real, não criação de testes
- Todos os planos são arquivados - você pode revisitar implementações antigas

---

**Tudo pronto! 🎉**

Feche e reabra o Claude Code, depois teste com:
```bash
/twin-workflow "criar README.md básico"
```
