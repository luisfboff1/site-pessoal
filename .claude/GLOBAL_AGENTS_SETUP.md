# Agentes Twin - Instalação Global e Uso em Outros Projetos

## 📍 Localização dos Agentes Globais

Seus agentes Twin foram instalados globalmente em:

```
Windows: C:\Users\Luisf\AppData\Roaming\claude-code\
├── agents\
│   ├── twin-analyst.md
│   ├── twin-planner.md
│   ├── twin-developer.md
│   ├── twin-reviewer.md
│   ├── twin-tester.md
│   └── twin-documenter.md
└── commands\
    └── twin-workflow.md
```

## ✅ Status Atual

- ✅ **Agentes copiados para diretório global**
- ✅ **Comando /twin-workflow disponível globalmente**
- ✅ **Scripts de instalação criados para novos projetos**

## 🔄 Como Funciona

### Para Este Projeto (teste2):
Os agentes estão em **dois lugares**:
1. **Localmente** em `.claude/agents/` - específicos deste projeto
2. **Globalmente** em `%APPDATA%\claude-code\agents\` - disponíveis para todos os projetos

### Para Novos Projetos:

Você tem **3 opções** para usar os agentes Twin em um novo projeto:

---

## 🎯 Opção 1: Script de Instalação Automático (Recomendado)

### Windows (PowerShell):

1. Copie o arquivo `install-twin-agents.ps1` para o novo projeto
2. Execute no PowerShell:
   ```powershell
   .\install-twin-agents.ps1
   ```

### Linux/macOS (Bash):

1. Copie o arquivo `install-twin-agents.sh` para o novo projeto
2. Execute:
   ```bash
   chmod +x install-twin-agents.sh
   ./install-twin-agents.sh
   ```

### O que o script faz:
- ✅ Cria diretórios `.claude/agents/` e `.claude/commands/`
- ✅ Copia agentes globais para o projeto local
- ✅ Copia comandos globais para o projeto local
- ✅ Mostra resumo da instalação

---

## 🎯 Opção 2: Copiar Manualmente

### Windows:

```powershell
# Criar diretórios
mkdir .claude\agents
mkdir .claude\commands

# Copiar agentes
copy %APPDATA%\claude-code\agents\*.md .claude\agents\
copy %APPDATA%\claude-code\commands\*.md .claude\commands\
```

### Linux/macOS:

```bash
# Criar diretórios
mkdir -p .claude/agents .claude/commands

