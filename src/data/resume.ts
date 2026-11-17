/**
 * Conteúdo único do portfólio.
 *
 * Posicionamento: AI Builder — alguém que usa IA generativa como ferramenta de
 * construção para resolver problemas de negócio de ponta a ponta.
 *
 * Itens marcados com "CONFIRMAR" precisam de um dado real seu antes de
 * publicar. Não invente números — ou preencha, ou apague a frase.
 */
export const resumeData = {
  personal: {
    name: 'Gabriel da Silva Coelho Ferro',
    title: 'AI Builder · Desenvolvedor de Produtos com IA',
    role: 'AI Builder',
    degree: 'Bacharel em Sistemas de Informação',
    location: 'Minas Gerais, Brasil · Disponível para remoto e presencial',
    email: 'gsilvacoelhoferro@gmail.com',
    phone: '(38) 98426-7179',
    linkedin: 'https://linkedin.com/in/gabriel-coelho-ferro',
    github: 'https://github.com/gsilvacoelho-dev',
  },

  /** Frase de impacto da Hero — o que eu faço, em uma linha. */
  tagline:
    'Construo produtos, automações e ferramentas internas com IA generativa — da ideia ao ar em dias, não em meses.',

  about:
    'Bacharel em Sistemas de Informação que usa IA generativa como ferramenta de construção para resolver problemas de negócio. Já coloquei três produtos em produção: uma plataforma de dieta e treino com IA (nutriuai.com.br), uma plataforma educacional gamificada em uso pela Prefeitura de Várzea da Palma/MG e um sistema de gestão de indicadores 5S. Antes disso, passei dois anos na Rima Industrial automatizando relatórios e rotinas administrativas com VBA — foi ali que aprendi que o valor não está no código, está no tempo que ele devolve para as pessoas.',

  aboutSecondary:
    'Meu jeito de trabalhar é AI-first: entendo o problema, escolho o modelo e as ferramentas certas, prototipo rápido e coloco no ar para medir. Já atendi três setores diferentes — fitness, educação pública e indústria — e em todos o padrão foi o mesmo: alguém fazendo manualmente algo que a IA podia fazer melhor.',

  stats: [
    { value: 3, suffix: '', label: 'Produtos em produção' },
    { value: 2, suffix: '', label: 'Anos automatizando processos' },
    { value: 3, suffix: '', label: 'Setores atendidos' },
    { value: 12, suffix: '+', label: 'Tecnologias em uso' },
  ],

  /**
   * Seção "IA na prática" — o coração da candidatura para vagas de GenAI.
   * Cada item é uma capacidade com a EVIDÊNCIA de onde ela foi aplicada.
   */
  aiPractice: [
    {
      id: 'prompt',
      title: 'Prompt engineering aplicado a produto',
      description:
        'No NutriUAI, a geração de dieta não é "pedir um cardápio para o GPT". O prompt é montado em tempo de execução com o gasto energético calculado pela fórmula de Mifflin-St Jeor, as restrições do usuário e alimentos da tabela TACO — o modelo recebe os dados certos e responde em formato estruturado, pronto para a interface consumir.',
      evidence: 'NutriUAI · em produção',
      tags: ['Prompt estruturado', 'Saída em JSON', 'Dados como contexto'],
    },
    {
      id: 'grounding',
      title: 'Grounding: IA que responde com dados reais',
      description:
        'O maior risco de um produto com LLM é a alucinação. Resolvi isso ancorando o modelo em fontes confiáveis — a tabela TACO (composição nutricional oficial brasileira) e um cálculo determinístico feito em código. A IA escreve e adapta; os números vêm de fora dela.',
      evidence: 'NutriUAI · tabela TACO + Mifflin-St Jeor',
      tags: ['Grounding', 'Redução de alucinação', 'Cálculo determinístico'],
    },
    {
      id: 'assistant',
      title: 'Assistente conversacional em produção',
      description:
        'Construí o chat de tira-dúvidas do NutriUAI sobre a API da OpenAI, com papel e limites definidos por system prompt, contexto do perfil do usuário na conversa e tratamento de erro para não quebrar a experiência quando a API falha.',
      evidence: 'NutriUAI · OpenAI API',
      tags: ['System prompt', 'Contexto de usuário', 'Tratamento de falha'],
    },
    {
      id: 'automation',
      title: 'Automação que devolve tempo',
      description:
        'Na Rima Industrial automatizei com VBA relatórios administrativos que eram montados à mão todo mês. Mesma lógica que hoje aplico com IA: identificar a tarefa repetitiva, medir quanto tempo ela consome e eliminá-la.',
      evidence: 'Rima Industrial · 2 anos',
      tags: ['VBA', 'Relatórios', 'Processos administrativos'],
    },
    {
      id: 'velocity',
      title: 'Vibe coding: velocidade com IA no desenvolvimento',
      description:
        'Trabalho em vibe coding: a IA é meu par de programação no fluxo do dia a dia, com Claude Code rodando dentro do projeto — este portfólio foi construído assim, do primeiro commit ao deploy. É isso que me permite sair do zero ao produto no ar em dias, cobrindo frontend, backend e banco sozinho.',
      evidence: 'NutriUAI, Digita Brasil, 5SManager',
      tags: ['Vibe coding', 'Claude Code', 'Zero-to-production'],
    },
    {
      id: 'dashboards',
      title: 'Ferramentas internas e dashboards',
      description:
        'O 5SManager é uma ferramenta interna de verdade: registro de auditorias, acompanhamento de indicadores da metodologia 5S por setor e geração automática de relatórios para a gestão decidir onde agir.',
      evidence: '5SManager · Flask + SQLite',
      tags: ['Ferramenta interna', 'Indicadores', 'Relatórios automáticos'],
    },
  ],

  experience: [
    {
      id: 1,
      title: 'Desenvolvedor de Produtos com IA',
      company: 'Projetos autorais e freelance',
      startDate: '2024', // CONFIRMAR: mês/ano em que começou o NutriUAI
      endDate: 'Atual',
      duration: '', // vazio de propósito: "2024 — Atual · Atual" era redundante
      current: true,
      description: [
        'Concepção e desenvolvimento ponta a ponta do NutriUAI (nutriuai.com.br), plataforma de dieta e treino com IA generativa — da modelagem do banco ao deploy em produção',
        'Entrega da plataforma Digita Brasil para a Prefeitura de Várzea da Palma/MG: jogos educacionais gamificados para reforço de Português e Matemática no ensino fundamental',
        'Integração de LLMs (OpenAI API) em produto real: geração de planos personalizados e assistente conversacional, com prompts estruturados e saída consumida pela interface',
        'Stack completa sob responsabilidade individual: React, TypeScript, Supabase/PostgreSQL, Tailwind CSS e deploy',
      ],
    },
    {
      id: 2,
      title: 'Estagiário em Tecnologia e Administração',
      company: 'Rima Industrial',
      startDate: 'Agosto 2021',
      endDate: 'Agosto 2023',
      duration: '2 anos',
      current: false,
      description: [
        'Automação de relatórios e rotinas administrativas com VBA, substituindo preenchimento manual recorrente',
        'Mapeamento de processos para identificar gargalos e tarefas repetitivas passíveis de automação',
        'Suporte técnico e apoio em rotinas de tecnologia junto às áreas administrativas',
        // CONFIRMAR e ativar — vale mais que todas as bullets acima juntas:
        // 'Redução de X horas/mês no fechamento de relatórios administrativos',
      ],
    },
  ],

  education: [
    {
      id: 1,
      degree: 'Bacharelado em Sistemas de Informação',
      institution: 'Instituto Federal do Norte de Minas Gerais (IFNMG) — Campus Pirapora',
      startDate: 'Mai 2021',
      endDate: 'Jan 2026',
      status: 'Concluído',
      highlight: 'TCC: 5SManager — sistema de gestão de indicadores da metodologia 5S',
    },
    {
      id: 2,
      degree: 'Técnico em Administração',
      institution: 'Unimontes — Montes Claros/MG',
      startDate: '2019',
      endDate: '2020',
      status: 'Concluído',
      highlight:
        'Base em processos e gestão — o que me ajuda a ler problemas de negócio, não só técnicos',
    },
  ],

  projects: [
    {
      id: 1,
      title: 'NutriUAI',
      shortDesc: 'Produto com IA generativa · em produção',
      problem:
        'Montar uma dieta personalizada exige nutricionista ou horas de planilha. Quem treina sem acompanhamento acaba seguindo receita genérica da internet.',
      description:
        'Plataforma web que gera dietas e planos de treino personalizados com IA generativa, ancorada em cálculo nutricional real. Inclui assistente conversacional para dúvidas, acompanhamento de treino de academia e cardio, e loja de produtos fitness.',
      impact:
        'No ar em nutriuai.com.br — do zero ao deploy sozinho, cobrindo frontend, backend, banco e integração de IA.',
      aiHighlights: [
        'Prompt montado em runtime com gasto energético (Mifflin-St Jeor), restrições do usuário e alimentos da tabela TACO',
        'Saída estruturada do modelo consumida direto pela interface, sem parsing frágil',
        'Assistente de tira-dúvidas sobre a API da OpenAI, com papel e limites definidos por system prompt',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Supabase',
        'OpenAI API',
        'TailwindCSS',
        'Prompt Engineering',
      ],
      features: [
        'Geração de dietas com IA ancorada na fórmula de Mifflin-St Jeor e na tabela TACO',
        'Planos de treino de academia e cardio com acompanhamento de progresso',
        'Assistente conversacional com IA para dúvidas de nutrição e treino',
        'Loja virtual de produtos fitness com links de afiliados',
      ],
      liveUrl: 'https://nutriuai.com.br/',
      githubUrl: '',
      image: '/images/nutriuai-portifolio.webp',
      note: '',
      featured: true,
    },
    {
      id: 2,
      title: 'Digita Brasil',
      shortDesc: 'Cliente público · Prefeitura de Várzea da Palma/MG',
      problem:
        'Professores do ensino fundamental precisavam de material de reforço que prendesse a atenção dos alunos em Português e Matemática.',
      description:
        'Plataforma gamificada de aprendizagem entregue para a Prefeitura de Várzea da Palma/MG, com jogos educativos para reforço escolar e acompanhamento de progresso do aluno.',
      impact:
        'Produto entregue e em uso por um cliente público — requisito levantado com a prefeitura, escopo definido e plataforma no ar.',
      aiHighlights: [
        'Desenvolvimento acelerado com IA como par de programação, do protótipo ao deploy',
      ],
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Educação'],
      features: [
        'Jogos educativos para reforço de Português e Matemática',
        'Interface gamificada pensada para crianças do ensino fundamental',
        'Acompanhamento de progresso por aluno',
        'Seleção de múltiplas disciplinas',
      ],
      liveUrl: 'https://digitabrasil.site/',
      githubUrl: '',
      image: '/images/digitabrasil-portifolio.webp',
      note: '',
      featured: false,
    },
    {
      id: 3,
      title: '5SManager',
      shortDesc: 'Ferramenta interna · indicadores e relatórios',
      problem:
        'Auditorias da metodologia 5S eram registradas em papel e planilha, sem visão consolidada de qual setor estava evoluindo ou travando.',
      description:
        'Sistema de gestão da metodologia 5S com registro de auditorias, acompanhamento de indicadores por setor e geração automática de relatórios para a gestão.',
      impact:
        'Transformou controle manual em painel de indicadores — a gestão passa a ver onde agir, em vez de compilar planilha.',
      aiHighlights: [],
      technologies: ['Flask', 'Python', 'SQLite', 'Administração'],
      features: [
        'Interface administrativa para registro e acompanhamento de auditorias 5S',
        'Indicadores consolidados por setor',
        'Geração automática de relatórios para a gestão',
        'Histórico para comparar evolução ao longo do tempo',
      ],
      liveUrl: '',
      githubUrl: 'https://github.com/gsilvacoelho-dev/5S-Manager',
      image: '/images/5smanager-portifolio.png',
      note: 'TCC',
      featured: false,
    },
  ],

  technologies: {
    ai: [
      { name: 'OpenAI API' },
      { name: 'Prompt Engineering' },
      { name: 'Claude' },
      { name: 'Claude Code' },
      { name: 'LLM Apps' },
      // ATIVAR só se você realmente usou. Ver notas no fim do arquivo.
      // { name: 'Gemini' },
      // { name: 'RAG' },
      // { name: 'n8n' },
    ],
    frontend: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'TailwindCSS' },
      { name: 'Bootstrap' },
    ],
    backend: [{ name: 'Python' }, { name: 'Flask' }, { name: 'REST APIs' }],
    database: [{ name: 'PostgreSQL' }, { name: 'Supabase' }, { name: 'SQLite' }],
    automation: [
      { name: 'VBA' },
      { name: 'Pacote Office' },
      { name: 'Automação de Relatórios' },
    ],
    tools: [{ name: 'Git' }, { name: 'Vite' }],
  },

  differentials: [
    {
      title: 'AI-first na prática',
      description:
        'Não estudo IA — construo com ela. Tenho produto no ar que usa LLM para resolver um problema real de usuário, com prompts estruturados e ancoragem em dados confiáveis.',
    },
    {
      title: 'Velocidade do zero ao ar',
      description:
        'Três produtos em produção, feitos sozinho de ponta a ponta. Prototipo rápido, coloco no ar e ajusto com o que a realidade mostra.',
    },
    {
      title: 'Leitura de negócio, não só de código',
      description:
        'Técnico em Administração antes de Sistemas de Informação. Consigo conversar com a área, entender o processo e propor a solução — em vez de esperar o requisito pronto.',
    },
    {
      title: 'Automação como instinto',
      description:
        'Dois anos eliminando trabalho manual com VBA na indústria. Onde existe tarefa repetitiva, eu vejo automação — e hoje tenho IA para fazer isso muito mais rápido.',
    },
    {
      title: 'Entrega para cliente real',
      description:
        'Já levantei requisito, negociei escopo e entreguei plataforma para uma prefeitura. Sei o que é prazo, interlocutor não técnico e produto que precisa funcionar.',
    },
    {
      title: 'Autonomia de ponta a ponta',
      description:
        'Frontend, backend, banco, integração de IA e deploy. Não dependo de time para transformar uma ideia em algo clicável.',
    },
  ],

  languages: [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Básico' },
    { language: 'Espanhol', level: 'Básico' },
  ],
};

