export {}; // Isso transforma o arquivo em um módulo

declare global {
  namespace Express {
    interface Request {
      // Aqui você define o que tem dentro do seu JWT
      user?: {
        id: string;
        nomusu: string;
        // adicione outros campos que você colocou no payload do JWT
      };
    }
  }
}