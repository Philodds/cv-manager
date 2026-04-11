import { useState, useEffect } from 'react'
import api from '../services/api'

const typeLabels = {
  cv: 'CV',
  lettre: 'Lettre de motivation',
  email: 'Email',
  resume: 'Résumé professionnel',
}

const typeColors = {
  cv: 'bg-blue-50 text-blue-600',
  lettre: 'bg-purple-50 text-purple-600',
  email: 'bg-green-50 text-green-600',
  resume: 'bg-amber-50 text-amber-600',
}

export default function Documents() {
  const [documents, setDocuments] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    api.get('/ai/documents')
      .then(res => setDocuments(res.data))
      .finally(() => setLoading(false))
  }, [])

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Chargement...</p>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Documents générés</h1>
      <p className="text-gray-500 text-sm mb-6">Historique de tous vos documents créés par l'IA</p>

      {documents.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm">Aucun document généré pour l'instant</p>
          <a href="/generate" className="text-blue-500 text-sm hover:underline mt-2 inline-block">
            Générer mon premier document
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Liste documents */}
        <div className="space-y-3">
          {documents.map(doc => (
            <div
              key={doc._id}
              onClick={() => setSelected(doc)}
              className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                selected?._id === doc._id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[doc.type]}`}>
                  {typeLabels[doc.type]}
                </span>
              </div>
              {doc.jobOffer && (
                <p className="text-sm font-medium text-gray-700">{doc.jobOffer.titrePoste}</p>
              )}
              {doc.jobOffer && (
                <p className="text-xs text-gray-400">{doc.jobOffer.entreprise}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(doc.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{doc.contenu}</p>
            </div>
          ))}
        </div>

        {/* Affichage document sélectionné */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center h-full flex items-center justify-center">
              <p className="text-gray-300 text-sm">Sélectionnez un document pour le voir</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[selected.type]}`}>
                    {typeLabels[selected.type]}
                  </span>
                  {selected.jobOffer && (
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      {selected.jobOffer.titrePoste} — {selected.jobOffer.entreprise}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    {new Date(selected.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(selected.contenu)}
                  className="text-xs px-3 py-1.5 border border-green-300 text-green-600 rounded-lg hover:bg-green-50"
                >
                  {copied ? 'Copié!' : 'Copier'}
                </button>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {selected.contenu}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}