# Checklist Mobile

Aplicativo mobile construído com `Expo` e `React Native` para acompanhamento e execução de tarefas operacionais em campo. O projeto simula o fluxo de um colaborador que faz login, visualiza suas tarefas, consulta dependências, executa checklists, envia evidências e registra ocorrências quando encontra bloqueios.

## Visão Geral

O app foi pensado para um cenário de operação guiada, em que cada tarefa pode possuir:

- status de execução;
- nível de risco;
- dependências entre tarefas;
- checklist obrigatório;
- upload de fotos e vídeos;
- registro de ocorrência informativa ou bloqueante.

Além do fluxo de tarefas, a aplicação também inclui:

- login com redirecionamento para a área autenticada;
- logout pela aba `Leave`;
- tela de perfil com indicadores do usuário atual;
- navegação por tabs e rotas detalhadas com `expo-router`.

## Funcionalidades

### Autenticação

- Tela de login com interface mobile e fluxo protegido.
- Redirecionamento automático para o login quando o usuário está deslogado.
- Logout ao tocar na aba `Leave`.

Observação:
Atualmente a autenticação é local e simulada. Qualquer email e senha não vazios permitem entrar.

### Gestão de Tarefas

- Lista de tarefas do usuário atual.
- Filtros por status: `todas`, `pendentes`, `ativas`, `bloqueadas` e `concluídas`.
- Cards com resumo, workflow, status e risco.
- Navegação para detalhe da tarefa.

### Detalhe da Tarefa

- Exibição do workflow ao qual a tarefa pertence.
- Requisitos necessários para execução.
- Dependências entre tarefas.
- Alertas visuais para pendências e bloqueios.
- Ação contextual para iniciar, continuar ou visualizar bloqueio.

### Execução

- Checklist interativo.
- Upload de fotos.
- Upload de vídeos.
- Botão para reportar ocorrência.
- Validação para conclusão apenas quando todos os requisitos forem atendidos.

### Ocorrências

- Criação de ocorrência do tipo `informação` ou `erro/bloqueio`.
- Upload de anexos.
- Redirecionamento para tela de bloqueio quando a ocorrência é crítica.

### Bloqueios

- Tela dedicada para tarefas bloqueadas.
- Exibição de ocorrências abertas relacionadas à tarefa.
- Orientações de próximo passo para o colaborador.

### Perfil

- Dados do usuário atual.
- Indicadores de tarefas concluídas, pendentes e bloqueadas.
- Score de performance calculado a partir dos mocks atuais.

## Stack

- `React Native`
- `Expo`
- `Expo Router`
- `TypeScript`
- `React Navigation`
- `expo-image-picker`
- `lucide-react-native`
- `ESLint`

## Estrutura do Projeto

```text
app/
  (tabs)/
    Tasks.tsx
    Profile.tsx
    Leave.tsx
  auth/
    login.tsx
  tasks/
    [id]/
      index.tsx
      execute.tsx
      blocked.tsx
      occurrence.tsx

components/
  profile/
  tasks/

data/
  workflows.ts

hooks/
  useAuth.tsx
  useChecklistManager.ts
  useCurrentUser.ts
  usePhotoManager.ts
  useVideoManager.ts

styles/
  base.ts

types/
  profile.ts
  tasks.ts

utils/
  tasks.ts
```

## Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o projeto

```bash
npm start
```

### 3. Abrir no dispositivo desejado

Você também pode usar os comandos:

```bash
npm run android
npm run ios
npm run web
```

## Scripts Disponíveis

```bash
npm start
npm run android
npm run ios
npm run web
npm run lint
```

## Dados e Estado Atual

Hoje o projeto usa dados simulados para acelerar o desenvolvimento da experiência:

- tarefas e workflows em `data/workflows.ts`;
- usuário atual derivado localmente em `hooks/useCurrentUser.ts`;
- autenticação em memória com `hooks/useAuth.tsx`.

Isso significa que:

- não existe persistência real de sessão;
- uploads ainda não são enviados para backend;
- alterações de tarefa não são salvas após recarregar o app.

## Arquitetura de Navegação

- `app/auth/login.tsx`: entrada do app para usuários deslogados.
- `app/(tabs)/*`: área autenticada principal.
- `app/tasks/[id]/*`: fluxo detalhado de cada tarefa fora da tab bar.
- `app/(tabs)/tasks/[id].tsx`: redirecionamento legado para a nova rota detalhada.

## Design e Padronização

O projeto possui uma base de estilos compartilhada em `styles/base.ts`, utilizada para:

- cores globais;
- espaçamentos;
- raios;
- tipografia;
- blocos reaproveitáveis como `header`, `card`, `content` e botões.

Além disso, há temas específicos para partes da aplicação em:

- `constants/tasksTheme.ts`
- `constants/profileTheme.ts`

## Qualidade

Para checagem estática do projeto:

```bash
npm run lint
```

## Próximos Passos

Sugestões naturais para evolução do app:

1. integrar autenticação real com API;
2. persistir sessão do usuário;
3. salvar progresso de checklist, evidências e ocorrências;
4. adicionar feedback visual de sucesso, erro e loading assíncrono;
5. criar testes de componentes e fluxos principais;
6. conectar perfil e tarefas a dados reais.

## Status do Projeto

O projeto está em estágio funcional de prototipação.

Ele já demonstra bem os fluxos principais de uma operação mobile, mas ainda depende de mocks locais e não está conectado a backend de produção.
