'use client';
import dynamic from 'next/dynamic';

export const ClarityInit = dynamic(() => import("@/components/ClarityInit"), { ssr: false });
export const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
export const Plasma = dynamic(() => import('@/components/Plasma'), { ssr: false });
