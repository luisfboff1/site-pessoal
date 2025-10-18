'use client';
import React, { useState } from 'react';
import { Menu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';
import { cn } from '@/lib/utils';

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-2 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Início">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/#home">Início</HoveredLink>
            <HoveredLink href="/#about">Sobre</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Portfólio">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/portfolio/desenvolvimento">Desenvolvimento</HoveredLink>
            <HoveredLink href="/portfolio/energia-solar">Energia Solar</HoveredLink>
            <HoveredLink href="/portfolio/ciencia-dados">Ciência de Dados</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Serviços">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/#services">Ver Todos</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Tecnologias">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/#tech-rolling">Gallery 3D</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contato">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/#contact">Fale Comigo</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
