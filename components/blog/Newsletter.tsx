'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
    // For now, simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Obrigado por se inscrever! Verifique seu email.');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-sm p-8"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 mb-4"
        >
          <Mail className="w-6 h-6 text-purple-400" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2">
          Newsletter
        </h3>
        <p className="text-neutral-400 mb-6">
          Receba novos artigos diretamente no seu email. Sem spam, apenas conteúdo de qualidade.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={status === 'loading' || status === 'success'}
              className="
                flex-1 px-4 py-3 rounded-lg
                bg-black/40 border border-white/10
                text-white placeholder:text-neutral-500
                focus:outline-none focus:border-purple-500/50
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            />
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: status === 'idle' || status === 'error' ? 1.02 : 1 }}
              whileTap={{ scale: status === 'idle' || status === 'error' ? 0.98 : 1 }}
              className={`
                px-6 py-3 rounded-lg font-medium
                flex items-center justify-center gap-2
                transition-all
                ${status === 'success'
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                whitespace-nowrap
              `}
            >
              {status === 'loading' && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Enviando...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <Check className="w-5 h-5" />
                  <span>Inscrito!</span>
                </>
              )}
              {(status === 'idle' || status === 'error') && (
                <>
                  <Send className="w-5 h-5" />
                  <span>Inscrever</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Message */}
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>

        {/* Privacy note */}
        <p className="text-xs text-neutral-500 mt-4">
          Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.
        </p>
      </div>
    </motion.div>
  );
};