/* ---------------------------------------------------------------------------
 * NOTAS DE CANDIDATURA — iFood GEN AI (trilha AI Builder)
 *
 * Elegibilidade: graduação concluída em 26/01/2026 -> dentro da janela da
 * Residência Corporativa (dez/2025 a dez/2026), bolsa de R$ 7.000.
 *
 * Requisitos do edital que o portfólio JÁ cobre:
 *   OK  Prompt engineering              -> seção "IA na prática" + NutriUAI
 *   OK  Produto com LLM em produção     -> NutriUAI
 *   OK  Ferramentas internas/dashboards -> 5SManager
 *   OK  Automação com ganho de tempo    -> Rima Industrial (VBA)
 *   OK  APIs sem backend profundo       -> Supabase
 *   OK  Zero-to-production em dias      -> três produtos no ar
 *
 * Lacunas reais (NÃO preencher com o que não existe):
 *   FALTA  Orquestração de agentes (Claude/GPT/Gemini)
 *   FALTA  n8n / Make / Zapier
 *   OK     Vibe coding declarado -> Claude Code (technologies.ai + "Velocidade
 *            com IA no desenvolvimento" em aiPractice)
 *
 * Se você já usou qualquer uma delas, descomente em `technologies.ai` e
 * adicione a evidência em `aiPractice`.
 * ------------------------------------------------------------------------- */
