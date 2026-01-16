import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // Verifica se estamos no navegador antes de tentar ler o localStorage
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('auth_token');

    // Se tiver token, a gente clona a requisição e adiciona o cabeçalho
    if (token) {
      const cloneReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(cloneReq);
    }
  }

  // Se não tiver token ou for no servidor, manda a requisição original mesmo
  return next(req);
};
