import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // 1. Tenta pegar o token do cookie (graças ao cookie-parser!)
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ sucesso: false, erro: 'Acesso negado. Faça login.' });
    }

    // No seu middleware (onde dava o erro)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = {
            id: decoded.id,
            nomusu: decoded.nomusu
        };

        next();
    } catch (error) {
        return res.status(401).json({ sucesso: false, erro: 'Token inválido ou expirado.' });
    }
};