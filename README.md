# Portfolio Pessoal - Luis Fernando Boff

Portfolio profissional desenvolvido com Next.js 15, featuring componentes 3D avançados e animações interativas.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange)

## 🎯 Sobre o Projeto

Site portfolio pessoal showcasing expertise em:
- 🌞 **Energia Solar** - Soluções inteligentes para otimização
- 💻 **Desenvolvimento Full Stack** - Web, Mobile e Sistemas Completos
- 📊 **Ciência de Dados** - Machine Learning e Analytics

## ✨ Features

### Componentes 3D Avançados

- **LiquidEther** - Simulação de fluido WebGL custom com física Navier-Stokes
- **Lanyard** - Hero 3D interativo com física Rapier
- **TechRollingGallery** - Carrossel 3D infinito de tecnologias
- **InfiniteMenu** - Portfolio gallery com WebGL2 custom

### Tecnologias & Animações

- **Next.js 15** - App Router com React Server Components
- **Three.js** - Renderização 3D via React Three Fiber
- **Framer Motion** - Animações fluidas e transições
- **GSAP** - Animações de texto avançadas
- **Tailwind CSS v4** - Styling moderno com theme inline

### SEO & Performance

- ✅ Open Graph tags completos
- ✅ Twitter Cards configurados
- ✅ Google Analytics 4 integrado
- ✅ Sitemap e robots.txt
- ✅ Dynamic imports para componentes pesados
- ✅ IntersectionObserver para lazy rendering
- ✅ Mobile-first responsive design

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/luisfboff1/site-pessoal.git

# Navegue até o diretório
cd site-pessoal

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx              # Root layout com metadata e GA
│   ├── page.tsx                # Landing page principal
│   ├── globals.css             # Tailwind v4 com theme
│   ├── robots.ts               # SEO robots config
│   ├── sitemap.ts              # SEO sitemap
│   └── portfolio/              # Páginas de portfolio
│       ├── desenvolvimento/
│       ├── energia-solar/
│       └── ciencia-dados/
├── components/
│   ├── ui/                     # Componentes base (navbar-menu)
│   ├── sections/               # Seções da página
│   │   ├── PortfolioPreview.tsx
│   │   ├── ServicesSection.tsx
│   │   └── Footer.tsx
│   ├── LiquidEther.tsx         # WebGL fluid simulation
│   ├── Lanyard.tsx             # 3D hero component
│   ├── TechRollingGallery.tsx  # 3D tech carousel
│   ├── InfiniteMenu.tsx        # Portfolio gallery WebGL2
│   └── SplitText.tsx           # GSAP text animation
├── lib/
│   └── utils.ts                # Utility functions
├── types/
│   └── global.d.ts             # TypeScript declarations
├── public/
│   ├── og-image.jpg            # Social sharing image
│   ├── avatar.png              # Profile avatar
│   └── assets/                 # 3D models e texturas
└── .claude/                    # Twin Agents workflow
```

## 🛠️ Comandos Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint
```

## 🎨 Componentes Principais

### LiquidEther (Background Fluid)

Simulação de fluido WebGL custom implementando equações de Navier-Stokes:
- Advection com método BFECC
- Poisson pressure solver
- GPU-accelerated via WebGLRenderTarget
- Auto-demo mode com smooth takeover
- Performance optimizations para mobile

### Lanyard (3D Hero)

Hero section 3D com física realista:
- React Three Fiber + Rapier physics
- Draggable card interativo
- GLTF model loading com fallback
- Asset checking e graceful degradation

### Portfolio Preview

Seção dedicada com 3 categorias de projetos:
- Grid responsivo (1 col mobile, 3 cols desktop)
- Framer Motion hover effects
- Gradient backgrounds com ícones
- Links para páginas de portfolio

## 🔧 Configuração

### Google Analytics

1. Crie uma conta no [Google Analytics](https://analytics.google.com/)
2. Obtenha seu Measurement ID (formato: `G-XXXXXXXXXX`)
3. Configure a variável de ambiente:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Environment Variables

```bash
# .env.local (criar baseado em .env.example)
NEXT_PUBLIC_GA_ID=          # Google Analytics Measurement ID
```

## 📱 Responsive Design

O site é totalmente responsivo com breakpoints:
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

Componentes 3D adaptam-se automaticamente:
- Resolução reduzida em mobile (performance)
- Lanyard pode ser desabilitado em mobile
- LiquidEther com device detection

## 🎯 Type Safety

Projeto utiliza TypeScript strict mode com:
- ✅ 0 tipos `any` nos componentes principais
- ✅ Interfaces específicas para Three.js
- ✅ Type declarations para assets (.glb, .png)
- ✅ Proper typing para React Three Fiber

## 🤖 Twin Agents Workflow

Este projeto inclui um workflow de desenvolvimento avançado com agentes especializados:

- **twin-analyst** - Analisa o codebase
- **twin-planner** - Cria planos de implementação
- **twin-developer** - Implementa features
- **twin-reviewer** - Revisa código
- **twin-tester** - Executa QA manual
- **twin-documenter** - Documenta sessões

### Uso

```bash
/twin-workflow "descrição da feature"
```

Veja `TWIN_AGENTS_README.md` para documentação completa.

## 📈 Performance

Otimizações implementadas:
- Dynamic imports para componentes 3D (`{ ssr: false }`)
- IntersectionObserver para pause/resume de animações
- ResizeObserver com debouncing
- WebGL resource cleanup em useEffect
- Image optimization (Next.js Image component recomendado)

## 🚢 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/luisfboff1/site-pessoal)

### Manual

```bash
# Build do projeto
npm run build

# Inicie o servidor
npm run start
```

Configure as environment variables no painel de deploy.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é de código aberto para fins educacionais.

## 👤 Autor

**Luis Fernando Boff**

- GitHub: [@luisfboff1](https://github.com/luisfboff1)
- LinkedIn: [Luis Fernando Boff](https://www.linkedin.com/in/luis-fernando-boff-7a64a716b/)

## 🙏 Agradecimentos

- Next.js team pelo framework incrível
- Three.js community
- Framer Motion
- Todos os contribuidores open-source

---

⭐ **Se este projeto foi útil, considere dar uma estrela!**

Desenvolvido com ❤️ e ☕ por Luis Fernando Boff
