



# Estágio 1: Build da aplicação Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production

# Estágio 2: Servidor Nginx de alta performance
FROM nginx:alpine
# Copia o build do Angular para a pasta padrão do Nginx
COPY --from=build /app/dist/meu-projeto-frontend/browser /usr/share/nginx/html
# Copia a nossa configuração customizada do Nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]















# # -----------------------------------------------------------------------------
# # LINHA 1: Baixa um sistema Linux leve (Alpine) com o Node.js v20 pré-instalado.
# # Isso garante que a aplicação rode na mesma versão do Node em qualquer computador.
# # -----------------------------------------------------------------------------
# FROM node:20-alpine

# # -----------------------------------------------------------------------------
# # LINHA 2: Cria a pasta '/app' dentro do container e entra nela.
# # Tudo o que executarmos a partir de agora acontecerá dentro dessa pasta.
# # -----------------------------------------------------------------------------
# WORKDIR /app

# # -----------------------------------------------------------------------------
# # LINHA 3: Copia os arquivos package.json e package-lock.json da sua máquina
# # para a pasta /app dentro do container.
# # -----------------------------------------------------------------------------
# COPY package*.json ./

# # -----------------------------------------------------------------------------
# # LINHA 4: Baixa e instala todas as bibliotecas e pacotes do seu Angular
# # dentro do container. A flag --legacy-peer-deps previne erros de versão.
# # -----------------------------------------------------------------------------
# RUN npm install --legacy-peer-deps

# # -----------------------------------------------------------------------------
# # LINHA 5: Copia todo o código-fonte do projeto (como a pasta src/ e app.ts)
# # para dentro da pasta /app do container.
# # -----------------------------------------------------------------------------
# COPY . .

# # -----------------------------------------------------------------------------
# # LINHA 6: Avisa que o container escutará requisições na porta 4200.
# # -----------------------------------------------------------------------------
# EXPOSE 4200

# # -----------------------------------------------------------------------------
# # LINHA 7: O comando que inicializa o servidor de desenvolvimento do Angular.
# # A flag '--host 0.0.0.0' libera o acesso para o seu navegador fora do container.
# # -----------------------------------------------------------------------------
# CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]



