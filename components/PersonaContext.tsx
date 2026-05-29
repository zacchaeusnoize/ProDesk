'use client';
import { createContext, useContext } from 'react';

export const PersonaCtx = createContext(null);
export const usePersona = () => useContext(PersonaCtx) || { persona: null, setPersona: () => {}, chosen: false, reset: () => {} };
