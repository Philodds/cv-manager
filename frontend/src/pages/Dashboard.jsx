import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const cards = [
  { to: '/profile', title: 'Profil', desc: 'Titre, résumé, contact', color: 'blue' },
  { to: '/experiences', title: 'Expériences', desc: 'Postes et entreprises', color: 'green' },
  { to: '/formations', title: 'Formations', desc: 'Diplômes et établissements', color: 'purple' },
  { to: '/skills', title: 'Compétences', desc: 'Langages et outils', color: 'yellow' },
  { to: '/languages', title: 'Langues', desc: 'Niveaux de langues', color: 'pink' },
  { to: '/job-offers', title: 'Offres', desc: 'Offres d\'emploi ciblées', color: 'indigo' },
  { to: '/generate', title: 'Générer avec IA', desc: 'CV, lettre, email', color: 'red' },
  { to: '/documents', title: 'Documents', desc: 'Historique généré', color: 'gray' },
]

const colorMap = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  green: 'bg-green-50 text-green-600 hover:bg-green-100',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
  yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
  pink: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
  indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
  red: 'bg-red-50 text-red-600 hover:bg-red-100',
  gray: 'bg-gray-50 text-gray-600 hover:bg-gray-100',
}

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Bonjour, {user?.prenom} 👋
        </h1>
        <p className="text-gray-500 mt-1">Gérez votre profil et générez vos documents avec l'IA</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Link
            key={card.to}
            to={card.to}
            className={`p-6 rounded-xl transition-colors ${colorMap[card.color]}`}
          >
            <h3 className="font-semibold text-base">{card.title}</h3>
            <p className="text-sm opacity-70 mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}