# Copiar agentes
cp ~/.config/claude-code/agents/*.md .claude/agents/
cp ~/.config/claude-code/commands/*.md .claude/commands/
```

---

## 🎯 Opção 3: Usar Template do GitHub

### Criar um Template Repository:

1. Faça fork ou clone deste projeto (teste2)
2. Remova conteúdo específico do portfólio
3. Mantenha:
   - `.claude/` completo
   - `CLAUDE.md` (adapte para ser genérico)
   - Scripts de instalação
4. Marque como "Template repository" no GitHub

### Usar o template em novos projetos:

```bash
# Clonar o template
git clone https://github.com/seu-usuario/twin-agents-template.git novo-projeto
cd novo-projeto

# Remover histórico git (opcional)
rm -rf .git
git init
```

---

## 📚 Após Instalação em um Novo Projeto

1. **Abra o Claude Code** no novo projeto

2. **Verifique se os agentes foram reconhecidos:**
   ```bash
   /help
   # Deve listar /twin-workflow
   ```

3. **Teste o workflow:**
   ```bash
   /twin-workflow "criar README.md inicial"
   ```

4. **Adapte o CLAUDE.md:**
   - Copie o `CLAUDE.md` deste projeto
   - Remova seções específicas do portfólio
   - Adicione informações do novo projeto
   - Mantenha a seção "Twin Development Workflow"

---

## 🔧 Estrutura Mínima para Novos Projetos

Todo projeto novo precisa ter:

```
novo-projeto/
├── .claude/
│   ├── agents/              # Agentes (copiados dos globais)
│   │   ├── twin-analyst.md
│   │   ├── twin-planner.md
│   │   ├── twin-developer.md
│   │   ├── twin-reviewer.md
│   │   ├── twin-tester.md
│   │   └── twin-documenter.md
│   └── commands/            # Comandos (copiados dos globais)
│       └── twin-workflow.md
├── CLAUDE.md               # Documentação do projeto + Twin Workflow
└── package.json            # (se for projeto JS/TS)
```

---

## 🎨 Personalização por Tipo de Projeto

### Para Projetos Frontend (React/Next.js/Vue):

O `twin-tester` automaticamente:
- ✅ Detecta que é frontend
- ✅ Usa Playwright MCP para testar visualmente
- ✅ Verifica reutilização de componentes UI

### Para Projetos Backend (Node.js/Express/API):

O `twin-tester` automaticamente:
- ✅ Detecta que é backend
- ✅ Usa curl e scripts para testar APIs
- ✅ Valida endpoints e status codes

### Para Projetos Python/Django:

Os agentes funcionam, mas você pode precisar:
- Adaptar `twin-developer` para Python (ou criar `twin-developer-python.md`)
- Ajustar `twin-tester` para usar pytest ou requests

---

## 📦 Distribuindo os Agentes Twin

### Método 1: NPM Package (Futuro)

Criar um pacote npm que instala os agentes:

```bash
# Instalação global
npm install -g twin-workflow-agents

# Uso em novos projetos
npx twin-agents init
```

### Método 2: GitHub Repository

Criar repositório público com os agentes:

```bash
# Clonar agentes para novo projeto
git clone --depth 1 https://github.com/usuario/twin-agents.git
cp -r twin-agents/.claude .
rm -rf twin-agents
```

### Método 3: Script de Download

Criar script que baixa diretamente:

```bash
curl -sSL https://raw.githubusercontent.com/usuario/twin-agents/main/install.sh | bash
```

---

## ⚙️ Configurações Adicionais para Novos Projetos

### 1. Playwright MCP (para testes frontend)

Se o novo projeto for frontend, configure também o Playwright MCP:

```json
// %APPDATA%\claude-code\mcp.json (já configurado globalmente)
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

**Observação:** O Playwright MCP é global, não precisa reconfigurar para cada projeto!

### 2. Níveis de Qualidade

Em cada projeto, você pode usar diferentes níveis:

```bash
# Protótipos rápidos
/twin-workflow "adicionar botão" --quality=pragmatic

# Projetos de produção
/twin-workflow "sistema de autenticação" --quality=strict
```

---

## 🧪 Testando em um Novo Projeto

### Teste Rápido:

1. Crie um novo diretório:
   ```bash
   mkdir teste-twin-agents
   cd teste-twin-agents
   ```

2. Execute o script de instalação:
   ```powershell
   # Copie install-twin-agents.ps1 para o diretório
   .\install-twin-agents.ps1
   ```

3. Abra o Claude Code no diretório

4. Execute:
   ```bash
   /twin-workflow "criar package.json básico"
   ```

5. Verifique se o workflow funciona!

---

## 📊 Manutenção dos Agentes Globais

### Atualizando os Agentes:

Quando você melhorar um agente neste projeto (teste2):

1. Edite o arquivo em `.claude/agents/twin-*.md`
2. Copie para o global:
   ```powershell
   copy .claude\agents\twin-*.md %APPDATA%\claude-code\agents\
   ```
3. Todos os novos projetos usarão a versão atualizada!

### Versionamento:

Considere adicionar versão no frontmatter dos agentes:

```yaml
---
name: twin-developer
version: 2.0.0
description: ...
---
```

---

## 🎯 Próximos Passos

1. **Reinicie o Claude Code** para que os agentes globais sejam reconhecidos
2. **Teste `/twin-workflow`** neste projeto
3. **Crie um novo projeto de teste** e use o script de instalação
4. **Adapte o CLAUDE.md** para seus novos projetos

---

## 📝 Notas Importantes

- ✅ Agentes globais ficam em `%APPDATA%\claude-code\agents\`
- ✅ Cada projeto ainda precisa ter `.claude/agents/` localmente
- ✅ O Claude Code busca agentes primeiro localmente, depois globalmente
- ✅ Use os scripts de instalação para facilitar setup em novos projetos
- ✅ Playwright MCP é global - configure uma vez, use em todos os projetos

---

**Sucesso!** Seus agentes Twin agora estão disponíveis globalmente e prontos para serem usados em qualquer projeto! 🚀
