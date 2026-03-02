import React from 'react';
import { motion } from 'framer-motion';
import type { LoginProps } from './interfaces';

const Login: React.FC<LoginProps> = ({ apelid, setApelid, senha, setSenha, loading, handleLogin }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-emerald-950 via-teal-950 to-neutral-900 overflow-hidden relative">
      {/* ... Seus círculos decorativos ... */}
      
      <motion.div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center">
          
          <h2 className="text-3xl font-bold text-emerald-50 mb-2 text-center">
            D&D - Análise de Saídas por Loja
          </h2>
          <p className="text-emerald-100/60 mb-8 text-sm">Entre para acessar seus dados</p>

          <form className="w-full space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-emerald-100/80 text-sm ml-1">Usuário</label>
              <input 
                type="text" 
                placeholder="Seu apelido"
                value={apelid} // Ligado ao Hook
                onChange={(e) => setApelid(e.target.value.toUpperCase())} // Atualiza o Hook
                className="uppercase w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-emerald-50 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-emerald-100/80 text-sm ml-1">Senha</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={senha} // Ligado ao Hook
                onChange={(e) => setSenha(e.target.value)} // Atualiza o Hook
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-emerald-50 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading} // Desabilita se estiver carregando
              whileHover={{ scale: 1.02, backgroundColor: '#f0fdf4' }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-50 text-emerald-950 font-bold py-3 rounded-xl shadow-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;