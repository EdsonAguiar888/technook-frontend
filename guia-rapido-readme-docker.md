🐳 Guia Prático de Comandos e Conceitos do DockerDocumento de referência contendo os conceitos fundamentais, comandos de terminal e arquivos de configuração aprendidos no fluxo de trabalho com Angular (Frontend) e NestJS (Backend).💡 1. Conceitos BásicosDockerfile: A "receita" de instruções linha por linha para criar uma imagem isolada da sua aplicação.Imagem (Image): O pacote estático contendo o código, bibliotecas e dependências da sua aplicação (resultado do build).Container: Uma instância ativa e em execução de uma Imagem.Docker Compose: Ferramenta de orquestração para definir, subir e gerenciar múltiplos containers com um único arquivo de configuração (docker-compose.yml).🛠️ 2. Comandos Básicos do Docker CLI🔍 Verificação e StatusBash# Listar apenas os containers que estão em execução (ativos)
docker ps

# Listar TODOS os containers (ativos e parados)
docker ps -a

# Exibir logs de um container em tempo real
docker logs -f <nome_do_container>

# Recarregar as permissões do grupo docker na sessão atual do terminal (Ubuntu/WSL)
newgrp docker
📦 Construção e Execução de Containers Únicos1. Gerar a Imagem (docker build)Bash# Criar uma imagem a partir do Dockerfile presente no diretório atual (.)
docker build -t <nome-da-imagem> .

# Criar a imagem forçando a não utilização do cache (código 100% atualizado)
docker build --no-cache -t <nome-da-imagem> .
2. Iniciar o Container (docker run)Bash# Rodar container em segundo plano (-d) e mapeando a porta (-p máquina:container)
docker run -d -p 4200:4200 --name <nome_do_container> <nome-da-imagem>

# Rodar com mapeamento de Volume para sincronizar alterações em tempo real (Live Reload)
docker run -d \
  -p 4200:4200 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --name <nome_do_container> \
  <nome-da-imagem>

# Executar um comando diretamente DENTRO de um container em execução
docker exec -it <nome_do_container> npm install <nome-do-pacote>
🛑 Parada e RemoçãoBash# Parar um container ativo
docker stop <nome_do_container>

# Parar TODOS os containers em execução de uma só vez
docker stop $(docker ps -q)

# Remover um container parado
docker rm <nome_do_container>

# Forçar a parada e remoção imediata de um container (-f)
docker rm -f <nome_do_container>

# Apagar todos os containers parados da máquina
docker container prune -f
🐙 3. Comandos do Docker Compose (Orquestração)Estes comandos devem ser executados no diretório que contém o arquivo docker-compose.yml:Bash# Subir e construir todos os serviços definidos no docker-compose.yml em segundo plano
docker compose up -d --build

# Listar apenas os containers gerenciados pelo docker-compose ativo
docker compose ps

# Exibir logs unificados de todos os serviços simultaneamente
docker compose logs -f

# Parar e remover todos os containers e redes criadas pelo docker-compose
docker compose down
📄 4. Estrutura dos Arquivos de ConfiguraçãoA. .dockerignore (Raiz do projeto)Evita copiar pastas pesadas do computador para a imagem do container:Plaintextnode_modules
.angular
dist
.git
.vscode
B. Dockerfile (Angular - Frontend)Dockerfile# 1. Imagem base
FROM node:20-alpine

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copia lista de dependências
COPY package*.json ./

# 4. Instala dependências evitando erros de peer dependencies
RUN npm install --legacy-peer-deps

# 5. Copia o código-fonte
COPY . .

# 6. Expõe a porta
EXPOSE 4200

# 7. Inicia aceitando conexões de fora do container (--host 0.0.0.0)
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
C. Dockerfile (NestJS - Backend)Dockerfile# 1. Imagem base
FROM node:20-alpine

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copia lista de dependências
COPY package*.json ./

# 4. Instala dependências
RUN npm install --legacy-peer-deps

# 5. Copia o código-fonte
COPY . .

# 6. Expõe a porta
EXPOSE 3000

# 7. Inicia em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]
D. docker-compose.yml (Raiz que une Frontend + Backend)YAMLservices:
  backend:
    build:
      context: ./meu-projeto-backend   # Verifique o nome correto da pasta
      dockerfile: Dockerfile
    container_name: container_backend
    ports:
      - "3000:3000"
    networks:
      - rede_aplicacao

  frontend:
    build:
      context: ./meu-projeto-frontend  # Verifique o nome correto da pasta
      dockerfile: Dockerfile
    container_name: container_angular
    ports:
      - "4200:4200"
    depends_on:
      - backend
    networks:
      - rede_aplicacao

networks:
  rede_aplicacao:
    driver: bridge




    
🚩 5. Dicas e Soluções Rápidas de ErrosErro / ComportamentoCausa ProvávelComo Resolverpermission denied... docker.sockUsuário sem permissão para rodar Docker sem sudo.Rode newgrp docker ou sudo service docker start.ERESOLVE could not resolveConflito de dependências no npm install.Use a flag --legacy-peer-deps no Dockerfile.App não abre no navegadorFalta mapear portas ou usar --host 0.0.0.0.Mapeie -p 4200:4200 e garanta --host 0.0.0.0 no CMD.Código alterado não atualizaImagem usou o cache do build anterior.Rode docker build --no-cache -t <nome> . ou use volumes.path <caminho> not found no ComposeO nome da pasta em context: no YAML está errado.Ajuste o nome do diretório em context: exatamente como está no terminal.