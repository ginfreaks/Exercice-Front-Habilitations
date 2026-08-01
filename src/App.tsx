import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/routes";

/**
 * Point d'entrée de l'application.
 *
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  À VOUS DE JOUER                                                 │
 * │                                                                  │
 * │  Ce composant est volontairement minimal. C'est le point de      │
 * │  départ de l'exercice décrit dans le README.                     │
 * │                                                                  │
 * │  - Mettez en place la gestion de l'état / data-fetching de votre │
 * │    choix.                                                        │
 * │  - Consommez le backend mocké (voir src/mocks/handlers.ts pour   │
 * │    le contrat d'API).                                            │
 * │  - Organisez le code comme bon vous semble.                      │
 * └──────────────────────────────────────────────────────────────────┘
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Portail d'habilitations
            </h1>
            <p className="text-sm font-light text-gray-800">
              Gestion des demandes d'accès au parc applicatif
            </p>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-4">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
