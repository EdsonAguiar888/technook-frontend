# 🚀 Sistema de Gerenciamento de Tarefas (Task Manager)

Sistema Full-Stack de gerenciamento de tarefas desenvolvido com **NestJS** no backend e **Angular** no frontend. A aplicação permite a criação, listagem, filtragem e remoção de tarefas com suporte a estados de status e níveis de prioridade.

---

# 🛠️ Tecnologias Utilizadas

## Backend

* **Framework:** NestJS (TypeScript)
* **Arquitetura:** Módulos, Controllers, Services e DTOs
* **Protocolo de Comunicação:** RESTful API
* **Gerenciador de Pacotes:** `npm` / `yarn`

## Frontend

* **Framework:** Angular (Componentes Standalone)
* **Linguagem:** TypeScript
* **Comunicação HTTP:** Angular `HttpClient` com RxJS
* **Estilização:** CSS3 puro com scoping por componente

---

# 📐 Arquitetura da Aplicação

```text
           +----------------------------------+
           |         Navegador Web            |
           |   (Angular SPA - Porta 4200)     |
           +----------------------------------+
                            |
                            | HTTP (REST / JSON)
                            v
           +----------------------------------+
           |        Backend NestJS            |
           |     (API REST - Porta 3000)      |
           +----------------------------------+
                            |
               [ Controllers ] -> [ Services ]
```

---

# 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

* **Node.js** versão **18.x** ou superior
* **npm** versão **9.x** ou superior
* **Angular CLI** versão **17.x** ou superior

```bash
npm install -g @angular/cli
```

* **NestJS CLI** (opcional)

```bash
npm install -g @nestjs/cli
```

---

# ⚙️ Como Executar o Projeto

É necessário executar o **Backend** e o **Frontend** em dois terminais diferentes.

## 1️⃣ Executando o Backend (NestJS)

Acesse a pasta do backend:

```bash
cd caminho/para/seu-projeto-backend
```

Instale as dependências:

```bash
npm install
```

Habilite o CORS no arquivo `main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:4200',
});
```

Execute o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

O backend ficará disponível em:

```text
http://localhost:3000
```

---

## 2️⃣ Executando o Frontend (Angular)

Em outro terminal, acesse a pasta do frontend:

```bash
cd /home/estagiario/projetos/technoOk/meu-projeto-frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
ng serve
```

ou

```bash
npm start
```

Abra o navegador em:

```text
http://localhost:4200
```

---

# 🔌 Documentação da API

URL base:

```text
http://localhost:3000/tarefas
```

| Método | Endpoint       | Descrição                     |
| ------ | -------------- | ----------------------------- |
| GET    | `/tarefas`     | Retorna todas as tarefas      |
| GET    | `/tarefas/:id` | Retorna uma tarefa específica |
| POST   | `/tarefas`     | Cria uma nova tarefa          |
| DELETE | `/tarefas/:id` | Remove uma tarefa pelo ID     |

## Corpo da requisição (POST)

```json
{
  "titulo": "string",
  "descricao": "string",
  "prioridade": "baixa",
  "status": "ABERTA"
}
```

### Valores aceitos

**Prioridade**

* baixa
* media
* alta

**Status**

* ABERTA
* EM_ANDAMENTO
* CONCLUIDA

---

# 📂 Estrutura do Frontend

```text
src/
├── app/
│   ├── tarefas/
│   │   ├── TarefaListaComponent/
│   │   │   ├── tarefa-lista.ts
│   │   │   ├── tarefa-lista.html
│   │   │   ├── tarefa-lista.css
│   │   │   └── tarefa-lista.spec.ts
│   │   └── tarefa.service.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   ├── app.html
│   └── app.css
├── index.html
└── main.ts
```

---

# 🧪 Testes

## Frontend

```bash
ng test
```

## Backend

```bash
npm run test
```

---

# 👨‍💻 Autor

Desenvolvido por **Edson Aguiar** como parte de projetos práticos de desenvolvimento Full-Stack.
