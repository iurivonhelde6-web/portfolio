# Iuri Von Helde — Portfólio

Site pessoal em página única (single page) apresentando projetos reais em produção, stack técnica e contato.

**Site:** [ded-black.com.br](https://www.ded-black.com.br) (projeto em destaque) · Portfólio publicado via GitHub Pages (veja seção abaixo)

## Sobre

Desenvolvedor Fullstack com 6 anos de experiência, atuando em um ERP corporativo com Module Federation, biblioteca de componentes compartilhada entre times e padronização de Design System. Também com 3 anos de React Native (app do jogo "Matrix the Code") e experiência implementando designs em Webflow.

Antes da programação, atuou como Técnico em Química (Bayer Science Corp) e Técnico em Farmácia — satélite de oncologia (Into, Instituto de Trauma e Ortopedia).

- **Formação:** Engenharia de Software (FIAP) · Análise e Desenvolvimento de Sistemas (UVA) · Técnico em Química (Faculdade Mercúrio)
- **Certificações:** Ethical Hacker (IBSEC) · CyberSecurity (FIAP)
- **Idiomas:** Português nativo · Inglês avançado · Espanhol fluente

## Projetos em destaque

### DB Barbershop
Clube de assinaturas para barbearia — em produção, com clientes reais.
- Checkout recorrente via Stripe
- Cartão de controle digital
- Agendamento por barbeiro com disponibilidade configurável
- Painel administrativo com KPIs e simulador de economia
- Consultor de IA (Google Gemini) que recomenda serviços e cortes por tipo de rosto

**Stack:** React · Vite · Node/Express · Firebase · Stripe · Google Gemini · Vercel
**Link:** [ded-black.com.br](https://www.ded-black.com.br)

### Instant Replay
Plataforma de replay retroativo para campos de futebol, arenas e centros esportivos. O botão nunca inicia uma gravação — ele salva os 15 segundos que já aconteceram antes do lance, a partir de um buffer circular contínuo.

Fluxo: câmeras IP via RTSP → buffer circular de 60s (FFmpeg) → salva o replay retroativo.

**Stack:** Python · FastAPI · FFmpeg · React · TypeScript · TanStack Query · offline-first

### Automação de NFS-e
Sistema para cliente que emite a nota fiscal de serviço eletrônica de uma clínica automaticamente a cada pagamento confirmado, substituindo o lançamento manual no Emissor Nacional de NFS-e.

Fluxo: pagamento confirmado → emissão automática → NFS-e emitida.

**Stack:** Python · FastAPI · Integração fiscal

### Hortifruti Vieira
Landing page institucional para rede de hortifrutis com 3 unidades no Rio de Janeiro e Baixada Fluminense (Rocha Miranda, Coelho Neto e São João de Meriti), com atendimento e pedidos via WhatsApp e delivery próprio.

**Stack:** Landing page · WhatsApp · delivery

### Padaria Laura
Site para confeitaria e padaria artesanal, com cardápio navegável por categoria, kits e cestas promocionais, e pedidos direcionados para o WhatsApp.

**Stack:** Landing page · Catálogo de produtos · WhatsApp

## Stack geral

`Java` `C#` `JavaScript` `TypeScript` `PHP` `Python` `Go` `Spring Boot` `.NET` `Node.js` `Express` `NestJS` `React.js` `Next.js` `React Native` `SQL Server` `PostgreSQL` `MySQL` `MongoDB` `Redis` `AWS`

## Estrutura do projeto

```
.
├── index.html      # página única com todas as seções
└── images/         # screenshots dos projetos usados no site
```

Site estático puro (HTML/CSS/JS vanilla), sem build step — basta abrir `index.html` no navegador ou servir a pasta com qualquer servidor estático.

## Rodando localmente

```bash
# qualquer servidor estático funciona, por exemplo:
npx serve .
# ou
python3 -m http.server 8000
```

## Contato

- **WhatsApp:** [+55 (21) 9 8272-1541](https://wa.me/5521982721541)
- **E-mail:** [iuri.dev.vonhelde@gmail.com](mailto:iuri.dev.vonhelde@gmail.com)
- **LinkedIn:** [linkedin.com/in/iuri-von-helde](https://www.linkedin.com/in/iuri-von-helde-082320261)
- **GitHub:** [github.com/iurivonhelde6-web](https://github.com/iurivonhelde6-web)
