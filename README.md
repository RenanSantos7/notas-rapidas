# Notas Rápidas

**Notas Rápidas** é um aplicativo móvel desenvolvido em React Native com Expo, focado em oferecer uma experiência simples e eficiente para criar e gerenciar anotações. O projeto utiliza as diretrizes do Material Design 3 e oferece suporte a temas claro e escuro.

## 🚀 Funcionalidades

- **Criação de Notas**: Crie notas rapidamente com título e conteúdo.
- **Suporte a Markdown**: O conteúdo das notas suporta formatação Markdown.
- **Organização por Tags**: Adicione tags às suas notas para facilitar a organização.
- **Persistência de Dados**: As notas são salvas localmente no dispositivo usando `AsyncStorage`.
- **Tema Dinâmico**: Adaptação automática aos temas Claro e Escuro do sistema, utilizando `react-native-paper` e `@pchmn/expo-material3-theme`.

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (LTS recomendado)
- Gerenciador de pacotes npm ou yarn
- Dispositivo físico com o app **Expo Go** instalado ou emulador Android/iOS configurado.

## 💻 Instalação e Execução

1.  **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/notas-rapidas.git
cd notas-rapidas
```

2.  **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3.  **Execute o projeto:**

```bash
npx expo start
```

4.  **Para rodar no Android:**

- Pressione `a` no terminal após iniciar o Expo.
- Ou leia o QR Code com o app Expo Go no seu dispositivo Android.

## 📂 Estrutura do Projeto

A estrutura de pastas principal é organizada da seguinte forma:

```
src/
├── components/      # Componentes reutilizáveis
├── contexts/        # Contextos da aplicação (Dados, Tema)
├── hooks/           # Hooks personalizados (ex: persistência)
├── routes/          # Configuração de navegação (Stack, Tabs)
├── screens/         # Telas da aplicação (Home, Note, Search, Settings)
├── styles/          # Definições de estilos e temas
├── types/           # Definições de tipos TypeScript
└── utils/           # Funções utilitárias
```

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).